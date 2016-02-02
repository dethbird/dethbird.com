var BgGeneratorView = Backbone.View.extend({
    currentIndex: -1,
    initialize: function(options) {
      var that = this;
      that.objectWidth = options.objectWidth;
      that.objectHeight = options.objectHeight;
      that.objectUris = options.objectUris;
      that.paddingHorizontal = options.paddingHorizontal;
      that.offsetAlternateRows = options.offsetAlternateRows;
      that.xProbabilities = options.xProbabilities;
      that.yProbabilities = options.yProbabilities;
      that.render();
    },
    getYProbability: function(yPos, containerHeight) {
      var that = this;
      var gradientPercent = yPos / containerHeight * 100;
      var prob = 0;
      $.each(that.yProbabilities, function(i,p) {
        if (gradientPercent > p.gradient) {
          prob = p.probability;
        }
      });
      return prob;
    },
    getXProbability: function(xPos, containerWidth) {
      var that = this;
      var width = containerWidth / 2;
      if (xPos > width) {
        xPos = xPos - width;
      } else {
        xPos = width - xPos;
      }
      var gradientPercent = xPos / width * 100;
      var prob = 0;
      $.each(that.xProbabilities, function(i,p) {
        if (gradientPercent > p.gradient) {
          prob = p.probability;
        }
      });
      return prob;
    },
    render: function() {
      var that = this;
      var containerHeight = document.body.scrollHeight;
      var containerWidth = document.body.scrollWidth;

      $(that.el).css('height', document.body.scrollHeight - 300);

      startY = 0;
      startX = 0;
      row = 1;
      while (startY < containerHeight) {
        var imgIndex = Math.floor(Math.random() * that.objectUris.length);
        var img = $('<img src="' + that.objectUris[imgIndex] + '" />');
        $(img).css({
          top: startY,
          left: startX,
          opacity: 0.5
        });
        startX = startX + that.objectWidth + that.paddingHorizontal;
        if (startX > containerWidth) {
          startX = 0;
          startY = startY + (that.objectHeight/2);
          row++;
          if (row % 2 == 0) {
            startX = startX - that.offsetAlternateRows;
          }
        }
        // append based on draw probability
        // Y less and less as scrollheight gets greater
        // X more toward the center of the screen
        var yProb = that.getYProbability(startY, containerHeight);
        var xProb = that.getXProbability(startX, containerWidth);
        var prob = Math.random();

        if (prob < yProb && prob < xProb) {
            $(that.el).append(img);
        }

      }
      TweenMax.staggerTo($(that.el).find('img'), 1, {opacity: 0.9}, 0.02);
    }
});

module.exports = BgGeneratorView;
