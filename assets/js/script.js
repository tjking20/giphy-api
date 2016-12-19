$("document").ready(function(){
	console.log("ready");

//array that will store the movie topics
var topics = ["sushi", "pizza", "tacos"];

//1. on page load three buttons will appear, as they are hard coded in
	//- create a function that takes in the topics array and makes buttons
	//-the function should empty the html gifButtons
	//-take in the array using a for loop, create buttons 
	//appending the array value and appending buttons back to the page

//2. create an on click function that captures the value of #userInput and pushes
// it into the array. then run makeButtons


function makeButtons(){
	$("#gifButtons").empty();
	for (i = 0; i<topics.length; i++){
		var buttons = $("<button>")
		buttons.text(topics[i]);
		buttons.addClass("giphy");
		buttons.attr("data-value", topics[i]);
		$("#gifButtons").append(buttons);
	}
	abraKaGif();
}

makeButtons();





//submitButton pushes the client's value into the topics array, and 
//runs the makeButtons function to add it to the searchable buttons area.
$("#submitButton").on("click", function(){
	var userInput = $("#userInput").val();
	console.log(userInput);
	topics.push(userInput);
	makeButtons();


	return false;

});


//function allows elements with giphy class to pull info from giphy api using ajax
function abraKaGif(){
	$(".giphy").on("click", function(){
		var userVal = $(this).attr("data-value");//targets the button that the client is clicking
		//uses the data-value of the button to complete the api request
		var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + userVal;
		

		// Perfoming an AJAX GET request to our queryURL
		$.ajax({
		url: queryURL,
		method: "GET"
		}).done(function(response) {
			console.log(response);
			var imageUrl = response.data.image_original_url;//provides an image url to the random gif selected
			//following lines creat an image attach the source of the random url and append it to the gif area.
			var gif = $("<img>");
			gif.attr("src", imageUrl);
			gif.attr("alt", "food image");
			$('#gifArea').append(gif);

		});

	});

}















});