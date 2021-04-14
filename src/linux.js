const exec = require('@actions/exec');

const VERSION = '0.5';
const REQUIRED_PACKAGES = [
  'make',
  'automake',
  'g++',
  'libpoppler-glib-dev',
  'poppler-utils',
  'libwxgtk3.0-gtk3-dev'
];
const WORKING_DIR = '/tmp/diff-pdf-src';

export async function setup() {
  await exec.exec('sudo apt update');
  await exec.exec(`sudo apt install ${REQUIRED_PACKAGES.join(' ')}`);
  await exec.exec(`git clone https://github.com/vslavik/diff-pdf.git -b v${VERSION} --depth 1 ${WORKING_DIR}`);

  const buildOptions = {
    cwd: WORKING_DIR
  };
  await exec.exec('./bootstrap', undefined, buildOptions);
  await exec.exec('./configure', undefined, buildOptions);
  await exec.exec('make', undefined, buildOptions);
  await exec.exec('sudo make install', undefined, buildOptions);
}
