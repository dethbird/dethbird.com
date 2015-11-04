#!/bin/bash
FRONTEND_VIEWS=frontend/js/views/*.js

echo "Building frontend"
for f in $FRONTEND_VIEWS
do
    n=`echo $f | sed -r "s/frontend/public/g"`
    browserify $f -o $n
    echo $n
done