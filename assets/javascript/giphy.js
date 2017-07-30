var topics = ["black panther", "chameleon", "adventure time", "ramen", "excited"];

// ========================================= ||
// ========================================= ||

$(document).ready(function () {

// Makes a button for each string in "topics" array
function buttonMaker() {
  for (var i = 0; i < topics.length; i++) {
    $(".buttons").append("<button>" + topics[i] + "</button>");
  }
}
buttonMaker();

// Take user input & create button w/ user's text w/ jQuery, when user hits "Submit"
// Make sure to use .trim() to get rid of the spaces on the sides

// Call Giphy API
// Api Key: c4474e5f5426451f818bdcfeeb43beb8
$.ajax("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=c4474e5f5426451f818bdcfeeb43beb8&limit=5").done(function(data) {

})

// When button created is clicked, populate(append) 10 static gifs in html
// Each time a button is clicked, a gif for that theme should be appended onto the DOM



});
