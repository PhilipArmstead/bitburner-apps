#!/usr/bin/env bash

currentVersion=$(node -p -e "require('./package.json').version")
npm run build
npm version patch
git add dist
git add package.json
git commit -m "Release: $currentVersion"
