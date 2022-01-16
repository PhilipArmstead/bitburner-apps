#!/usr/bin/env bash

path=(${PWD//\// })
currentVersion=$(node -p -e "require('./package.json').version")
npm run build
npm version patch
git add dist
git add package.json
git commit -m "[${path[-1]}] Release: $currentVersion"
