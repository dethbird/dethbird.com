#!/bin/bash

echo "Deploying..."

#initial cleanup
rm -rf vendor
rm -rf cache
rm -rf composer.lock

#get composer
curl -sS https://getcomposer.org/installer | /usr/local/bin/php 
/usr/local/bin/php composer.phar install

#cache directories
mkdir cache
chmod 777 cache

#cleanup
rm -rf composer.phar

#npm install
rm -rf node_modules
npm install

echo "deploy complete"
