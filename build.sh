#!/bin/bash

rm -rf dist
cd frontend
npm run clean-install
npm run build
mv dist ../dist

cd ../backend
npm run clean-install
node app.js
