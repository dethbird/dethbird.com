var PortfolioGalleryView = require('../library/views/PortfolioGalleryView');
var PortfolioGalleryCollection = require('../library/collections/PortfolioGalleryCollection');
var PortfolioInstagramCollection = require('../library/collections/PortfolioInstagramCollection');
var LoaderView = require('../library/views/LoaderView');

var loaderView = new LoaderView({
    el: '#loader',
    loadingEl: '#loader_logo'
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
    // click the first portfolio section
    $($('#portfolio-gallery .section-selector')[0]).trigger('click');
});


// var imgCount = $('img').length;
// var loaded = 0;
// $.each($('img'), function(i,e){
//     $(e).on('load', function(){
//         loaded++;
//     });
// });
// console.log(imgCount);
// $(window).ready(function(){
//     console.log('ready');
// });