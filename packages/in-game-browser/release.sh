#!/usr/bin/env bash

npm run build
newVersion=$(npm version patch)
git add dist
git add package.json
git commit -m "Release: $newVersion"
