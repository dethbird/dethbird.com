var ProjectView = Backbone.View.extend({
    configs: null,
    initialize: function(options) {
        var that = this;
        that.configs = options.configs;

        $('#project').on('change', function(e){
          document.location = '/projects/' + $(e.currentTarget).find('option:selected').val();
        });

    }
});

module.exports = ProjectView;
