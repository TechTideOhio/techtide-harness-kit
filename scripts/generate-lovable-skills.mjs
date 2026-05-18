#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const DEFAULT_OUT = path.join(ROOT, "exports", "lovable");
const CATALOG = path.join(ROOT, "catalog", "skills.json");
const PACKAGE = path.join(ROOT, "package.json");

const MAX_FILES = 200;
const MAX_FILE_BYTES = 1024 * 1024;
const MAX_TOTAL_BYTES = 10 * 1024 * 1024;
const DEFAULT_VIBE_PROVIDERS = ["lovable", "v0", "vercel", "replit", "cursor"];
const TECHTIDE_VIBE_SKILLS = [
  "techtide-ai-tool-decision-router",
  "techtide-cross-harness-export-hygiene",
  "techtide-cursor-claude-codex-workflow-router",
  "techtide-lovable-build-loop-operator",
  "techtide-lovable-production-handoff",
  "techtide-lovable-self-heal-debugger",
  "techtide-replit-fullstack-bootstrap",
  "techtide-v0-ui-prompt-hardener",
];

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function mkdirp(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function rmrf(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

function posixPath(value) {
  return value.split(path.sep).join("/");
}

function assertWithin(parent, child) {
  const rel = path.relative(parent, child);
  if (rel.startsWith("..") || path.isAbsolute(rel)) {
    throw new Error(`Refusing to write outside ${parent}: ${child}`);
  }
}

function parseArgs(argv) {
  const args = {
    mode: "write",
    out: DEFAULT_OUT,
    releaseTag: null,
    repo: "TechTideOhio/techtide-harness-kit",
    providers: [...DEFAULT_VIBE_PROVIDERS],
    includeTechTideAdapters: true,
    skills: [],
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--write") {
      args.mode = "write";
    } else if (arg === "--check") {
      args.mode = "check";
    } else if (arg === "--out") {
      args.out = path.resolve(argv[++i]);
    } else if (arg === "--release-tag") {
      args.releaseTag = argv[++i];
    } else if (arg === "--repo") {
      args.repo = argv[++i];
    } else if (arg === "--provider") {
      args.providers = argv[++i].split(",").map((s) => s.trim()).filter(Boolean);
    } else if (arg === "--all-vibe-providers") {
      args.providers = ["lovable", "v0", "vercel", "replit", "cursor", "kiro"];
    } else if (arg === "--lovable-only") {
      args.providers = ["lovable"];
      args.includeTechTideAdapters = false;
    } else if (arg === "--no-techtide-adapters") {
      args.includeTechTideAdapters = false;
    } else if (arg === "--skill") {
      args.skills.push(...argv[++i].split(",").map((s) => s.trim()).filter(Boolean));
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function parseFrontmatter(markdown) {
  if (!markdown.startsWith("---\n")) {
    throw new Error("SKILL.md must start with YAML frontmatter");
  }
  const end = markdown.indexOf("\n---", 4);
  if (end === -1) {
    throw new Error("SKILL.md has unterminated YAML frontmatter");
  }
  const raw = markdown.slice(4, end).trim();
  const body = markdown.slice(end + 5).replace(/^\r?\n/, "");
  const meta = {};
  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) {
      continue;
    }
    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    meta[match[1]] = value;
  }
  return { meta, body };
}

function firstSentence(text) {
  const trimmed = text.replace(/\s+/g, " ").trim();
  const match = trimmed.match(/^(.+?[.!?])(?:\s|$)/);
  return match ? match[1].trim() : trimmed;
}

function lovableDescription(description) {
  const cleaned = description.replace(/\s+/g, " ").trim();
  const useWhen = cleaned.match(/\bUse when\b\s+(.+)$/i);
  if (useWhen) {
    return firstSentence(`Use when ${useWhen[1]}`);
  }
  const lower = cleaned.charAt(0).toLowerCase() + cleaned.slice(1);
  return firstSentence(`Use when you need to ${lower}`);
}

function titleFromId(id) {
  return id
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function listFiles(dir) {
  const files = [];
  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (entry.name === ".DS_Store" || entry.name === "__MACOSX") {
        continue;
      }
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile()) {
        files.push(full);
      }
    }
  }
  walk(dir);
  return files.sort((a, b) => posixPath(a).localeCompare(posixPath(b)));
}

