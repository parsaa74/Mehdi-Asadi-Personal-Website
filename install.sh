#!/bin/bash

echo "Cleaning up..."
rm -rf node_modules package-lock.json

echo "Installing dependencies..."
npm install --unsafe-perm --legacy-peer-deps --force

if [ $? -eq 0 ]; then
    echo "Installation successful!"
    echo "Starting dev server..."
    npm run dev
else
    echo "Installation failed, trying with sudo..."
    sudo npm install --legacy-peer-deps
fi 