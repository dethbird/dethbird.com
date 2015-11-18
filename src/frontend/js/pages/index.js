var PortfolioGalleryView = require('../library/views/PortfolioGalleryView');
var PortfolioGalleryCollection = require('../library/collections/PortfolioGalleryCollection');
var PortfolioInstagramCollection = require('../library/collections/PortfolioInstagramCollection');
var LoaderView = require('../library/views/LoaderView');
var RandomPostView = require('../library/views/RandomPostView');
var ButtonAnimationView = require('../library/views/animations/ButtonAnimationView');

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

var buttonAnimationView = new ButtonAnimationView({
    el: '#intro-great-button'
});

$(document).ready(function(){

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