function copyFile(src, dest) {
  mkdirp(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function selectLovableSkills(catalog, selectedIds, providers, includeTechTideAdapters) {
  const selected = new Set(selectedIds);
  const providerSet = new Set(providers);
  const techTideSet = new Set(includeTechTideAdapters ? TECHTIDE_VIBE_SKILLS : []);
  return catalog
    .filter((entry) => entry.type === "skill")
    .filter((entry) => providerSet.has(entry.provider) || techTideSet.has(entry.id))
    .filter((entry) => selected.size === 0 || selected.has(entry.id))
    .sort((a, b) => a.id.localeCompare(b.id));
}

function renderSkill(skill, sourceDir) {
  const sourceSkill = path.join(sourceDir, "SKILL.md");
  if (!fs.existsSync(sourceSkill)) {
    throw new Error(`${skill.id}: missing SKILL.md`);
  }
  const parsed = parseFrontmatter(fs.readFileSync(sourceSkill, "utf8"));
  const name = skill.id;
  const description = lovableDescription(parsed.meta.description || skill.description || name);
  const sourcePath = posixPath(skill.path);
  const body = parsed.body.trim();
  return [
    "---",
    `name: ${JSON.stringify(name)}`,
    `description: ${JSON.stringify(description)}`,
    "---",
    "",
    `# ${titleFromId(name)}`,
    "",
    "> Packaged for Lovable from TechTide Harness Kit. Import one skill at a time.",
    `> Source path: \`${sourcePath}\`.`,
    "",
    body,
    "",
  ].join("\n");
}

function buildSkillPackage(skill, outDir) {
  const sourceDir = path.join(ROOT, skill.path);
  const packageDir = path.join(outDir, "skills", skill.id);
  assertWithin(outDir, packageDir);
  rmrf(packageDir);
  mkdirp(packageDir);

  fs.writeFileSync(path.join(packageDir, "SKILL.md"), renderSkill(skill, sourceDir), "utf8");

  const sourceReferences = path.join(sourceDir, "references");
  if (fs.existsSync(sourceReferences)) {
    for (const file of listFiles(sourceReferences)) {
      const rel = path.relative(sourceReferences, file);
      copyFile(file, path.join(packageDir, "references", rel));
    }
  }

  const files = listFiles(packageDir);
  const records = files.map((file) => {
    const bytes = fs.statSync(file).size;
    if (bytes > MAX_FILE_BYTES) {
      throw new Error(`${skill.id}: ${path.relative(packageDir, file)} exceeds 1 MB`);
    }
    return {
      path: posixPath(path.relative(packageDir, file)),
      bytes,
    };
  });
  const totalBytes = records.reduce((sum, record) => sum + record.bytes, 0);
  if (records.length > MAX_FILES) {
    throw new Error(`${skill.id}: ${records.length} files exceeds Lovable max ${MAX_FILES}`);
  }
  if (totalBytes > MAX_TOTAL_BYTES) {
    throw new Error(`${skill.id}: ${totalBytes} bytes exceeds Lovable max ${MAX_TOTAL_BYTES}`);
  }
  return { packageDir, records, totalBytes };
}

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i += 1) {
    let c = i;
    for (let k = 0; k < 8; k += 1) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c >>> 0;
  }
  return table;
})();

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function dosTimeDate(date = new Date()) {
  const year = Math.max(date.getFullYear(), 1980);
  const dosTime =
    (date.getHours() << 11) |
    (date.getMinutes() << 5) |
    Math.floor(date.getSeconds() / 2);
  const dosDate =
    ((year - 1980) << 9) |
    ((date.getMonth() + 1) << 5) |
    date.getDate();
  return { dosTime, dosDate };
}

