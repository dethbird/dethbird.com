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




});