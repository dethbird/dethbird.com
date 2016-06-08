var Crafty = require('craftyjs');
var ScrollerGamerTestView = Backbone.View.extend({
  crafty: null,
    initialize: function(options) {
        var that = this;

        that.crafty = Crafty.init(500,350, $(that.el).attr('id'));
        that.crafty.e('2D, DOM, Color').attr({x: 0, y: 0, w: 100, h: 100}).color('#F00');
    }
});

module.exports = ScrollerGamerTestView;
