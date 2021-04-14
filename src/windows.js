const core = require('@actions/core');
const tc = require('@actions/tool-cache');
const os = require('os');
const path = require('path');

const DIFF_PDF_BASE_DIR = path.join(os.homedir(), 'diff-pdf');

export async function setup(version) {
  const downloadUrl = `https://github.com/vslavik/diff-pdf/releases/download/v${version}/diff-pdf-win-${version}.zip`;

  const zipFilePath = await tc.downloadTool(downloadUrl);
  const exeFolderPath = await tc.extractZip(zipFilePath, DIFF_PDF_BASE_DIR);

  core.addPath(exeFolderPath);
}
