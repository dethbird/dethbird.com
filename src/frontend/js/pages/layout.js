var BgGeneratorView = require('../library/views/BgGeneratorView');

$(document).ready(function(){
  var bgGeneratorView = new BgGeneratorView({
    el: "div.body-background.honeycombs",
    objectWidth: 109,
    objectHeight: 97,
    paddingHorizontal: 60,
    offsetAlternateRows: -84,
    objectUris: [
        '/img/hex-bg2.png',
        '/img/hex-bg2.png',
        '/img/hex-bg.png',
        '/img/hex-bg.png',
        '/img/hex-bg.png',
        '/img/hex-bg.png',
        '/img/hex-bg.png',
        '/img/hex-bg.png',
        '/img/hex-bg.png',
        '/img/hex-bg.png',
        '/img/hex-bg.png'
    ],
    yProbabilities: [
      {
        gradient: 0,
        probability: 0.9
      },
      {
        gradient: 20,
        probability: 0.4
      },
      {
        gradient: 50,
        probability: 0.1
      },
      {
        gradient: 70,
        probability: 0.01
      }
    ],
    xProbabilities: [
      {
        gradient: 0,
        probability: 0.9
      },
      {
        gradient: 40,
        probability: 0.6
      },
      {
        gradient: 60,
        probability: 0.2
      }
    ]
  });
  // console.log(bgGeneratorView);
});
