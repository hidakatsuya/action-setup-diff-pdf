# setup-diff-pdf

GitHub Action to install [diff-pdf](https://github.com/vslavik/diff-pdf).

[![Test this action](https://github.com/hidakatsuya/setup-diff-pdf/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/hidakatsuya/setup-diff-pdf/actions/workflows/test.yml?query=branch%3Amain)

## Usage

```yaml
- uses: hidakatsuya/setup-diff-pdf@v1
  with:
    diff-pdf-version: 0.5
```

For the version of `diff-pdf` that can be specified, see [the diff-pdf releases](https://github.com/vslavik/diff-pdf/releases).

## Supported Platforms

- ubuntu-latest
- windows-latest

See [GitHub Docs](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#github-hosted-runners) for more information.

## Versioning

This action follows [the recommendations of GitHub Actions Versioning](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md).

## Building this action

```
$ yarn
$ yarn run package
```
