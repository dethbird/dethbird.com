(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ButtonAnimationView = Backbone.View.extend({
    initialize: function(options) {
        var that = this;
        this.timeline = new TimelineMax({
            paused: true,
            onComplete: function(){
                alert('Fantastic!');
            }
        });
        this.timeline.set($(this.el), {autoAlpha:1});
        this.timeline
        .fromTo(
            this.el,
            1,
            {
                transformStyle: "preserve-3d",
                transformOrigin: "center 0px",
                rotationX: 0
            },
            {
                rotationX: 360 * 2,
                ease: Back.easeOut
            },
            0
        )
        .fromTo(
            this.el,
            2.2,
            {
                transformStyle: "preserve-3d",
                transformOrigin: "left 0px",
                rotationZ: 0
            },
            {
                rotationZ: 80,
                ease: Elastic.easeOut.config(1.5, 0.3)
            },
            0.8
        )
        .to(
            this.el,
            1.2,
            {
                physics2D: {
                    gravity: 5000,
                    velocity: 400,
                    angle: -90
                }
            },
            1
        );
        // console.log(this);
        $(this.el).on('click', function(){
            that.timeline.play(0);
        });
    }
});

module.exports = ButtonAnimationView;
},{}],2:[function(require,module,exports){
var ButtonAnimationView = require('../../library/views/animations/ButtonAnimationView');
/** extract the categories */
// var categories = [];
// $.each(configs.gallery, function(i,e){
//     categories.push(e.category);
// });
// categories = _.uniq(categories);

var buttonAnimationView = new ButtonAnimationView({
    el: '#great-button'
});

console.log(configs);
},{"../../library/views/animations/ButtonAnimationView":1}]},{},[2]);
