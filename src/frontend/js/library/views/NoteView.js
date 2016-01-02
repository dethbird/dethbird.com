var Vue     = require('vue');
var marked  = require('marked');

var NoteView = Backbone.View.extend({
    noteMarkdown: null,
    events: {
        "click #btn-toggle-edit": "toggleEditMode",
        "click #btn-save": "save"
    },
    initialize: function(options) {
        var that = this;
        this.noteMarkdown = options.noteMarkdown;
        this.render();
    },
    toggleEditMode: function() {
        if($('#note-edit').hasClass('hidden')) {
            $('#note-edit').removeClass('hidden');
            $('#btn-save').removeClass('hidden');
            $('#note-view').addClass('hidden');
        } else {
            $('#note-edit').addClass('hidden');
            $('#btn-save').addClass('hidden');
            $('#note-view').removeClass('hidden');
        }
    },
    save: function() {
        var that = this;
        console.log($('#editor textarea').val());
        $.ajax({
            method: "POST",
            url: "/note/" + currentNote,
            data: { content: $('#editor textarea').val() }
        })
        .success(function(){
            $('#note-view').html($('#editor div').html());
            that.toggleEditMode();
        });
    },
    render: function(models) {
        var that = this;
        var v = new Vue({
          el: '#editor',
          data: {
            input: noteMarkdown
          },
          filters: {
            marked: marked
          }
        });
    }
});

module.exports = NoteView;
