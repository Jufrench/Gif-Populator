var topics = ["winner", "black panther", "chameleon", "red panda", "adventure time", "excited", "knockout"];
var gifUrl = "";
var userGifInput;
//var $imageElement = $("<img>");
// ========================================
class AjaxHandler {

  static callAjax(input) {
    $.ajax('https://api.giphy.com/v1/gifs/search?q=' + input + '&api_key=c4474e5f5426451f818bdcfeeb43beb8&limit=10').done(function(results) {
      AjaxHandler.populateImages(results);
    })
  }

  static imageMaker(ajaxData) {
    var gifPathStill = ajaxData.images.original_still.url;
    var gifPathMoves = ajaxData.images.original.url;
    var $imageElement = $("<img><p>" + "Rating: " + ajaxData.rating + "</p>");
    $imageElement.attr("src", gifPathStill);
    $imageElement.attr("data-swap", gifPathMoves)
    $("#empty-gif").append($imageElement);
    console.log(ajaxData.rating);
  }

  static populateImages(results) {
    for (var i in results.data) {
      AjaxHandler.imageMaker(results.data[i]);
    }
  }
}
// ====== document ready ======
$(document).ready(function () {


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
    $('#empty-gif').empty();
  })
// ====== Grabs data from input field &
// Populates Gifs from search query ==========
  $('#search-btn').click(function (event) {
    event.preventDefault();
    var userGifInput = $('#user-input').val().trim();
    console.log(userGifInput);

    // == Logs input of search bar ========
    function showSearchedGifs(selection) {
      if (!topics.includes(selection)) {
        topics.push(selection);
        // == Adds a button for the user search ==
        $('.buttons').append('<button data-keyword="' + userGifInput + '">' + userGifInput + '</button>' + '&nbsp;')
        $('button').addClass('btn btn-primary');
       $('#user-input').val('');
      }
      console.log(topics);
    }
    showSearchedGifs(userGifInput);
  });
// =========================================================
// === Makes a button for each string in original "topics" array ====
function buttonMaker() {
  for (var i = 0; i < topics.length; i++) {
    $(".buttons").append("<button data-keyword=\"" + topics[i] + "\">" + topics[i] + "</button>" + "&nbsp;");
  }
  for (var i = 0; i < topics.length; i++) {
    $('button').addClass('btn btn-primary');
  }
}
buttonMaker();
// =========================================================
 // function topicsArrayGifs() {
 //   for (var i = 0; i < topics.length; i++) {
 //     var $imageElement = $("<img>");
 //   }
 // }
// =========================================================
// ===== Populates Gif from original array upon click ======
$(document).on("click", ".buttons button", function() {
  AjaxHandler.callAjax($(this).attr('data-keyword'));
});
// =========================================================
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
