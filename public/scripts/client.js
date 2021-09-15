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
      $('#tweets-container').prepend($tweet);
      
    };

  }
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweetObject){ 

    let safeText = escape(tweetObject["content"]["text"]);
    let $tweet = `<article class="tweets">
    <header>
    <h5><img class="profile-photo" src="${tweetObject["user"]["avatars"]}">${tweetObject["user"]["name"]}</h5>
    <h6>${tweetObject["user"]["handle"]}</h6></header>
    <p class="tweet-container">${safeText}</p>
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
  
  
  const form = $('#submit-tweet');
  
  
  form.on("submit", function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const serializedData = decodeURI(data);
    console.log(serializedData);
    console.log(serializedData.length);
    if (serializedData.length < 6) {
      alert('Tweet should not be empty!')
    } else if (serializedData.length > 145) {
      alert('Tweet should be less than 140 characters!')
    } else {
      $.post('/tweets', serializedData)
      .then(() => {
        loadTweets();
      });
         
    }
  });

  const loadTweets = function() {$.ajax({
    url: '/tweets',
    method: "GET",
    dataType: "json",
    success: (tweets) => {
      console.log(tweets);
      renderTweets(tweets);
    },
    error: (error) => {
      console.log(error);
    }

  })}
  loadTweets();


 

 

});


