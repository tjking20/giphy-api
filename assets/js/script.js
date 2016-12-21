$(document).ready(function(){

	//array that will store the movie topics
	var topics = ["sushi", "pizza", "tacos", "fried chicken", "pad thai"];



	function makeButtons(){
		$("#gifButtons").empty();
		for (i = 0; i<topics.length; i++){
			var buttons = $("<button>")
			buttons.text(topics[i]);
			buttons.addClass("giphy");
			buttons.attr("data-value", topics[i]);
			$("#gifButtons").append(buttons);
		}
		$(document).on("click",".giphy", function(){
			var userVal = $(this).attr("data-value");//targets the button that the client is clicking
			//uses the data-value of the button to complete the api request
			
			var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +userVal + "&api_key=dc6zaTOxFJmzC";
	

			// Perfoming an AJAX GET request to our queryURL
			$.ajax({
			url: queryURL,
			method: "GET"
			}).done(function(response) {
				console.log(response);
				$("#gifArea").empty();//empties the gifArea of all previous contents

				for(i=0;i<10;i++){
					//creates a new image tag and attaches attributes and source
					var gifDiv= $("<div>");
					var imageUrl = response.data[i].images.fixed_height_still.url;
					var gif = $("<img>");
					gif.attr("src", imageUrl)
					.attr("alt", "food image")//adds an alt tag
					.attr("class", "gifImage")//adds a class of gifImage
					.attr("data-still", response.data[i].images.fixed_height_still.url)// adds a source for the still image
					.attr("data-animate",response.data[i].images.fixed_height.url)// ass a source for the animated image
					.attr("data-state", "still");//shows that the current state == still

					//captures the gif rating and places it into a new p tag
					var ratingUrl = response.data[i].rating;
					var rating =  $("<p>").text("Rating: " + ratingUrl);

					//appends image and rating to a new div
					gifDiv.append(rating);
					gifDiv.append(gif);
					gifDiv.attr("class", "gifDiv")

					//appends gifDivs to the gifArea
					$("#gifArea").append(gifDiv);

					//animates and pauses gifs once loaded on the page.
					$(".gifImage").on("click", function(){
						var state = $(this).attr("data-state")
						if(state == "still"){
							$(this).attr("src", $(this).data("animate"));
							$(this).attr("data-state", "animate");
						} else if(state == "animate"){
							$(this).attr("src", $(this).data("still"));
							$(this).attr("data-state", "still");
						}

					});
				}



			});

		});

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




});