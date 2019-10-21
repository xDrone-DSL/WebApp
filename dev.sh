#!/bin/bash

cd frontend
npm install
npm run serve &
mv dist ../dist

cd ../backend
npm install
node app.js
