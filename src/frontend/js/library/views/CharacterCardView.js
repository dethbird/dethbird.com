var CharacterCardView = Backbone.View.extend({
    model: null,
    initialize: function(options) {
        var that = this;
        this.model = options.model;
        $(this.el).find('thumbnail').click(function(e){
            $(that.el).find('thumbnail').removeClass('active');
            $(e.currentTarget).addClass('active');
            $(that.el).find('preview img').attr('src', $(e.currentTarget).find('img').attr('src'));
        });
        this.render();
    }
});

module.exports = CharacterCardView;
