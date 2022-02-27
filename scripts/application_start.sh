#!/bin/bash

cd /home/ubuntu/demo_deploy

# Add npm and node to path
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # load nvm
[ -s "$NVM_DIR/bash_completion"] && \. "$NVM_DIR/bash_completion"

# Install pm2
npm install -g pm2

# Install node modules
npm install

# Start App
pm2 start npm --name Demo_Deploy -- start
