import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import os from 'node:os';
import path from 'node:path';

const DIFF_PDF_BASE_DIR = path.join(os.homedir(), 'diff-pdf');

export async function setup(version) {
  const downloadUrl = `https://github.com/vslavik/diff-pdf/releases/download/v${version}/diff-pdf-win-${version}.zip`;

  const zipFilePath = await tc.downloadTool(downloadUrl);
  const exeFolderPath = await tc.extractZip(zipFilePath, DIFF_PDF_BASE_DIR);

  core.addPath(exeFolderPath);
}
