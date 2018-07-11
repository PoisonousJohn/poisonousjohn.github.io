#!/bin/sh
set -e
jekyll build
cd _site
rm -f CNAME
touch CNAME
echo "fateev.pro" >> CNAME
rm build-and-publish.sh
mv index.html index.htm
git add .
git commit -am 'regenerated files'
git push
