var moment = require('moment');

var FileListingView = Backbone.View.extend({
    collection: null,
    events: {
        "click #btn-sort-by-name": "sortByName",
        "click #btn-sort-by-mtime": "sortByMtime"
    },
    initialize: function(options) {
        var that = this;
        this.collection = new Backbone.Collection(options.files);
        $.each(this.collection.models, function(i,model){
            var m = moment.unix(model.get('mtime'));
            model.set('mtimeDisplay', m.format("lll"));
            model.set('linkName', model.get('name').replace(".md", ""));
        });
        this.render(this.collection.models);
    },
    sortByName: function() {
        this.collection.comparator = "name";
        this.collection.sort();
        this.render(this.collection.models);
    },
    sortByMtime: function() {
        this.collection.comparator = "mtime";
        this.collection.sort();
        this.render(this.collection.models.reverse());
    },
    render: function(models) {
        var that = this;
        $($(that.el).find('#files')[0]).html('');
        $.each(models, function(i,model){
            var template = _.template($('#template-file').html());
            var html = template(model.attributes, {escape: false});
            $($(that.el).find('#files')[0]).append(html);
        });
    }
});

module.exports = FileListingView;
