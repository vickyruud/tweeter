$(document).ready(function() {
  // --- our code goes here ---
  const textArea = document.querySelector('main textarea');
  const charCount = document.getElementById('word-count')
  const maxCharacters = 140;
  textArea.addEventListener("keydown", function(event)  {
    let characters = textArea.value.split('');
    charCount.innerText = maxCharacters - characters.length;
    if (charCount.innerText < 0) {
      charCount.style.color = 'red';
    } else {
      charCount.style.color = '';
    }
    
  })

});