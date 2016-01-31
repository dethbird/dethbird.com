var ImageRotatorView = require('../library/views/ImageRotatorView');

$(document).ready(function(){
  var imageRotatorView = new ImageRotatorView({
    el: "div.rotator-images",
    duration: 5000
  });
  console.log(imageRotatorView);
});
