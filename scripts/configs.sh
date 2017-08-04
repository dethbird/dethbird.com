#!/bin/bash
cp configs/configs.shadow.yml configs/configs.yml
out=$(php scripts/php/configs.php)
echo $out