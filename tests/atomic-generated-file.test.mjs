import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { writeGeneratedFile } from "../scripts/atomic-generated-file.mjs";

test("generated writes preserve content, reject symlinks and break hardlink writes", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "generated-test-"));
  try {
    const target = path.join(dir, "output");
    const outside = path.join(dir, "outside");
    fs.writeFileSync(outside, "private");
    fs.symlinkSync(outside, target);
    assert.throws(() => writeGeneratedFile(target, "changed"));
    assert.equal(fs.readFileSync(outside, "utf8"), "private");
    fs.unlinkSync(target);
    fs.linkSync(outside, target);
    assert.equal(writeGeneratedFile(target, "changed"), true);
    assert.equal(fs.readFileSync(outside, "utf8"), "private");
    assert.equal(fs.readFileSync(target, "utf8"), "changed");
    assert.equal(writeGeneratedFile(target, "changed"), false);
    assert.equal(writeGeneratedFile(path.join(dir, "new", "file"), "new"), true);
    assert.equal(fs.readdirSync(dir).some(name => name.startsWith(".generated-")), false);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
