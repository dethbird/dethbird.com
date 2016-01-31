var ImageRotatorView = Backbone.View.extend({
    currentIndex: -1,
    initialize: function(options) {
        var that = this;
        var images = $(this.el).find('img');
        that.images = images;
        that.currentIndex = that.images.length-1;

        $.each(that.images, function(i,e){
          if (i < that.images.length-1) {
            $(e).fadeOut(0);
          }
        });

        that.timeout = setInterval(function(){
          that.nextImage();
        }, options.duration);
    },
    nextImage: function() {
      var that = this;
      $(that.images[that.currentIndex]).fadeOut(1000);
      that.currentIndex++;
      if (that.currentIndex >= that.images.length) {
        that.currentIndex = 0;
      }
      $(that.images[that.currentIndex]).fadeIn(1000);
    }
});

module.exports = ImageRotatorView;
