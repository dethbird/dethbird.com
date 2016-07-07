(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var DropdownButtonView = require('./buttons/DropdownButtonView');
var DashboardView = Backbone.View.extend({
    model: null,
    dropdownButtonView: null,
    currentService: null,
    initialize: function(options) {
        var that = this;
        that.$el = $(that.el);
        that.currentService = $(that.$el.find(
            '.content-container')[0]).data('service');
        that.dropdownButtonView = new DropdownButtonView({
            el: '#contentSelector'
        });
        that.dropdownButtonView.on('serviceChange', function(serviceName){
            that.currentService = serviceName;
            that.render();
        });
        that.render();
    },
    render: function() {
        var that = this;
        $(that.$el.find('.content-container')).hide();
        $(that.$el.find(
            '.content-container[data-service=' + that.currentService + ']')).show();
    }
});

module.exports = DashboardView;

},{"./buttons/DropdownButtonView":2}],2:[function(require,module,exports){
var DropdownButtonView = Backbone.View.extend({
    currentService: null,
    initialize: function(options) {
        var that = this;
        that.$el = $(that.el);
        that.currentService = that.$el.find(
            '.dropdown-item:first-child').data('service');
        that.$el.find('.dropdown-item').on('click', function(e){
            that.currentService = $(e.target).data('service');
            that.render();
        });
        that.render();
    },
    render: function() {
        var that = this;
        var content = that.$el.find(
            '.dropdown-item[data-service=' + that.currentService+ ']').html();
        that.$el.find('.displayed-item').html(content);
        that.trigger('serviceChange', that.currentService);
    }
});

module.exports = DropdownButtonView;

},{}],3:[function(require,module,exports){
var LikeDropDashboardView = require('../library/views/LikeDropDashboardView');

var likeDropDashboardView = new LikeDropDashboardView({
    el: 'body'
});

},{"../library/views/LikeDropDashboardView":1}]},{},[3]);
