#!/bin/bash

sudo chmod -R 777 /home/ubuntu/demo_deploy

cd /home/ubuntu/demo_deploy

#add npm and node to path
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

# Install pm2
npm install -g pm2

# Install node modules
npm install

# Start App
pm2 start npm --name Demo_Deploy -- start
