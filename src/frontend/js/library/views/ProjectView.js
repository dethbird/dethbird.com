var CharacterCollection = require('../collections/projects/CharacterCollection');
var CardView            = require('./CardView');
var CardViewSingleImage = require('./CardViewSingleImage');

var ProjectView = Backbone.View.extend({
    characterCollection: null,
    conceptArtCollection: null,
    initialize: function(options) {
        var that = this;

        this.characterCollection = new CharacterCollection();
        $.each(options.configs.characters.list, function(i,character){
          character = new Backbone.Model(character);
          that.characterCollection.add(character);
          var card = new  CardView({
              el: '#' + character.get('id'),
              model: character
          });
        });

        if(options.configs.concept_art!=undefined) {
          this.conceptArtCollection = new Backbone.Collection();
          $.each(options.configs.concept_art.list, function(i,item){
            item = new Backbone.Model(item);
            that.conceptArtCollection.add(item);
            var card = new CardView({
                el: '#' + item.get('id'),
                model: item
            });
          });
        }

        if(options.configs.storyboards!=undefined) {
          $.each(options.configs.storyboards, function(i,storyboard){
              $.each(storyboard.boards, function(i,item){
                item = new Backbone.Model(item);
                var card = new CardView({
                    el: '#' + item.get('id'),
                    model: item
                });
              });
          });
        }

        if(options.configs.reference_images!=undefined) {
            $.each(options.configs.reference_images.list, function(i,item){
              item = new Backbone.Model(item);
              console.log(item);
              var card = new CardViewSingleImage({
                  el: '#' + item.get('id'),
                  model: item
              });
            });
        }

        $('#project').on('change', function(e){
          document.location = '/projects/' + $(e.currentTarget).find('option:selected').val();
        });

        $('body overlay content').click(function(){
          $('body overlay').hide();
        })
    }
});

module.exports = ProjectView;
