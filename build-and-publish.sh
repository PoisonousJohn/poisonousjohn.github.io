#!/bin/sh
set -e
jekyll build
cd _site
git add .
git commit -am 'regenerated files'
git push
