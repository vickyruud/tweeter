$(document).ready(function() {
  // --- our code goes here ---
  const textArea = document.querySelector('main textarea');
  const wordCount = document.getElementById('word-count')
  textArea.addEventListener("keyup", function(event)  {
    let characters = textArea.value.split('');
    wordCount.innerText = 140 - characters.length;
    console.log(characters);
    if (wordCount.innerText < 0) {
      wordCount.style.color = 'red';
    } else {
      wordCount.style.color = '';
    }
    
  })

});