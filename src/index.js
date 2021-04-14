const core = require('@actions/core');
const linux = require('./linux');

async function run() {
  try {
    switch (process.platform) {
      case 'linux':
        await linux.setup();
        break;
      default:
        throw new Error(`${process.platform} not supported`);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
