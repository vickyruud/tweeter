/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function (){

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (let item of tweets) {
      let $tweet = createTweetElement(item);
      $('#tweets-container').append($tweet);
      
    };

  }

  const createTweetElement = function(tweetObject){ 
    
    let $tweet = `<article class="tweets">
    <header>
    <h5><img class="profile-photo" src="${tweetObject["user"]["avatars"]}">${tweetObject["user"]["name"]}</h5>
    <h6>${tweetObject["user"]["handle"]}</h6></header>
    <p class="tweet-container">${tweetObject["content"]["text"]}</p>
    <footer class="tweet-footer">
          <div>${tweetObject["created_at"]}</div>
          <div class="icons">
            <i id="flag" class="fas fa-flag"></i>
            <i id="retweet" class="fas fa-retweet"></i>
            <i id="heart" class="fas fa-heart"></i>
          </div>
        </footer>
    
    
    </article>`
    

    return $tweet;
  }
  // Test / driver code (temporary). Eventually will get this from the server.
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
 
  renderTweets(data);
});


