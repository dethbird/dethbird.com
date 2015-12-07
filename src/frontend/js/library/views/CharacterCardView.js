var CharacterCardView = Backbone.View.extend({
    model: null,
    initialize: function(options) {
        var that = this;
        this.model = options.model;
        $(this.el).find('thumbnail').click(function(e){
            $(that.el).find('thumbnail').removeClass('active');
            $(that.el).find('preview img').removeClass('portrait').removeClass('landscape');
            $(e.currentTarget).addClass('active');
            $(that.el).find('preview img').attr('src', $(e.currentTarget).find('img').attr('src'));
            $(that.el).find('preview img').addClass(
              that.model.get('images')[$(e.currentTarget).find('img').attr('data-image-index')].orientation
            );
        });
        this.render();
    }
});

module.exports = CharacterCardView;
