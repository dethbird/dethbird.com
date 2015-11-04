"use strict";

var fountain = require('fountain-js');

var preview = fountain.parse(config.example);
console.log(preview);

$(window).ready(function(){
    $('#preview').html(preview.script_html);
});