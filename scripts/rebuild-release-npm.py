#!/usr/bin/env python3
"""Rebuild the release-only npm bundle with verified dependency security updates."""

import argparse
import base64
import gzip
import hashlib
import io
import json
from pathlib import Path
import tarfile
from urllib.request import urlopen

SOURCES = {
    "npm": (
        "https://registry.npmjs.org/npm/-/npm-11.21.1.tgz",
        "YTzL6QBEJXyHcTu0JiUc7RKMp+mzlJtl7rGLmERaXUQeFHIMc9atdr6G9M9C8vDWbv40epoTQAzNL2/PtZVDhQ==",
    ),
    "undici": (
        "https://registry.npmjs.org/undici/-/undici-6.29.1.tgz",
        "EvRlUt/QqAEvXdQeRMYUfwOQsfzpDztykrG2owGEE/rBOBoYv9uF39ZzsNDh4lTFHhTr2XOZjKkYgueD12ZmGA==",
    ),
    "ip-address": (
        "https://registry.npmjs.org/ip-address/-/ip-address-10.7.5.tgz",
        "t2v0rkILYv9WXmSL7TpAaU3HXgaFYOPUcH3QHgwQ++gpJuH3bqyMy4Fvt/DJCTKwzH3Cf+bAp5W/mFL39KPLzA==",
    ),
}
TARGET = Path(__file__).resolve().parents[1] / "vendor/npm-11.21.1-techtide.1.tgz"


def download(name):
    url, expected = SOURCES[name]
    with urlopen(url, timeout=60) as response:
        data = response.read()
    if base64.b64encode(hashlib.sha512(data).digest()).decode() != expected:
        raise ValueError(f"Integrity mismatch for {name}")
    files = {}
    with tarfile.open(fileobj=io.BytesIO(data), mode="r:gz") as archive:
        for member in archive:
            if member.isdir():
                continue
            if not member.isfile() or not member.name.startswith("package/") or ".." in Path(member.name).parts:
                raise ValueError(f"Unexpected archive entry: {member.name}")
            files[member.name] = (archive.extractfile(member).read(), member.mode)
    return files


def build():
    files = download("npm")
    for dependency, original in [("undici", "6.29.0"), ("ip-address", "10.7.2")]:
        prefix = f"package/node_modules/{dependency}/"
        if json.loads(files[prefix + "package.json"][0])["version"] != original:
            raise ValueError(f"Unexpected original {dependency} version")
        files = {name: value for name, value in files.items() if not name.startswith(prefix)}
        for name, value in download(dependency).items():
            files[prefix + name.removeprefix("package/")] = value
    package = json.loads(files["package/package.json"][0])
    package["version"] = "11.21.1+techtide.1"
    files["package/package.json"] = ((json.dumps(package, indent=2) + "\n").encode(), 0o644)
    output = io.BytesIO()
    with gzip.GzipFile(fileobj=output, mode="wb", mtime=0, filename="") as compressed:
        with tarfile.open(fileobj=compressed, mode="w", format=tarfile.GNU_FORMAT) as archive:
            for name, (data, mode) in sorted(files.items()):
                member = tarfile.TarInfo(name)
                member.size = len(data)
                member.mode = mode
                archive.addfile(member, io.BytesIO(data))
    return output.getvalue()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Compare a fresh rebuild with the committed bundle")
    args = parser.parse_args()
    data = build()
    if args.check:
        if TARGET.read_bytes() != data:
            raise SystemExit("Committed npm bundle differs from verified rebuild")
        print("Verified reproducible npm bundle")
    else:
        TARGET.parent.mkdir(parents=True, exist_ok=True)
        TARGET.write_bytes(data)
        print(TARGET)


if __name__ == "__main__":
    main()
