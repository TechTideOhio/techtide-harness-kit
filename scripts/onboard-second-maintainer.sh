#!/usr/bin/env bash
# Onboard a second human maintainer so pull requests can receive an
# independent approval (OpenSSF Scorecard "Code-Review"), then enforce
# review on master with .github/rulesets/master.json.
#
# Usage (run from the repository root as a repository admin):
#   scripts/onboard-second-maintainer.sh <github-username>            # dry run (default)
#   scripts/onboard-second-maintainer.sh <github-username> --apply    # perform the steps
#   Options: --permission push|maintain (default: push)
#
# The script is idempotent. Expected flow:
#   1st --apply run: invites the user and opens a CODEOWNERS pull request.
#   The user accepts the invitation; the CODEOWNERS pull request is merged
#   (ideally approved by the new maintainer, which is the first reviewed change).
#   2nd --apply run: applies the branch ruleset. The ruleset step is skipped
#   until the user holds write access AND is listed in CODEOWNERS on master,
#   because enforcing review earlier would only force admin bypass on every merge.
#
# It never approves anything, never creates accounts, and keeps the ruleset's
# admin (RepositoryRole 5) pull_request bypass entry.

set -euo pipefail

REPO="TechTideOhio/techtide-harness-kit"
BASE="master"
RULESET_FILE=".github/rulesets/master.json"
CODEOWNERS_FILE=".github/CODEOWNERS"
OWNER_HANDLE="@Alexi5000"

usage() { sed -n '2,22p' "$0" | sed 's/^# \{0,1\}//'; exit "${1:-0}"; }

user=""
apply=0
permission="push"
while [ $# -gt 0 ]; do
  case "$1" in
    --apply) apply=1 ;;
    --dry-run) apply=0 ;;
    --permission) shift; permission="${1:-}" ;;
    -h|--help) usage 0 ;;
    -*) echo "unknown option: $1" >&2; usage 2 ;;
    *) [ -z "$user" ] || { echo "only one username allowed" >&2; exit 2; }; user="$1" ;;
  esac
  shift
done

[ -n "$user" ] || usage 2
user="${user#@}"
case "$permission" in push|maintain) ;; *) echo "--permission must be push or maintain" >&2; exit 2 ;; esac
if ! printf '%s' "$user" | grep -Eq '^[A-Za-z0-9]([A-Za-z0-9-]{0,37}[A-Za-z0-9])?$'; then
  echo "invalid GitHub username: $user" >&2; exit 2
fi

log() { printf '==> %s\n' "$*"; }
act() {
  # Print the action; run it only with --apply.
  printf '    %s %s\n' "$([ "$apply" = 1 ] && echo RUN || echo DRY-RUN)" "$*"
  if [ "$apply" = 1 ]; then "$@"; fi
}

command -v gh >/dev/null || { echo "gh CLI is required" >&2; exit 1; }
command -v git >/dev/null || { echo "git is required" >&2; exit 1; }
[ -f "$RULESET_FILE" ] && [ -f "$CODEOWNERS_FILE" ] || { echo "run from the repository root" >&2; exit 1; }

me="$(gh api user --jq .login)"
log "mode: $([ "$apply" = 1 ] && echo APPLY || echo DRY-RUN)  repo: $REPO  admin: $me  new maintainer: $user ($permission)"

# 1. Verify the user exists, is a human account, and is not the operator.
log "1/4 verify GitHub user"
utype="$(gh api "users/$user" --jq .type 2>/dev/null)" || { echo "GitHub user '$user' not found" >&2; exit 1; }
[ "$utype" = "User" ] || { echo "'$user' is a $utype account; a human User account is required" >&2; exit 1; }
if [ "$(printf '%s' "$user" | tr '[:upper:]' '[:lower:]')" = "$(printf '%s' "$me" | tr '[:upper:]' '[:lower:]')" ]; then
  echo "the second maintainer must be a different person than $me" >&2; exit 1
fi
[ "$(gh api "repos/$REPO" --jq .permissions.admin)" = "true" ] || { echo "$me is not an admin of $REPO" >&2; exit 1; }
echo "    ok: $user is a User account"

