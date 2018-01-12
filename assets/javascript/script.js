// Initial array of images
var images = ["hamburger", "hot dog", "pizza", "pasta", "ice cream", "ramen", "fried chicken", "salad", "steak", "bbq", "lasagna"];
var receivedContent = {};
// displayImg function re-renders the HTML to display the appropriate content
function displayImg() {
  $('#images-view').empty();
  
  var term = $(this).attr("data-name");
  var key = '&api_key=JYNNBPDZxA0OkIfl7KZku1QomEEHMjue';
  var limit = 10;
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + term + key + '&limit=' + limit;

  // Creates AJAX call for the specific image button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

  var results = response.data;
  console.log(results);

    for (var x = 0; x < limit; x++){
      //Note to self - add an alt text as an attr of the image
      var newDiv = $('<div>').addClass('float-left')
      var imgSrc = results[x].images['fixed_height_still'].url;
      var animatedSrc = results[x].images['fixed_height'].url
      var imgRating = $('<div>').text('Rating: ' + results[x].rating);
      var newImg = $('<img>');

      newImg.addClass('gif');
      newImg.attr('data-state', 'still');
      newImg.attr('data-still', imgSrc);
      newImg.attr('data-animate', animatedSrc);
      newImg.attr('src', imgSrc);
      console.log(imgSrc);
      newDiv.append(newImg);
      newDiv.append(imgRating);
      $('#images-view').append(newDiv);
    }
  })
};

// Function for displaying image data
function renderButtons() {

  //clearing button area
  $("#buttons-view").empty();

  // populates button
  $.each(images, function(index, value){
    var newButton = $('<button>');
    newButton.addClass("image");
    newButton.text(value).attr("data-name", value);
    $('#buttons-view').append(newButton);
  })
};

// grabs text input from user
$("#add-image").on("click", function(event) {
  event.preventDefault();

  var image = $("#image-input").val().trim();
  images.push(image);
  renderButtons();
});

// event listeners to all elements with a class of "image"
$(document).on("click", ".image", displayImg);

//animates GIFs -- I'll need to update this; currently doesn't work
$(document).on("click", ".gif", function() {

    var thisImg = $(this);
    var state = thisImg.attr('data-state');
    var animateThis = thisImg.attr('data-animate');
    var stillThis = thisImg.attr('data-still');

    if(state === 'still'){
        thisImg.attr('src', animateThis);
        thisImg.attr('data-state', 'animate');
    }
    else{
        thisImg.attr('src', stillThis);
        thisImg.attr('data-state', 'still');
    };

});



// Initial call to display button
renderButtons();