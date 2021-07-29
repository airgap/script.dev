#! /bin/sh

cp -R src/html build
sass src/sass:build/css
cp -R src/fonts build/fonts
tsc
