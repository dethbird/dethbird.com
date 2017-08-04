#!/bin/bash
files=$(find ./src/frontend/css -name '*.less')
for f in ${files[@]}
do
  output=${f/"src/frontend"/"public"}
  output=${output/".less"/".css"}
  echo $(lessc $f $output --verbose)
done
