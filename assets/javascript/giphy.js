var topics = ["winner", "black panther", "chameleon", "red panda", "adventure time", "excited", "knockout"];
var gifArray = [];
var gifPopulate = "";
var gifUrl = "";
var userGifInput;
var randomNumber;
var imageElement = $("<img>");

// ====== document ready ======
$(document).ready(function () {
  $(document).on('click', 'img', function() {
    var source = $(this).attr("src");
    var dataSwap = $(this).attr("data-swap");
    $(this).attr("src", dataSwap);
    $(this).attr("data-swap", source);
  })

  $('#clear-all').click(function () {
    $('img').removeAttr('src');
  })


$('#search-btn').click(function () {
  var userGifInput = $('#user-input').val();
    if (userGifInput !== "") {
      console.log('hello!');
    }
});
  userGifInput = $('#user-input').val();
  console.log(userGifInput);
// =========================================================

// === Makes a button for each string in "topics" array ====
function buttonMaker() {
  for (var i = 0; i < topics.length; i++) {
    $(".buttons").append("<button data-keyword=\"" + topics[i] + "\">" + topics[i] + "</button>");
  }
}
buttonMaker();
// =========================================================
// TODO
// When button created is clicked, populate(append) 10 static gifs in html

 function topicsArrayGifs() {
   for (var i = 0; i < topics.length; i++) {
     var imageElement = $("<img>");
   }
 }
// =========================================================

// ===== Populates Gif from original array upon click ======
$(".buttons button").click(function () {
  getResults($(this).attr('data-keyword'));
});
// =========================================================

// =========================================================
// TODO
// Takes user input & create button w/ user's text w/ jQuery, when user hits "Submit"
// Make sure to use .trim() to get rid of the spaces on the sides
// ========================================================

// ======== Call Giphy API =================================
// Api Key: c4474e5f5426451f818bdcfeeb43beb8

function getResults(input) {
  $.ajax('http://api.giphy.com/v1/gifs/search?q=' + input + '&api_key=c4474e5f5426451f818bdcfeeb43beb8&limit=10').done(function(response) {
    for (var k in response.data) {
      var gifPathStill = response.data[k].images.original_still.url;
      var gifPathMoves = response.data[k].images.original.url;
      var imageElement = $("<img>");
      imageElement.attr("src", gifPathStill);
      imageElement.attr("data-swap", gifPathMoves)
      // data-gif="gifPathMoves"
      $("#empty-gif").append(imageElement);

    }
  });
  }
// =========================================================
});
