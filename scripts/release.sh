#!/bin/sh

set -e

VERSION=$(node -p "require('./package.json').version")

# Test
npm test
npm run lint
npm run build

# Changelog
npm run changelog

# Commit
git add CHANGELOG.md
git add package.json
git commit -m $VERSION
git push origin $(git branch --show-current)

# Git tag
git tag "v$VERSION"
git push origin "v$VERSION"

# NPM
npm publish