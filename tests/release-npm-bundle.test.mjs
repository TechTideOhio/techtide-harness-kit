import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { PassThrough } from 'node:stream';
import { test } from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { promisify } from 'node:util';

const execute = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const pluginRequire = createRequire(require.resolve('@semantic-release/npm'));
const npmPackagePath = pluginRequire.resolve('npm/package.json');
const npmRequire = createRequire(npmPackagePath);
const npmCli = path.join(path.dirname(npmPackagePath), 'bin/npm-cli.js');

test('release plugin resolves the patched npm bundle and patched bundled dependencies', async () => {
  assert.equal(npmRequire('./package.json').version, '11.21.1+techtide.1');
  assert.equal(npmRequire('undici/package.json').version, '6.29.1');
  assert.equal(npmRequire('ip-address/package.json').version, '10.7.5');
  const result = await execute(process.execPath, [npmCli, '--version']);
  assert.equal(result.stdout.trim(), '11.21.1+techtide.1');
});

test('semantic-release prepares, packs and publishes to a disposable loopback registry', async () => {
  const cwd = await mkdtemp(path.join(tmpdir(), 'harness-release-test-'));
  const publications = [];
  const unexpected = [];
  const server = createServer(async (request, response) => {
    response.setHeader('content-type', 'application/json');
    if (request.method === 'PUT' && request.url === '/release-bundle-fixture') {
      const chunks = [];
      for await (const chunk of request) chunks.push(chunk);
      publications.push(JSON.parse(Buffer.concat(chunks)));
      response.writeHead(201).end(JSON.stringify({ ok: true }));
    } else if (request.method === 'GET' && request.url === '/release-bundle-fixture') {
      response.writeHead(404).end(JSON.stringify({ error: 'Package has not been published yet' }));
    } else {
      unexpected.push(`${request.method} ${request.url}`);
      response.writeHead(404).end(JSON.stringify({ error: 'Unexpected registry request' }));
    }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try {
    const registry = `http://127.0.0.1:${server.address().port}/`;
    const npmrc = path.join(cwd, '.npmrc');
    await writeFile(npmrc, `registry=${registry}\n//127.0.0.1:${server.address().port}/:_authToken=local-fixture-only\n`);
    const pkg = { name: 'release-bundle-fixture', version: '0.0.0', files: ['index.js'], publishConfig: { registry } };
    await writeFile(path.join(cwd, 'package.json'), JSON.stringify(pkg));
    await writeFile(path.join(cwd, 'index.js'), 'module.exports = "release-fixture";\n');
    const sink = new PassThrough();
    sink.resume();
    const env = {
      PATH: `${path.join(root, 'node_modules/.bin')}${path.delimiter}${path.dirname(process.execPath)}${path.delimiter}${process.env.PATH}`,
      npm_config_registry: registry,
      npm_config_userconfig: npmrc,
      npm_config_ignore_scripts: 'true',
      npm_config_audit: 'false',
      npm_config_provenance: 'false',
    };
    const context = { cwd, env, stdout: sink, stderr: sink, nextRelease: { version: '1.2.3', channel: 'next' }, logger: { log() {} } };
    const pluginDir = path.dirname(require.resolve('@semantic-release/npm'));
    const { default: prepare } = await import(pathToFileURL(path.join(pluginDir, 'lib/prepare.js')));
    const { default: publish } = await import(pathToFileURL(path.join(pluginDir, 'lib/publish.js')));
    await prepare(npmrc, { tarballDir: 'packed' }, context);
    assert.equal(JSON.parse(await readFile(path.join(cwd, 'package.json'))).version, '1.2.3');
    assert.ok((await readFile(path.join(cwd, 'packed/release-bundle-fixture-1.2.3.tgz'))).length > 0);
    await publish(npmrc, {}, pkg, context);
    assert.deepEqual(unexpected, []);
    assert.equal(publications.length, 1);
    const publication = publications[0];
    assert.equal(publication['dist-tags'].next, '1.2.3');
    assert.equal(publication.versions['1.2.3'].name, pkg.name);
    const attachment = publication._attachments['release-bundle-fixture-1.2.3.tgz'];
    assert.ok(Buffer.from(attachment.data, 'base64').length > 0);
  } finally {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
    await rm(cwd, { recursive: true, force: true });
  }
});
