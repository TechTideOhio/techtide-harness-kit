import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const exporter = fileURLToPath(new URL("../scripts/export-marketplace-agents.mjs", import.meta.url));
const agent = "techtide-aws-iam-least-privilege-review-agent";
const skill = "techtide-aws-iam-least-privilege-review";

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "thk-boundary-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const repo = path.join(root, "consumer");
  const outside = path.join(root, "outside");
  fs.mkdirSync(repo);
  fs.mkdirSync(outside);
  return { root, repo, outside };
}

function run(repo, ...extra) {
  return spawnSync(process.execPath, [exporter, "--platform", "claude-code", "--agents", agent, "--repo", repo, ...extra], { encoding: "utf8", timeout: 15000 });
}

test("normal exports and forced updates preserve overwrite policy", t => {
  const { repo } = fixture(t);
  assert.equal(run(repo).status, 0);
  const target = path.join(repo, ".claude/agents", agent + ".md");
  const original = fs.readFileSync(target, "utf8");
  fs.writeFileSync(target, "local edit");
  assert.notEqual(run(repo).status, 0);
  assert.equal(fs.readFileSync(target, "utf8"), "local edit");
  assert.equal(run(repo, "--force").status, 0);
  assert.equal(fs.readFileSync(target, "utf8"), original);
  assert.ok(fs.existsSync(path.join(repo, ".claude/skills", skill, "SKILL.md")));
});

for (const relative of [".claude", ".claude/agents", ".claude/skills", ".claude/skills/" + skill]) {
  test("rejects symlink ancestor " + relative, t => {
    const { repo, outside } = fixture(t);
    const link = path.join(repo, relative);
    fs.mkdirSync(path.dirname(link), { recursive: true });
    fs.symlinkSync(outside, link, "dir");
    const result = run(repo, "--force");
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /unsafe destination/);
    assert.deepEqual(fs.readdirSync(outside), []);
  });
}

for (const companion of [false, true]) {
  for (const type of ["symlink", "dangling", "hardlink"]) {
    test("rejects " + type + " " + (companion ? "skill" : "agent") + " destination", t => {
      const { repo, outside } = fixture(t);
      const target = companion
        ? path.join(repo, ".claude/skills", skill, "SKILL.md")
        : path.join(repo, ".claude/agents", agent + ".md");
      fs.mkdirSync(path.dirname(target), { recursive: true });
      const victim = path.join(outside, "victim");
      if (type !== "dangling") fs.writeFileSync(victim, "unchanged");
      if (type === "hardlink") fs.linkSync(victim, target);
      else fs.symlinkSync(victim, target);
      const result = run(repo, "--force");
      assert.notEqual(result.status, 0);
      assert.match(result.stderr, /unsafe destination/);
      if (type === "dangling") assert.equal(fs.existsSync(victim), false);
      else assert.equal(fs.readFileSync(victim, "utf8"), "unchanged");
    });
  }
}

test("explicit repository alias resolves to its selected root", t => {
  const { root, repo } = fixture(t);
  const alias = path.join(root, "alias");
  fs.symlinkSync(repo, alias, "dir");
  assert.equal(run(alias, "--no-skills").status, 0);
  assert.ok(fs.existsSync(path.join(repo, ".claude/agents", agent + ".md")));
});