# 2. Invite as an outside collaborator (skip if already a collaborator or invited).
log "2/4 collaborator access"
has_write=0
if gh api "repos/$REPO/collaborators/$user" --silent 2>/dev/null; then
  perm="$(gh api "repos/$REPO/collaborators/$user/permission" --jq .permission)"
  echo "    already a collaborator (permission: $perm)"
  case "$perm" in admin|maintain|write) has_write=1 ;; esac
  if [ "$has_write" = 0 ]; then
    act gh api -X PUT "repos/$REPO/collaborators/$user" -f permission="$permission" --silent
  fi
elif [ -n "$(gh api "repos/$REPO/invitations" --jq ".[] | select((.invitee.login|ascii_downcase) == \"$(printf '%s' "$user" | tr '[:upper:]' '[:lower:]')\") | .id")" ]; then
  echo "    invitation already pending; ask $user to accept it at https://github.com/$REPO/invitations"
else
  act gh api -X PUT "repos/$REPO/collaborators/$user" -f permission="$permission" --silent
  echo "    ask $user to accept the invitation at https://github.com/$REPO/invitations"
fi

# 3. Add the user to every CODEOWNERS owner line via a pull request.
log "3/4 CODEOWNERS pull request"
git fetch -q origin "$BASE"
on_master=0
if git show "origin/$BASE:$CODEOWNERS_FILE" | grep -Eq "^[^#].*@$user([[:space:]]|$)"; then
  on_master=1
  echo "    $user already listed in CODEOWNERS on $BASE"
else
  branch="chore/codeowners-add-$user"
  existing_pr="$(gh pr list -R "$REPO" --head "$branch" --state open --json url --jq '.[0].url // empty')"
  if [ -n "$existing_pr" ]; then
    echo "    pull request already open: $existing_pr"
  else
    [ -z "$(git status --porcelain)" ] || { echo "working tree is not clean; commit or stash first" >&2; exit 1; }
    start_ref="$(git rev-parse --abbrev-ref HEAD)"
    act git switch -q -c "$branch" "origin/$BASE"
    # Append the user to each non-comment owner line that names the current owner.
    act sed -i.bak -E "/^[^#[:space:]]/ s|$OWNER_HANDLE([[:space:]]*)$|$OWNER_HANDLE @$user\\1|" "$CODEOWNERS_FILE"
    act rm -f "$CODEOWNERS_FILE.bak"
    act git commit -q -m "chore: add @$user as second code owner" -- "$CODEOWNERS_FILE"
    act git push -q -u origin "$branch"
    act gh pr create -R "$REPO" --base "$BASE" --head "$branch" \
      --title "chore: add @$user as second code owner" \
      --body "Adds @$user to every CODEOWNERS rule so pull requests can receive an independent code-owner approval (OpenSSF Scorecard Code-Review). Please have @$user review and approve this pull request; merge with a merge commit."
    act git switch -q "$start_ref"
  fi
fi

# 4. Apply the branch ruleset (POST, or PUT when one with the same name exists).
log "4/4 branch ruleset"
name="$(sed -n 's/^  "name": "\(.*\)",$/\1/p' "$RULESET_FILE")"
[ -n "$name" ] || { echo "could not read ruleset name from $RULESET_FILE" >&2; exit 1; }
if ! grep -q '"actor_type": "RepositoryRole"' "$RULESET_FILE"; then
  echo "refusing: $RULESET_FILE lost its admin RepositoryRole bypass entry" >&2; exit 1
fi
if [ "$has_write" = 0 ] || [ "$on_master" = 0 ]; then
  echo "    skipped: enforce review only after $user has write access (accepted: $has_write)"
  echo "    and is listed in CODEOWNERS on $BASE (merged: $on_master). Re-run this script with --apply then."
else
  rid="$(gh api "repos/$REPO/rulesets" --jq ".[] | select(.name == \"$name\") | .id" | head -n1)"
  if [ -n "$rid" ]; then
    act gh api -X PUT "repos/$REPO/rulesets/$rid" --input "$RULESET_FILE" --silent
  else
    act gh api -X POST "repos/$REPO/rulesets" --input "$RULESET_FILE" --silent
  fi
  if [ "$apply" = 1 ]; then
    gh api "repos/$REPO/rulesets" --jq '.[] | "    active ruleset: \(.id) \(.name) (\(.enforcement))"'
    echo "    CODEOWNERS errors: $(gh api "repos/$REPO/codeowners/errors" --jq '.errors | length')"
  fi
fi

log "done. Land future changes as pull requests approved by the other maintainer; Scorecard re-scores on its weekly run."
