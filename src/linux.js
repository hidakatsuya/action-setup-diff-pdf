const exec = require('@actions/exec');

const WORKING_DIR = '/tmp/diff-pdf-src';
const REQUIRED_PACKAGES_BASE = [
  'make',
  'automake',
  'g++',
  'libpoppler-glib-dev',
  'poppler-utils',
];

export async function setup(version) {
  // Get Ubuntu version codename (e.g., jammy, noble)
  let ubuntuVersion = '';
  await exec.exec('lsb_release -cs', [], {
    listeners: {
      stdout: (data) => {
        ubuntuVersion += data.toString().trim();
      }
    }
  });

  const wxgtkPackage = (ubuntuVersion === 'jammy')
    ? 'libwxgtk3.2-dev'
    : 'libwxgtk3.0-gtk3-dev';

  const REQUIRED_PACKAGES = [...REQUIRED_PACKAGES_BASE, wxgtkPackage];

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
