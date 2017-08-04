#!/bin/bash
rm -rf vendor
[ -e composer.lock ] && rm composer.lock
curl -sS https://getcomposer.org/installer | php
php composer.phar install | php
rm -rf composer.phar
rm composer.lock
chmod 755 public
chmod 644 public/.htaccess public/index.php
