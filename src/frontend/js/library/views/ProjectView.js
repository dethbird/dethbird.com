var CharacterCollection = require('../collections/projects/CharacterCollection');
var CharacterCardView = require('./CharacterCardView');

var ProjectView = Backbone.View.extend({
    characterCollection: null,
    initialize: function(options) {
        var that = this;
        this.characterCollection = new CharacterCollection();
        $.each(options.configs.characters.list, function(i,character){
          character = new Backbone.Model(character);
          that.characterCollection.add(character);
          var card = new CharacterCardView({
              el: '#' + character.get('id'),
              model: character
          });
        });
        $('#project').on('change', function(e){
          document.location = '/projects/' + $(e.currentTarget).find('option:selected').val();
        });

        $('body overlay content').click(function(){
          $('body overlay').hide();
        })
    }
});

module.exports = ProjectView;
