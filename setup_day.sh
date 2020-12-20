#!/bin/bash

echo "Enter name of new Typescript project - folder, subfolders and NPM dependencies will be installed will be created"
read varname

mkdir $varname
mkdir $varname/input
mkdir $varname/src
mkdir $varname/src/app
mkdir $varname/src/js
mkdir $varname/src/tests

cd $varname
jq -n '{"compilerOptions": {"rootDir": "src/app", "outDir": "src/js", "module": "commonjs", "moduleResolution": "node"}, "lib": ["es2016", "dom"]}' >  tsconfig.json