#!/usr/bin/env bash

p=(${PWD//\// })
currentVersion=$(node -p -e "require('./package.json').version")
npm run build
npm version patch
git add dist
git add package.json
git commit -m "[${p[-1]}] Release: $currentVersion"
