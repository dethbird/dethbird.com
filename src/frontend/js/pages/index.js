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