import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { buildSnapshot } from '../scripts/dependency-snapshot.mjs';

const context = { sha: 'a'.repeat(40), ref: 'refs/heads/master', runId: 'test' };
function fixture(t, packages) {
  const dir = mkdtempSync(path.join(tmpdir(), 'dependency-snapshot-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  writeFileSync(path.join(dir, 'package.json'), JSON.stringify(packages['']));
  writeFileSync(path.join(dir, 'package-lock.json'), JSON.stringify({ lockfileVersion: 3, packages }));
  return dir;
}

test('preserves nested versions, directness, peer edges and development/runtime scope', async t => {
  const dir = fixture(t, {
    '': { name: 'fixture', version: '1.0.0', dependencies: { app: '1.0.0', shared: '2.0.0' }, devDependencies: { tool: '1.0.0' } },
    'node_modules/app': { version: '1.0.0', dependencies: { shared: '1.0.0' } },
    'node_modules/app/node_modules/shared': { version: '1.0.0' },
    'node_modules/shared': { version: '2.0.0' },
    'node_modules/tool': { version: '1.0.0', dev: true, peerDependencies: { shared: '2.0.0' }, optionalDependencies: { absent: '1.0.0' } }
  });
  const data = (await buildSnapshot(dir, context)).manifests['package-lock.json'].resolved;
  assert.equal(Object.keys(data).length, 4);
  assert.equal(data['node_modules/app'].relationship, 'direct');
  assert.equal(data['node_modules/app/node_modules/shared'].relationship, 'indirect');
  assert.deepEqual(data['node_modules/app'].dependencies, ['node_modules/app/node_modules/shared']);
  assert.deepEqual(data['node_modules/tool'].dependencies, ['node_modules/shared']);
  assert.equal(data['node_modules/tool'].scope, 'development');
  assert.equal(data['node_modules/shared'].scope, 'runtime');
});

test('fails rather than submitting missing required dependencies', async t => {
  const dir = fixture(t, { '': { name: 'fixture', version: '1.0.0', dependencies: { absent: '1.0.0' } } });
  await assert.rejects(buildSnapshot(dir, context), /Unresolved root dependency/);
});

test('preserves every current lockfile dependency including vulnerable braces and bundled npm', async () => {
  const lock = JSON.parse(readFileSync(new URL('../package-lock.json', import.meta.url)));
  const snapshot = await buildSnapshot(new URL('..', import.meta.url).pathname, context);
  const data = snapshot.manifests['package-lock.json'].resolved;
  assert.deepEqual(Object.keys(data).sort(), Object.keys(lock.packages).filter(Boolean).sort());
  for (const [location, entry] of Object.entries(data)) {
    assert.equal(entry.scope, lock.packages[location].dev ? 'development' : 'runtime');
    assert(entry.package_url.endsWith(`@${encodeURIComponent(lock.packages[location].version)}`));
    for (const dependency of entry.dependencies) assert(data[dependency], `Missing edge ${dependency}`);
  }
  assert.equal(data['node_modules/braces'].package_url, `pkg:npm/braces@${lock.packages['node_modules/braces'].version}`);
  assert(data['node_modules/npm/node_modules/@npmcli/arborist']);
});


test('optional runtime dependencies shared with development remain runtime', async t => {
  const dir = fixture(t, {
    '': { name: 'fixture', version: '1.0.0', optionalDependencies: { shared: '1.0.0' }, devDependencies: { tool: '1.0.0' } },
    'node_modules/shared': { version: '1.0.0', devOptional: true },
    'node_modules/tool': { version: '1.0.0', dev: true, dependencies: { shared: '1.0.0' } }
  });
  const data = (await buildSnapshot(dir, context)).manifests['package-lock.json'].resolved;
  assert.equal(data['node_modules/shared'].scope, 'runtime');
  assert.equal(data['node_modules/tool'].scope, 'development');
});

test('scoped npm aliases retain canonical package identity', async t => {
  const dir = fixture(t, {
    '': { name: 'fixture', version: '1.0.0', dependencies: { alias: 'npm:@scope/actual@1.0.0' } },
    'node_modules/alias': { name: '@scope/actual', version: '1.0.0' }
  });
  const data = (await buildSnapshot(dir, context)).manifests['package-lock.json'].resolved;
  assert.equal(data['node_modules/alias'].package_url, 'pkg:npm/%40scope/actual@1.0.0');
  assert.equal(data['node_modules/alias'].relationship, 'direct');
});
