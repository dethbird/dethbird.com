var PageCollection = require('../collections/comic/PageCollection');
var CharacterCollection = require('../collections/comic/CharacterCollection');

var ComicView = Backbone.View.extend({
    // pages: null, // pages of the comic
    currentPage: null,
    characterCollection: null, // characters in order of appearance
    pageCollection: null, // the page data
    initialize: function(options) {
        // variables
        var that = this;
        // that.pages = options.pages;
        // that.indexes = options.indexes;
        that.currentPage = 0;
        this.characterCollection = new CharacterCollection();
        this.pageCollection = new PageCollection(options.pages);

        // interactions
        $(document).on('keydown', function(e) {
            that.keyPress(e);
        });

        this.render();
    },
    keyPress: function(e) {
        var that = this;

        // prev or next
        switch (e.which) {
            case 39:
                this.currentPage++;
                if(this.currentPage>this.pageCollection.models.length-1) {
                    this.currentPage = 0;
                }
                break;
            case 37:
                this.currentPage--;
                if(this.currentPage<0) {
                    this.currentPage = this.pageCollection.models.length-1;
                }
                break;
        }



        this.render();
    },
    render: function() {
        var that = this;
        // current page
        var page = this.pageCollection.models[this.currentPage];

        // character deltas
        $.each(page.get('deltas'), function(character,deltas){
            var model = that.characterCollection.findWhere({name: character});
            if (model==undefined){
                model = new Backbone.Model({
                    name: character
                });
                that.characterCollection.add(model);

                var template = _.template($('#template-character-box').html());
                var html = template(model.attributes, {escape: false});
                $($(that.el).find('#characters')[0]).append(html);

                model.on('change', function(e){
                    that.renderDelta(e);
                });

            }
            $.each(deltas, function(i,e){
                model.set(i,e);
            });
        });
    },
    renderDelta: function(model){
        var that = this;
        var characterBox = $($('#characters .character[data-character-name="' + model.get('name') + '"]')[0]);

        $.each(model.changed, function(i,e){
            var delta = characterBox.find('.delta[data-delta-name="' + i + '"]');
            var previousValue = model._previousAttributes[i]==undefined?0:model._previousAttributes[i];
            if(delta.length==0){
                var template = _.template($('#template-character-delta').html());
                var html = template({name: i, value: e, previousValue: previousValue}, {escape: false});
                characterBox.append(html);
                delta = characterBox.find('.delta[data-delta-name="' + i + '"]');
                that.animateDelta(delta[0], model);
            } else {
                delta.attr('data-delta-value', e);
                delta.attr('data-delta-previous-value', previousValue);
                that.animateDelta(delta[0], model)
            }
        });
    },
    animateDelta: function(el, model) {
        var that = this;
        el = $(el);
        el.find('.name').html(el.attr('data-delta-name'));
        el.find('.value').html(el.attr('data-delta-value'));
        TweenLite.to(el.find('.value-indicator'), 2, {
            width: el.attr('data-delta-value') + 'px',
            ease: Elastic.easeOut.config(1, 0.25)
        });
    }
});

module.exports = ComicView;