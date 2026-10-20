import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const npmRequire = createRequire(require.resolve('npm/package.json'));
const Arborist = npmRequire('@npmcli/arborist');

export async function buildSnapshot(directory, context) {
  const lock = JSON.parse(readFileSync(`${directory}/package-lock.json`, 'utf8'));
  assert.equal(lock.lockfileVersion, 3, 'Expected a version 3 lockfile');
  const tree = await new Arborist({ path: directory }).loadVirtual();
  const nodes = new Map([...tree.inventory.values()].map(node => [node.location, node]));
  assert.deepEqual([...nodes.keys()].sort(), Object.keys(lock.packages).sort(), 'Incomplete lockfile inventory');
  const direct = new Set([...tree.edgesOut.values()].filter(edge => edge.to).map(edge => edge.to.location));
  const resolved = Object.create(null);
  for (const [location, node] of nodes) {
    if (!location) continue;
    assert(!node.isLink && !node.extraneous, `Unsupported linked or extraneous node: ${location}`);
    assert.equal(node.version, lock.packages[location].version, `Version mismatch: ${location}`);
    assert(node.packageName && node.version, `Missing package identity: ${location}`);
    const dependencies = [];
    for (const edge of node.edgesOut.values()) {
      if (!edge.to && edge.optional) continue;
      assert(edge.to && edge.valid, `Unresolved dependency: ${location} -> ${edge.name}`);
      assert(nodes.has(edge.to.location) && edge.to.location, `Unknown dependency: ${edge.name}`);
      dependencies.push(edge.to.location);
    }
    const name = node.packageName.split('/').map(encodeURIComponent).join('/');
    resolved[location] = {
      package_url: `pkg:npm/${name}@${encodeURIComponent(node.version)}`,
      relationship: direct.has(location) ? 'direct' : 'indirect',
      scope: node.dev ? 'development' : 'runtime',
      dependencies: [...new Set(dependencies)].sort()
    };
  }
  for (const edge of tree.edgesOut.values()) {
    assert((!edge.to && edge.optional) || (edge.to && edge.valid), `Unresolved root dependency: ${edge.name}`);
  }
  assert.match(context.sha, /^[a-f0-9]{40}$/);
  assert.match(context.ref, /^refs\/heads\/[\w./-]+$/);
  assert(context.runId, 'Missing run ID');
  return {
    version: 0,
    sha: context.sha,
    ref: context.ref,
    job: { id: context.runId, correlator: 'npm-lockfile-submission' },
    detector: {
      name: 'harness-npm-arborist', version: '1.0.0',
      url: 'https://github.com/TechTideOhio/techtide-harness-kit/blob/master/scripts/dependency-snapshot.mjs'
    },
    scanned: new Date().toISOString(),
    manifests: {
      'package-lock.json': {
        name: 'package-lock.json', file: { source_location: 'package-lock.json' }, resolved
      }
    }
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const snapshot = await buildSnapshot(process.cwd(), {
    sha: process.env.GITHUB_SHA, ref: process.env.GITHUB_REF, runId: process.env.GITHUB_RUN_ID
  });
  process.stdout.write(`${JSON.stringify(snapshot, null, 2)}\n`);
}
