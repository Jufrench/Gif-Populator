var topics = ["winner", "black panther", "chameleon", "red panda", "adventure time", "excited", "knockout"];
var gifArray = [];
var gifPopulate = "";
var gifUrl = "";
var userGifInput;
var randomNumber;
var $imageElement = $("<img>");



// ====== document ready ======
$(document).ready(function () {

  class AjaxHandler {

    static callAjax(input) {
      $.ajax('http://api.giphy.com/v1/gifs/search?q=' + input + '&api_key=c4474e5f5426451f818bdcfeeb43beb8&limit=10').done(function(results) {
        AjaxHandler.populateImages(results);
      })
    }

    static imageMaker(ajaxData) {
      var gifPathStill = ajaxData.images.original_still.url;
      var gifPathMoves = ajaxData.images.original.url;
      var $imageElement = $("<img>");
      $imageElement.attr("src", gifPathStill);
      $imageElement.attr("data-swap", gifPathMoves)
      $("#empty-gif").append($imageElement);
    }

    static populateImages(results) {
      for (var i in results.data) {
        AjaxHandler.imageMaker(results.data[i]);
      }
    }
  }

// ====== Swaps still gif for moving gif =======
  $(document).on('click', 'img', function() {
    var source = $(this).attr("src");
    var dataSwap = $(this).attr("data-swap");
    $(this).attr("src", dataSwap);
    $(this).attr("data-swap", source);
  })
// ====== Clears all Gifs from the page ========
  $('#clear-all').click(function (event) {
    event.preventDefault();
    $('img').removeAttr('src');
  })
// ====== Grabs data from input field &
// Populates Gifs from search query ==========
  $('#search-btn').click(function (event) {
    event.preventDefault();
    var userGifInput = $('#user-input').val();
    console.log(userGifInput);
    // == Logs input of search bar ==
    function showSearchedGifs(selection) {
      if (!topics.includes(selection)) {
        topics.push(selection);
        // == Adds a button for the user search ==
        var $tempBtnLocal = $('.buttons').append('<button>' + userGifInput + '</button>');
      //  $tempBtnLocal.attr('data-keyword', selection);
        $('#user-input').val('');
      }
      $(".buttons button").click(function (selection) {
        $(this).attr('data-keyword', userGifInput)
        AjaxHandler.callAjax(userGifInput);
      });
      console.log(topics);
    }
    showSearchedGifs(userGifInput);
  });
// =========================================================
// === Makes a button for each string in "topics" array ====
function buttonMaker() {
  for (var i = 0; i < topics.length; i++) {
    $(".buttons").append("<button data-keyword=\"" + topics[i] + "\">" + topics[i] + "</button>");
  }
}
buttonMaker();
// =========================================================
 function topicsArrayGifs() {
   for (var i = 0; i < topics.length; i++) {
     var $imageElement = $("<img>");
   }
 }
// =========================================================
// ===== Populates Gif from original array upon click ======
$(".buttons button").click(function () {
  AjaxHandler.callAjax($(this).attr('data-keyword'));
});
// =========================================================
// =========================================================
// TODO
// Takes user input & create button w/ user's text w/ jQuery, when user hits "Submit"
// Make sure to use .trim() to get rid of the spaces on the sides
// ========================================================

// ======== Call Giphy API =================================
// Api Key: c4474e5f5426451f818bdcfeeb43beb8

// function getResults(input) {
//   $.ajax('http://api.giphy.com/v1/gifs/search?q=' + input + '&api_key=c4474e5f5426451f818bdcfeeb43beb8&limit=10').done(function(response) {
//     for (var k in response.data) {
//       var gifPathStill = response.data[k].images.original_still.url;
//       var gifPathMoves = response.data[k].images.original.url;
//       var $imageElement = $("<img>");
//       $imageElement.attr("src", gifPathStill);
//       $imageElement.attr("data-swap", gifPathMoves)
//       // data-gif="gifPathMoves"
//       $("#empty-gif").append($imageElement);
//        }
  // });
  // }
// =========================================================
});
