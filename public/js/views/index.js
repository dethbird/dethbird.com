
/** autolink */
(function(){var h=[].slice;String.prototype.autoLink=function(){var b,f,d,a,e,g;a=1<=arguments.length?h.call(arguments,0):[];e=/(^|[\s\n]|<br\/?>)((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;if(!(0<a.length))return this.replace(e,"$1<a href='$2'>$2</a>");d=a[0];f=function(){var c;c=[];for(b in d)g=d[b],"callback"!==b&&c.push(" "+b+"='"+g+"'");return c}().join("");return this.replace(e,function(c,b,a){c=("function"===typeof d.callback?d.callback(a):void 0)||"<a href='"+
a+"'"+f+">"+a+"</a>";return""+b+c})}}).call(this);

var workMode = 0;

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
  },
  {
   "title": "Beepo Concept Art",
    "year": "2009",
    "medium": "Painter",
    "category": "Character Design",
    "content": "https://farm3.staticflickr.com/2533/3996839316_699ee275b7_b.jpg",
    "description": "Character designs for Beepo Beeparelli"
  },
  {
   "title": "Beepo Doesn't Get Turtles",
    "year": "2010",
    "medium": "pencil",
    "category": "Character Design",
    "content": "https://farm3.staticflickr.com/2786/4326820558_3db6e6beee_b.jpg",
    "description": "Character design for Beepo Beeparelli"
  },
  {
   "title": "Uranium 239 Pops",
    "year": "1997",
    "medium": "Painter",
    "category": "Illustration",
    "content": "https://farm1.staticflickr.com/175/461988892_d37e43bae6_o.jpg",
    "description": "Character design for Beepo Beeparelli"
  }


];

var instagramPostIds = [
  '29N7rtRZv1', //squiggles,
  'tcy7cYRZnx', // red robot
  '380qewxZge', //jeb leno
  '3uHYLuRZlb', //conan
  'yYZoXQRZkN', //smoking guy
  'vc7IPSRZsn', //more anchovies
  '5db319RZhm', //paul shaffer
  '5ABC-HRZqR', //road trip
  '4PCa-pRZmZ', //old pervert
  '3wvYyjRZpd', //weird sketchbook drawing
  'yQ1lEuxZpN', //some lady
  'yQTZCBRZrf', //faces
  'u5wbHzRZun', //wikked chef
  'uR78SDRZtK', //wikked tiger
  'sYSmxvxZrg', //birdsongs
  'sXDHZqxZvv', //explode head
  'rsRCrlRZgo', //tweetstream
  'rrz7KdRZpy', //mega old lady
  'rZ9Yb5RZrp', //twtstrm panel
  'pXWC2IRZj3', //batman
  'oUPK8VRZmh', //floop the dog
  'kGPqj1xZhs', //knobby knees
];
var twitterTweetIds = [
  "175800300060409856",
  "180488009832079361",
  "178887690022952960",
  "125270555170582529",
  "484708370805313536",
  "449610572758515712",
  "336235368468856832",
  "517053689144430593",
  "240906118694596608",
  "201170247078772737",
  "317507453195542528"
];
var wpPostIds = [
  47,
  116,
  1
];

/** Social media collections */
var Post = Backbone.Model.extend({
});

var PostCollection = Backbone.Collection.extend({
  model: Post,
  fetch: function() {
    var that = this;
    $.ajax('/posts/' + that.type, {
      data: {
        ids: that.postIds
      },
      success: function(data){
        that.parse(data);
      }
    });
  },
  parse: function(data) {
    that = this;
    _.each(data, function(d){
      var model = new Post({
        type: that.type,
        data: _.isObject(d) ? d : {id: d}
      });
      that.add(model);
    });
    this.trigger('parse');
  }
});


var PortfolioCollection = PostCollection.extend({
  posts: portfolioItemJson,
  type: 'portfolio',
  fetch: function() {
    this.parse(this.posts);
  }
});

var InstagramCollection = PostCollection.extend({
  postIds: instagramPostIds,
  type: 'instagram'
});

var TwitterCollection = PostCollection.extend({
  postIds: twitterTweetIds,
  type: 'twitter',
  fetch: function() {
    this.parse(this.postIds);
  }
});

var WordpressCollection = PostCollection.extend({
  postIds: wpPostIds,
  type: 'wordpress'
});


var portfolio = new PortfolioCollection();
// portfolio.add(portfolioItemJson);
var instagrams = new InstagramCollection();
var tweets = new TwitterCollection();
var wpposts = new WordpressCollection();

/** post viewer */
var PostView = Backbone.View.extend({
  events: {
    "click a#post-random-button": "randomPost"
  },
  postCollections: [
    wpposts, tweets
  ],
  initialize: function(){
    var that = this;
    var readyCount = 0;
    _.each(this.postCollections, function(c){
      c.on('parse', function(){
        readyCount++;
        if(readyCount == that.postCollections.length) {
          that.readyState();
        }
      });
      c.fetch();
    });
  },
  randomPost: function() {
    // random collection
    var c = this.postCollections[Math.floor(Math.random() * this.postCollections.length)];
    // random post
    this.model = c.models[Math.floor( Math.random() * c.models.length )];
    this.render();

  },
  readyState: function() {
    this.model = this.postCollections[0].first();
    this.render();
  },
  render: function() {

    var that = this;
    this.$('.random-post').fadeOut(0, function(){
      that.$('.random-post').fadeIn('3000');
    });
    var template = _.template($("#post-" + this.model.get('type')).html());
    this.$('.random-post').html( template(this.model.get('data'), {escape: false}) );
    var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|(www\\.)?){1}([0-9A-Za-z-\\.@:%_\‌​+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");

    if(this.model.get('type')=="instagram" || this.model.get('type')=="wordpress") {

      $('.random-post').each(function(){

        var that = $(this);

        var hashtag_regexp = /@([a-zA-Z0-9]+)/g;
          that.html(
            that.html().replace(
              hashtag_regexp,
              '<a target="_blank" href="https://instagram.com/$1">@$1</a>'
            )
          );

          var hashtag_regexp = /#([a-zA-Z0-9]+)/g;
          that.html(
            that.html().replace(
              hashtag_regexp,
              '<a>#$1</a>'
            )
          );

          that.html(that.html().autoLink());
      });
    }


    //if this is twitter, render the tweet
    if(this.model.get('type')=="twitter") {

      var tweetDiv = this.$('.random-post .post.twitter .tweet');

      twttr.widgets.createTweet(
        this.model.get('data').id,
        tweetDiv[0],
        {
          width: 400
        }
      ).then(function(){
        // console.log('done');
      });
    }
  }
});

/** Portfolio */
var piece = portfolio.first();

var PortfolioView = PostView.extend({
  events: {
    "click a#portfolio-random-button": "randomPost"
  },
  postCollections: [
    portfolio,
    instagrams
  ]
});

$(document).ready(function(){

    if(workMode==1){
      // work mode
      $('section').css('background','none');
      $('header').css('background','none');
      $('section').css('background-color','#CCC');
      $('header').css('background-color','#CCC');
    }

    $('#great_button').click(function(){
      alert('Fantastic!');
    });

    var portfolioGallery = new PortfolioView({
      el: $('section#portfolio')
    });

    var postviewer = new PostView({
      el: $('section#info')
    });

});