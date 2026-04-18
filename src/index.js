import * as core from '@actions/core';

import { setup as setupLinux } from './linux.js';
import { setup as setupWindows } from './windows.js';

async function run() {
  try {
    const diffPdfVersion = core.getInput('diff-pdf-version');

    switch (process.platform) {
      case 'linux':
        await setupLinux(diffPdfVersion);
        break;
      case 'win32':
        await setupWindows(diffPdfVersion);
        break;
      default:
        throw new Error(`${process.platform} not supported`);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
