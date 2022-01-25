#!/usr/bin/env bash

SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

projectName="$(basename "$(PWD)")"

# ensure the dist dir
DIST_DIR="${SCRIPTPATH}/../../../dist/${projectName}"
mkdir -p "${DIST_DIR}"

currentVersion="$(node -p -e "require('./package.json').version")"
npm run build
npm version patch

# add the generic bitpack files
cp bitpack.json "${DIST_DIR}/package.txt"
cp publishKey.json "${DIST_DIR}/publish-key.txt"
cp man.txt "${DIST_DIR}/manual.txt"
cp dist/main.js "${DIST_DIR}/main.js"
cp dist/version.txt "${DIST_DIR}/version.txt"

git add "${DIST_DIR}"
git add package.json
git commit -m "[${projectName}] Release: $currentVersion"
