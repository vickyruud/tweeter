$(document).ready(function() {
  // --- our code goes here ---
  const textArea = document.querySelector('main textarea');
  const charCount = document.getElementById('word-count')
  const maxCharacters = 140;
  textArea.addEventListener("keyup", function(event)  {
    let characters = textArea.value.split('');
    charCount.innerText = maxCharacters - characters.length;
    console.log(characters);
    if (charCount.innerText < 0) {
      charCount.style.color = 'red';
    } else {
      charCount.style.color = '';
    }
    
  })

});