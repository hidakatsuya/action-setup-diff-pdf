const core = require('@actions/core');
const linux = require('./linux');

const DIFF_PDF_VERSION = core.getInput('diff-pdf-version');

async function run() {
  try {
    switch (process.platform) {
      case 'linux':
        await linux.setup(DIFF_PDF_VERSION);
        break;
      default:
        throw new Error(`${process.platform} not supported`);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
