#!/bin/bash

# Clean minified directory
rm -r min/*

# Copy resources
cp -r public/res min/res
echo "Copied resources"

# Minify code
npx html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes public/index.html > min/index.html
echo "Minified HTML"
java -jar minify-compilers/closure-compiler-v20210601.jar --js public/js/* --js_output_file min/js/index.js
echo "Minified JS"
mkdir ./min/css
npx postcss public/css/* --dir ./min/css
echo "Minified CSS"

echo "Completed!"