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
