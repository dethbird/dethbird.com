var CardViewSingleImage = Backbone.View.extend({
    model: null,
    initialize: function(options) {
        var that = this;
        this.model = options.model;

        // click preview to open full size
        $(this.el).find('preview.overlay-trigger').click(function(e){
          var imageIndex = $(e.target).attr('data-image-index');
          var image = that.model.attributes;

          $('body overlay content').html('<img src="' + image.url + '" class="' + image.orientation + '" />');
          $('body overlay content').css('margin-top', $(window).scrollTop());
          $('body overlay').show();
        });

        // hide overlay on escape
        $(document).keydown(function(e) {
            // ESCAPE key pressed
            if (e.keyCode == 27) {
                 $('body overlay').hide();
            }
        });
        this.render();
    }
});

module.exports = CardViewSingleImage;
