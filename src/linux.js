const exec = require('@actions/exec');

const WORKING_DIR = '/tmp/diff-pdf-src';
const REQUIRED_PACKAGES = [
  'make',
  'automake',
  'g++',
  'libpoppler-glib-dev',
  'poppler-utils',
  'libwxgtk3.2-dev'
];

export async function setup(version) {
  await exec.exec('sudo apt-get update');
  await exec.exec(`sudo apt-get install ${REQUIRED_PACKAGES.join(' ')}`);
  await exec.exec(`git clone https://github.com/vslavik/diff-pdf.git -b v${version} --depth 1 ${WORKING_DIR}`);

  const buildOptions = {
    cwd: WORKING_DIR
  };
  await exec.exec('./bootstrap', undefined, buildOptions);
  await exec.exec('./configure', undefined, buildOptions);
  await exec.exec('make', undefined, buildOptions);
  await exec.exec('sudo make install', undefined, buildOptions);
}
