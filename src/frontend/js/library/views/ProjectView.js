var ProjectCardView = require('./ProjectCardView');
var ProjectView = Backbone.View.extend({
    configs: null,
    initialize: function(options) {
        var that = this;
        that.project = options.project;

        $('.card').each(function(i,e){
            var $e = $(e);
            var cardView = new ProjectCardView({
                el: e
            });
        });

        $('#project').on('change', function(e){
            document.location = '/projects/' + $(e.currentTarget).find('option:selected').val();
        });

    }
});

module.exports = ProjectView;
