(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** autolink */
(function(){var h=[].slice;String.prototype.autoLink=function(){var b,f,d,a,e,g;a=1<=arguments.length?h.call(arguments,0):[];e=/(^|[\s\n]|<br\/?>)((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;if(!(0<a.length))return this.replace(e,"$1<a href='$2'>$2</a>");d=a[0];f=function(){var c;c=[];for(b in d)g=d[b],"callback"!==b&&c.push(" "+b+"='"+g+"'");return c}().join("");return this.replace(e,function(c,b,a){c=("function"===typeof d.callback?d.callback(a):void 0)||"<a href='"+
a+"'"+f+">"+a+"</a>";return""+b+c})}}).call(this);
},{}],2:[function(require,module,exports){
var PortfolioGalleryCollection = Backbone.Collection.extend({
    initialize: function() {
        // console.log('init');
    }
});

module.exports = PortfolioGalleryCollection;
},{}],3:[function(require,module,exports){
var PortfolioInstagramCollection = Backbone.Collection.extend({
    initialize: function() {
        // console.log('init');
    }
});

module.exports = PortfolioInstagramCollection;
},{}],4:[function(require,module,exports){
var autoLink = require('../../library/autolink');

var PortfolioGalleryView = Backbone.View.extend({
    sectionSelectors: null,
    sections: null,
    thumbnails: null,
    overlayId: null,
    galleryCollection: null,
    galleryModelTemplateId: null,
    instagramCollection: null,
    instagramModelTemplateId: null,
    initialize: function(options) {
        var that = this;

        this.overlayId = options.overlayId;

        this.galleryCollection = options.galleryCollection;
        this.galleryModelTemplateId = options.galleryModelTemplateId;
        this.instagramCollection = options.instagramCollection;
        this.instagramModelTemplateId = options.instagramModelTemplateId;

        this.sectionSelectors = $(this.el).find('.section-selector');
        this.sections = $(this.el).find('.section');
        this.thumbnails = $(this.el).find('.thumbnail');


        // section selection
        $.each(this.sectionSelectors, function(i,e) {
            e = $(e);
            e.on('click', function(){
                $(that.sectionSelectors).removeClass('active');
                $('.section').hide();

                e.addClass('active');
                $('.section[data-section="' + e.data('section') + '"]').show();
            });

        });

        // thumbnail selection to overlay
        $.each(this.thumbnails, function(i,e) {
            e = $(e);
            e.on('click', function(){
                that.overlay(e);
            });
        });

        // hide overlay on escape
        $(document).keydown(function(e) {
            // ESCAPE key pressed
            if (e.keyCode == 27) {
                 $(that.overlayId).hide();
            }
        });
        $(that.overlayId + ' .contents').on('click', function(e){
            e.stopPropagation();
        });
        $(that.overlayId).on('click', function(e){
            $(that.overlayId).hide();
        });

        // re-fit overlay on window scroll
        // @todo refit the overlay

        // re-fit overlay on window resize
        // @todo refit the overlay
    },
    overlay: function(thumbnail){
        var that = this;
        var type = thumbnail.data('type');
        var model = null;
        var id = thumbnail.data('id');
        var templateId = null;
        if( type=="portfolio") {
            model = that.galleryCollection.get(id);
            templateId = that.galleryModelTemplateId;
        } else if (type=="instagram") {
            model = that.instagramCollection.get(id);
            templateId = that.instagramModelTemplateId;
            var date = new Date(model.get('created_time')*1000);
            // console.log($.timeago);
            date = $.timeago(date.toISOString());
            model.set('date', date);
        }
        console.log(model);
        // render in the contents
        var template = _.template($(templateId).html());
        var html = template(model.attributes, {escape: false});
        html = html.autoLink();
        html = html.replace(/#([a-zA-Z0-9]+)/g,'<a>#$1</a>');
        $(that.overlayId + ' .contents').html(html);
        // position the overlay
        $(that.overlayId).css('height', $('body').height());
        $(that.overlayId + ' .contents').css('margin-top', $(window).scrollTop());
        $(that.overlayId).show();
    }
});

module.exports = PortfolioGalleryView;
},{"../../library/autolink":1}],5:[function(require,module,exports){
var PortfolioGalleryView = require('../library/views/PortfolioGalleryView');
var PortfolioGalleryCollection = require('../library/collections/PortfolioGalleryCollection');
var PortfolioInstagramCollection = require('../library/collections/PortfolioInstagramCollection');


var portfolioGalleryCollection = new PortfolioGalleryCollection(portfolioData.gallery);
var portfolioInstagramCollection = new PortfolioInstagramCollection(instagramData);

var portfolioGalleryView = new PortfolioGalleryView({
    el: '#portfolio-gallery',
    overlayId: '#overlay',
    galleryCollection: portfolioGalleryCollection,
    galleryModelTemplateId: '#portfolio-gallery-template',
    instagramCollection: portfolioInstagramCollection,
    instagramModelTemplateId: '#instagram-gallery-template'
});

$(document).ready(function(){
    // click the first portfolio section
    $($('#portfolio-gallery .section-selector')[0]).trigger('click');
});

console.log(portfolioGalleryView);
},{"../library/collections/PortfolioGalleryCollection":2,"../library/collections/PortfolioInstagramCollection":3,"../library/views/PortfolioGalleryView":4}]},{},[5]);
