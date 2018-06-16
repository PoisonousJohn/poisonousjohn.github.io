#!/bin/sh
set -e
jekyll build
cd _site
mv index.html index.htm
git add .
git commit -am 'regenerated files'
git push