function writeZip(packageDir, archivePath, wrappingFolder) {
  mkdirp(path.dirname(archivePath));
  const files = listFiles(packageDir);
  const localParts = [];
  const centralParts = [];
  let offset = 0;
  const { dosTime, dosDate } = dosTimeDate(new Date("2026-05-18T00:00:00Z"));

  for (const file of files) {
    const rel = posixPath(path.relative(packageDir, file));
    const name = `${wrappingFolder}/${rel}`;
    const nameBuffer = Buffer.from(name, "utf8");
    const data = fs.readFileSync(file);
    const crc = crc32(data);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(0, 8);
    local.writeUInt16LE(dosTime, 10);
    local.writeUInt16LE(dosDate, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuffer.length, 26);
    local.writeUInt16LE(0, 28);
    localParts.push(local, nameBuffer, data);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(0, 10);
    central.writeUInt16LE(dosTime, 12);
    central.writeUInt16LE(dosDate, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(data.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(nameBuffer.length, 28);
    central.writeUInt16LE(0, 30);
    central.writeUInt16LE(0, 32);
    central.writeUInt16LE(0, 34);
    central.writeUInt16LE(0, 36);
    central.writeUInt32LE(0, 38);
    central.writeUInt32LE(offset, 42);
    centralParts.push(central, nameBuffer);

    offset += local.length + nameBuffer.length + data.length;
  }

  const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(centralSize, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);

  fs.writeFileSync(archivePath, Buffer.concat([...localParts, ...centralParts, end]));
}

function renderReadme(manifest, releaseTag, repo) {
  const lines = [
    "# Lovable Skill Imports",
    "",
    "Generated one-skill packages for Lovable workspace skills.",
    "",
    "Lovable imports one skill per GitHub repository or ZIP today. Do not paste the full TechTide Harness Kit repository or `skills/lovable` folder into Lovable, because the importer will see too many files.",
    "",
    "## Import",
    "",
    "1. Open Lovable Settings, Skills, Import.",
    "2. Choose Archive.",
    "3. Upload one ZIP from `archives/`.",
    "4. Repeat for each skill you want in the workspace.",
    "",
    "## Limits Checked",
    "",
    "- `SKILL.md` is inside one wrapping folder.",
    "- Each skill has no more than 200 files.",
    "- Each bundled file is no more than 1 MB.",
    "- Each skill package is no more than 10 MB total.",
    "",
    "## Skills",
    "",
  ];
  for (const skill of manifest.skills) {
    const release = releaseTag
      ? `, release asset: https://github.com/${repo}/releases/download/${releaseTag}/${skill.archive}`
      : "";
    lines.push(`- \`${skill.id}\`, ${skill.file_count} files, ${skill.total_bytes} bytes${release}`);
  }
  lines.push("");
  return `${lines.join("\n")}\n`;
}

function generate(args) {
  args = {
    out: DEFAULT_OUT,
    releaseTag: null,
    repo: "TechTideOhio/techtide-harness-kit",
    providers: [...DEFAULT_VIBE_PROVIDERS],
    includeTechTideAdapters: true,
    skills: [],
    ...args,
  };
  const outDir = args.out;
  const skillsDir = path.join(outDir, "skills");
  const archivesDir = path.join(outDir, "archives");
  rmrf(outDir);
  mkdirp(skillsDir);
  mkdirp(archivesDir);

  const pkg = readJson(PACKAGE);
  const catalog = readJson(CATALOG);
  const skills = selectLovableSkills(
    catalog,
    args.skills,
    args.providers,
    args.includeTechTideAdapters,
  );
  if (!skills.length) {
    throw new Error("No Lovable skills matched the requested selection");
  }

  const manifest = {
    manifest_version: 1,
    generated_by: "scripts/generate-lovable-skills.mjs",
    package: pkg.name,
    package_version: pkg.version,
    generated_at: "2026-05-18",
    source_docs: ["https://docs.lovable.dev/features/skills"],
    lovable_limits: {
      max_files: MAX_FILES,
      max_file_bytes: MAX_FILE_BYTES,
      max_total_bytes: MAX_TOTAL_BYTES,
      required_shape: "SKILL.md at archive root or inside one wrapping folder",
      import_model: "one skill per repository or ZIP",
    },
    source_providers: args.providers,
    included_techtide_adapters: args.includeTechTideAdapters ? TECHTIDE_VIBE_SKILLS : [],
    skills: [],
  };

  for (const skill of skills) {
    const built = buildSkillPackage(skill, outDir);
    const archive = `${skill.id}.zip`;
    writeZip(built.packageDir, path.join(archivesDir, archive), skill.id);
    manifest.skills.push({
      id: skill.id,
      name: skill.id,
      source_path: skill.path,
      package_path: posixPath(path.relative(ROOT, built.packageDir)),
      archive,
      archive_path: posixPath(path.relative(ROOT, path.join(archivesDir, archive))),
      file_count: built.records.length,
      total_bytes: built.totalBytes,
      import_note: "Upload this ZIP through Lovable Settings > Skills > Import > Archive.",
      release_asset_url: args.releaseTag
        ? `https://github.com/${args.repo}/releases/download/${args.releaseTag}/${archive}`
        : null,
    });
  }

  fs.writeFileSync(path.join(outDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  fs.writeFileSync(path.join(outDir, "README.md"), renderReadme(manifest, args.releaseTag, args.repo), "utf8");
  return manifest;
}

function check(args) {
  args = {
    out: DEFAULT_OUT,
    releaseTag: null,
    repo: "TechTideOhio/techtide-harness-kit",
    providers: [...DEFAULT_VIBE_PROVIDERS],
    includeTechTideAdapters: true,
    skills: [],
    ...args,
  };
  const manifestPath = path.join(args.out, "manifest.json");
  if (!fs.existsSync(manifestPath)) {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "thk-lovable-check-"));
    try {
      generate({ ...args, out: tmp });
      return check({ ...args, out: tmp });
    } finally {
      rmrf(tmp);
    }
  }
  const manifest = readJson(manifestPath);
  for (const skill of manifest.skills || []) {
    const archive = path.join(ROOT, skill.archive_path);
    const packageDir = path.join(ROOT, skill.package_path);
    if (!fs.existsSync(archive)) {
      throw new Error(`${skill.id}: missing archive ${skill.archive_path}`);
    }
    if (!fs.existsSync(path.join(packageDir, "SKILL.md"))) {
      throw new Error(`${skill.id}: missing generated SKILL.md`);
    }
    const files = listFiles(packageDir);
    const totalBytes = files.reduce((sum, file) => sum + fs.statSync(file).size, 0);
    if (files.length > MAX_FILES || totalBytes > MAX_TOTAL_BYTES) {
      throw new Error(`${skill.id}: package exceeds Lovable limits`);
    }
    for (const file of files) {
      if (fs.statSync(file).size > MAX_FILE_BYTES) {
        throw new Error(`${skill.id}: ${file} exceeds 1 MB`);
      }
    }
  }
  return manifest;
}

function main() {
  try {
    const args = parseArgs(process.argv.slice(2));
    const manifest = args.mode === "check" ? check(args) : generate(args);
    const count = manifest.skills.length;
    const out = path.relative(ROOT, args.out);
    console.log(`OK: Lovable skill packages ${args.mode === "check" ? "validated" : "written"} (${count} skills, ${out})`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === __filename) {
  main();
}

export {
  generate,
  check,
  lovableDescription,
  writeZip,
  parseFrontmatter,
  selectLovableSkills,
};
