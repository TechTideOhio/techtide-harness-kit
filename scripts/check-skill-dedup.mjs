#!/usr/bin/env node

/**
 * Skill Deduplication Check
 *
 * Detects skills that are near-identical copies of each other by hashing
 * the normalized content (provider names stripped) and flagging collisions.
 *
 * Usage: node scripts/check-skill-dedup.mjs
 * Exit code: 0 = clean, 1 = duplicates found
 */

import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { createHash } from 'node:crypto';

const SKILLS_DIR = join(import.meta.dirname, '..', 'skills');

// Provider names to normalize out when computing similarity hashes
const PROVIDER_TOKENS = [
  'aws', 'azure', 'gcp', 'alibaba', 'huawei', 'oci',
  'claude', 'cursor', 'codex', 'gemini', 'kiro', 'lovable',
  'v0', 'replit', 'vercel', 'nvidia', 'kubernetes', 'terraform',
  'contabo', 'hetzner', 'ionos', 'ovhcloud', 'scaleway',
  // Expanded provider display names
  'Claude Code', 'Cursor', 'Codex', 'Gemini', 'Kiro',
  'Lovable', 'V0', 'Replit', 'Vercel', 'NVIDIA',
  'Alibaba Cloud', 'Huawei Cloud', 'Oracle Cloud',
];

function normalizeContent(content) {
  let normalized = content;
  // Strip YAML frontmatter (name, description vary by provider)
  normalized = normalized.replace(/^---[\s\S]*?---\n/, '');
  // Strip the H1 title line
  normalized = normalized.replace(/^# .+\n/, '');
  // Normalize provider tokens to a placeholder
  for (const token of PROVIDER_TOKENS) {
    normalized = normalized.replaceAll(token, 'PROVIDER');
  }
  // Collapse whitespace
  normalized = normalized.replace(/\s+/g, ' ').trim();
  return normalized;
}

function hashContent(content) {
  return createHash('sha256').update(content).digest('hex').substring(0, 16);
}

async function getSkillDirs() {
  const providers = await readdir(SKILLS_DIR);
  const skills = [];

  for (const provider of providers) {
    const providerPath = join(SKILLS_DIR, provider);
    const providerStat = await stat(providerPath);
    if (!providerStat.isDirectory()) continue;

    const skillDirs = await readdir(providerPath);
    for (const skillDir of skillDirs) {
      const skillPath = join(providerPath, skillDir);
      const skillStat = await stat(skillPath);
      if (!skillStat.isDirectory()) continue;

      const skillMd = join(skillPath, 'SKILL.md');
      try {
        await stat(skillMd);
        skills.push({
          provider,
          name: skillDir,
          path: relative(SKILLS_DIR, skillPath),
          skillMdPath: skillMd,
        });
      } catch {
        // No SKILL.md, skip
      }
    }
  }
  return skills;
}

async function main() {
  const skills = await getSkillDirs();
  console.log(`Scanning ${skills.length} skills for duplicates...\n`);

  const hashMap = new Map(); // hash -> [skill paths]

  for (const skill of skills) {
    const content = await readFile(skill.skillMdPath, 'utf-8');
    const normalized = normalizeContent(content);
    const hash = hashContent(normalized);

    if (!hashMap.has(hash)) {
      hashMap.set(hash, []);
    }
    hashMap.get(hash).push(skill.path);
  }

  // Find duplicates (hash -> 2+ skills)
  const duplicateGroups = [...hashMap.entries()]
    .filter(([, paths]) => paths.length > 1)
    .sort((a, b) => b[1].length - a[1].length);

  if (duplicateGroups.length === 0) {
    console.log('No duplicate skills found. All skills are unique.');
    process.exit(0);
  }

  console.log(`Found ${duplicateGroups.length} duplicate group(s):\n`);

  let totalDuplicates = 0;
  for (const [hash, paths] of duplicateGroups) {
    const dupeCount = paths.length - 1; // First one is the "original"
    totalDuplicates += dupeCount;
    console.log(`  Hash ${hash} (${paths.length} copies):`);
    for (const p of paths) {
      console.log(`    - ${p}`);
    }
    console.log();
  }

  console.log(`Total: ${totalDuplicates} duplicate skills across ${duplicateGroups.length} groups.`);
  console.log('Each group should have at most 1 canonical skill. Remove or differentiate the copies.');
  process.exit(1);
}

main().catch((err) => {
  console.error('Dedup check failed:', err);
  process.exit(2);
});
