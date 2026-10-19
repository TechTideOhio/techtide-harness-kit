import fs from "node:fs";
import path from "node:path";

export function writeGeneratedFile(target, content) {
  let current;
  let fd;
  try {
    fd = fs.openSync(target, fs.constants.O_RDONLY | fs.constants.O_NOFOLLOW | fs.constants.O_NONBLOCK);
    if (!fs.fstatSync(fd).isFile()) throw new Error("Generated target must be a regular file");
    current = fs.readFileSync(fd, "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  } finally {
    if (fd !== undefined) fs.closeSync(fd);
  }
  if (current === content) return false;
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const directory = fs.mkdtempSync(path.join(path.dirname(target), ".generated-"));
  try {
    const temporary = path.join(directory, "output");
    fs.writeFileSync(temporary, content, { encoding: "utf8", flag: "wx", mode: 0o644 });
    fs.renameSync(temporary, target);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
  return true;
}
