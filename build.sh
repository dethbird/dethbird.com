#!/bin/bash


pflag='' #PHP
jflag='' #Javascript
cflag='' #Cache
dflag='' #Dev (do not uglify JS)

while getopts 'pjcd' flag; do
  case "${flag}" in
    p) pflag='true' ;;
    j) jflag='true' ;;
    c) cflag='true' ;;
    d) dflag='true' ;;
    *) error "Unexpected option ${flag}" ;;
  esac
done


# PHP
if [[ $pflag = 'true' ]]; then
    echo "Composer and PHP"
    #initial cleanup
    rm -rf vendor
    rm -rf composer.lock
    #get composer
    curl -sS https://getcomposer.org/installer | php
    php composer.phar install
    #cleanup
    rm -rf composer.phar
fi

# JAVASCRIPT
if [[ $jflag = 'true' ]]; then
    echo "Javascript and frontend"
    FRONTEND_VIEWS=src/frontend/js/pages/*.js
    for f in $FRONTEND_VIEWS
    do
        n=`echo $f | sed -r "s/src\/frontend/public/g"`
        browserify $f -o $n
        if [[ $dflag = '' ]]; then
            echo "--uglifyjs--"
            uglifyjs $n -o $n
        else echo "--no uglifyjs--"
        fi
        echo $n
    done

    FRONTEND_VIEWS=src/frontend/js/pages/experiments/*.js
    for f in $FRONTEND_VIEWS
    do
        n=`echo $f | sed -r "s/src\/frontend/public/g"`
        browserify $f -o $n
        if [[ $dflag = '' ]]; then
            echo "--uglifyjs--"
            uglifyjs $n -o $n
        else echo "--no uglifyjs--"
        fi
        echo $n
    done
fi

# CACHE
if [[ $cflag = 'true' ]]; then
    echo "Cache"
    rm -rf cache
    mkdir cache
    chmod 777 cache
fi