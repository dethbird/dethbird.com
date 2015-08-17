var portfolioItemJson = [
  {
    "title": "Sauced Octopus",
    "year": "2008",
    "medium": "pencil, Painter, Photoshop",
    "category": "Illustration",
    "content": "https://farm3.staticflickr.com/2473/3692721420_0cee6cd9d2_b.jpg",
    "description": "Just an illustration I used to sell prints of."
  },
  {
    "title": "Beepo Takes A Pipe To Nowhere",
    "year": "2010",
    "medium": "pencil, Painter, Photoshop",
    "category": "Illustration",
    "content": "https://farm3.staticflickr.com/2439/3663515635_1c89de110c_b.jpg",
    "description": "Beepo is a robot built by Japanese robotics engineers with whatever information they had about Italian stereotypes. Upon his activation they uploaded the occupation \"plumber\" into his main fucking memory.\nIn this world there are no humans around but somehow he always has a pipe to clean out or something to unclog. It's a very septic life. He tends to drink and do a lot of drugs, even on the job.\nBut he also has a stereotypically Italian lust for life, and he sings Opera to all the beautiful women ... robots. Women robots.\nThis piece is concept art for a mini film starring the one and only Beepo Beeparelli"
  },
  {
   "title": "Burger Pope Ad",
    "year": "2007",
    "medium": "pencil, Painter, Photoshop",
    "category": "Illustration",
    "content": "https://farm2.staticflickr.com/1156/1467947071_28963a1d91_o.jpg",
    "description": "Burger Pope!"
  }
];

 var Piece = Backbone.Model.extend({});
  var PortfolioCollection = Backbone.Collection.extend({
    model: Piece
  });
  var portfolio = new PortfolioCollection();
  portfolio.add(portfolioItemJson);

  var piece = portfolio.first();

  var PortfolioView = Backbone.View.extend({
      initialize: function() {
        this.render();
      },
      model: piece,
      events: {
        "click a#portfolio-random-button": "randomPiece"
      },
      randomPiece: function() {
        this.model = portfolio.models[Math.floor( Math.random() * portfolio.length )];
        this.render();
      },
      render: function() {
        var that = this;
        that.$('.portfolio-piece').hide();
        var image = new Image();
        image.src = this.model.get('content');
        this.$('.title').html(this.model.get('title'));
        this.$('.category-year-medium').html(this.model.get('category') + ' (' + this.model.get('year') + ') ' + this.model.get('medium'));
        this.$('.description').html(this.model.get('description'));
        this.$('.content').html(image);
        $(image).load(function() {
          that.$('.portfolio-piece').fadeIn(1200);
        });

      }
  });

$(window).load(function(){
    // turn spans with tweet ids into embedded tweets
    $('span.tweet').each(function(i,e){
        var e = $(e);
        twttr.widgets.createTweet(
          e.data('id'),
          $('span.tweet[data-id="' + e.data('id') + '"]')[0],
          {
            width: 320
          }
        );
    });

    $('#great_button').click(function(){
      alert('Fantastic!');
    });

    var portfolioGallery = new PortfolioView({
      el: $('section#portfolio')
    });
    console.log(portfolioGallery);

});