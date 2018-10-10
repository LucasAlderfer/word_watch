import $ from 'jquery'

$(document).ready(() => {
  $('#word-submission').click(function() {
    event.preventDefault();
    var textSubmission = $(this.parentNode)
    var textArea = $(textSubmission).find('textarea')
    var text = textArea[0].value
    var words = text.split(' ')
    var i
    for(i = 0; i < words.length; i++) {
      submitWord(words[i]);
    }
  });
  getTopWord();
});

const getTopWord = () => {
  fetch("https://wordwatch-api.herokuapp.com/api/v1/top_word")
  .then(response => response.json())
  .then(word => renderWord(word))
}

const renderWord = (word) => {
  var hash = word
  var topWord = hash.word
  $('#top-word').html(`${Object.keys(topWord)[0]}, ${Object.values(topWord)[0]}`)
}

const submitWord = (word) => {
  fetch("https://wordwatch-api.herokuapp.com/api/v1/words", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ word: { value: `${word}`}})
  })
  .then(function(response) {
    if(response.ok) {
      $('#textField').val('')
      getTopWord()
  } else {
      $('#textField').val(`${word}`)
  }}
  )
}
