/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function (){

  const composeFamily = $(".compose-family");
  composeFamily.on("click", function() {
    $(".new-tweet").slideToggle(500);
    $("#compose-button").slideToggle(1000);
    $("#compose-button").slideToggle(1000);
    $("#tweet-text").focus();
  })

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
  
  const resetForm = function () {
    const field = document.getElementById("tweet-text");
    const wordCount = document.getElementById("word-count");
    field.value = '';
    wordCount.value = 140;


  }


  const createTweetElement = function(tweetObject){ 

    
    let sinceTweet = timeago.format(tweetObject["created_at"]);

    let safeText = escape(tweetObject["content"]["text"]);
    let $tweet = `<article class="tweets">
    <header>
    <h5><img class="profile-photo" src="${tweetObject["user"]["avatars"]}">${tweetObject["user"]["name"]}</h5>
    <h6>${tweetObject["user"]["handle"]}</h6></header>
    <p class="tweet-container">${safeText}</p>
    <footer class="tweet-footer">
          <div>${sinceTweet}</div>
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
    
    const serializedData = $(this).serialize();
    const decodedData = decodeURIComponent(serializedData);
    if (decodedData.length < 6) {
      $("#empty").slideDown(1000);
      $("#over140").slideUp(1000); 
    } else if (decodedData.length > 145) {
      $("#over140").slideDown(1000);
      $("#empty").slideUp(1000);
    } else {
      $.post('/tweets', decodedData)
      .then(() => {
        loadTweets();
        resetForm();
      })
      .catch((error => {
        console.log(error);
      }))
      $("#empty").slideUp(1000);
      $("#over140").slideUp(1000);   
    }
  });

  const loadTweets = function() {$.ajax({
    url: '/tweets',
    method: "GET",
    dataType: "json",
    success: (tweets) => {
      renderTweets(tweets);
    },
    error: (error) => {
      console.log(error);
    }

  })}
  loadTweets();

  
 

 

});


