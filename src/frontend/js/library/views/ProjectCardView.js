var ProjectCardView = Backbone.View.extend({
    model: null,
    initialize: function(options) {
        var that = this;
        this.model = options.model;
        // click thumbnails to select preview
        $(this.el).find('.thumbnail').click(function(e){

            $(that.el).find('.thumbnail').removeClass('active');
            $(e.currentTarget).addClass('active');

            var thumbnailImage =  $(e.currentTarget).find('img');
            var displayImage = $(that.el).find('img.display');
            displayImage.removeClass('portrait').removeClass('landscape');
            displayImage.attr('src', thumbnailImage.attr('src'));
            displayImage.attr('data-image-index', displayImage.attr('data-image-index'));
            // previewImage.addClass(
            //   that.model.get('images')[thumbnailImage.attr('data-image-index')].orientation
            // );
        });


    }
});

module.exports = ProjectCardView;
