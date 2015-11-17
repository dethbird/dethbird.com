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
var LoaderView = Backbone.View.extend({
    interval: null,
    timeline: null,
    maxPixels: 300,
    loadingEl: null,
    documentImagesLoaded: 0,
    documentImageCount: null,
    documentImages: null,
    fakeTimeOutComplete: false,
    imagesLoadedComplete: false,

    initialize: function(options) {

        var that = this;
        this.loadingEl = options.loadingEl;
        this.documentImages = $('img');
        this.documentImageCount = this.documentImages.length;

        for (i = 0; i < this.maxPixels; i++) {
          var dot = $("<div class='dot'/>");
          dot.appendTo($(this.el));
          dot.attr('id', "dot" + i);
        }

        this.timeline = new TimelineMax(
          {
            repeat: -1
          }
        );

        this.timeline.add( TweenMax.to($(this.loadingEl), .25, {
          scale: [1.2, 1.2],
          ease: Power1.easeIn
        }))
        .add( TweenMax.to($(this.loadingEl), 1, {
          scale: [1, 1],
          ease: Elastic.easeOut.config(1, 0.3)
        }))
        .call(this.render, null, this, 0);

        setTimeout(function(){
            that.fakeTimeOutComplete = true;
            // if(that.imagesLoadedComplete==true) {
                that.timeline.pause();
                $(that.el).fadeOut(1000);
            // }
        }, 1500);

        // $.each(this.documentImages, function(i,e){
        //     $(e).on('load', function(){
        //         that.documentImagesLoaded++;
        //         // console.log(that.documentImagesLoaded);
        //         if(that.documentImagesLoaded>(that.documentImageCount*.65)) {
        //             that.imagesLoadedComplete=true;
        //             if(that.fakeTimeOutComplete==true) {
        //                 that.timeline.pause();
        //                 $(that.el).fadeOut(1000);
        //             }
        //         }
        //     });
        // });

        $(that.el).css('margin-top', window.scrollY);


    },
    render: function() {
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var pixelSize = windowWidth / this.maxPixels;
        var counter = 0;
        var increase = ((Math.PI * Math.random() * 10) + 8) / this.maxPixels;
        var pos = Math.random()*4;
        var waveHeight = Math.random()*3 + 3;

        $.each($('.dot'), function(i,dot){

            TweenLite.set(dot, {
              x: i*pixelSize,
              y: (Math.sin( counter + pos)/waveHeight) * windowHeight,
              width: pixelSize,
              height: pixelSize,
              opacity: 1
            });

            TweenLite.to(dot, 1.2 + Math.random()*0.5, {
              opacity: 0,
              y: "+=" + Math.random() * 400 + 400,
              ease: RoughEase.ease.config({ template: Power0.easeNone, strength: 1.5, points: 20, taper: "none", randomize: true, clamp: false})
            });
            counter += increase;
        });
    }
});

module.exports = LoaderView;
},{}],5:[function(require,module,exports){
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
            // timeago
            var date = new Date(model.get('created_time')*1000);
            date = $.timeago(date.toISOString());
            model.set('date', date);
        }
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
},{"../../library/autolink":1}],6:[function(require,module,exports){
var RandomPostView = Backbone.View.extend({
    randomPosts: null,
    events: {
        "click a#random-post-button": "randomPost"
    },
    initialize: function(options) {
        var that = this;
        this.randomPosts = this.$('.random-post');
        // console.log(this.randomPosts);
        // this.randomPosts = $(this.el + ' .random-post');
        // console.log(this.randomPosts);
        // console.log(this.randomPosts[0]);
        $(this.randomPosts[0]).show();
    },
    randomPost: function() {
        $(this.randomPosts).hide();
        var index = Math.floor(Math.random() * this.randomPosts.length);
        $(this.randomPosts[index]).fadeIn(1000);
    }
});

module.exports = RandomPostView;
},{}],7:[function(require,module,exports){
var PortfolioGalleryView = require('../library/views/PortfolioGalleryView');
var PortfolioGalleryCollection = require('../library/collections/PortfolioGalleryCollection');
var PortfolioInstagramCollection = require('../library/collections/PortfolioInstagramCollection');
var LoaderView = require('../library/views/LoaderView');
var RandomPostView = require('../library/views/RandomPostView');

var loaderView = new LoaderView({
    el: '#loader',
    loadingEl: '#loader_logo'
});

var randomPostsView = new RandomPostView({
    el: '#random-posts'
});

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

    $('#intro-great-button').on('click', function(){
        alert("Fantastic!");
    });

    // click the first portfolio section
    $($('#portfolio-gallery .section-selector')[0]).trigger('click');

    $.each($('.tweet'), function(i,e){
        e = $(e);
        twttr.widgets.createTweet(
            e.data('tweet-id') + '',
            e[0],
            {
              width: 600
            }
        );
    });
});

},{"../library/collections/PortfolioGalleryCollection":2,"../library/collections/PortfolioInstagramCollection":3,"../library/views/LoaderView":4,"../library/views/PortfolioGalleryView":5,"../library/views/RandomPostView":6}]},{},[7]);
