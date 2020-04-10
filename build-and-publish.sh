#!/bin/sh
set -e
set -x
if [ ! -d "build" ]; then
    mkdir build
    cp -r .git build
    cd build
    git reset --hard HEAD
    git checkout master
    git pull
fi
docker-compose run --rm jekyll jekyll build

cd _site
rm -f CNAME
touch CNAME
echo "fateev.pro" >> CNAME
mv index.html index.htm

cd ..

rm -rf build/*
cp -r _site/* build/
cd build
rm build-and-publish.sh
rm -rf .jekyll-cache
git add .
git commit -am 'regenerated files'
# git push
