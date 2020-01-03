#!/bin/bash

rm -rf dist
cd frontend
npm clean install
npm run build
mv dist ../dist

cd ../backend
npm clean install
node app.js
