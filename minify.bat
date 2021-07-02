@echo off

REM Clean minified directory
del /s /q .\min\*.*

REM Copy resources
xcopy /s /i public\res min\res
echo Copied resources

REM Minify code
call npx html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes public/index.html > min/index.html
echo Minified HTML
java -jar minify-compilers/closure-compiler-v20210601.jar --js public/js/* --js_output_file min/js/index.js
echo Minified JS
if not exist .\min\css mkdir .\min\css
call npx postcss public/css/* --dir ./min/css
echo Minified CSS

echo Completed!