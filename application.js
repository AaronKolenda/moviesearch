$(document).ready(function() {

	$("#amazon").hide();		//these divs will fade in later after the info is added to them
	$("#info").hide();
	
	//this makes the user input appear in amazon widget text input, so they are typing in both simultaneously 
	//whether or not the widget is currently shown on page
	
	$("#search").keyup(function(event){	
	var searchT = document.getElementById("search").value;
	document.getElementById("amzn_search_textfield").value = searchT;
	});


	$("#myGo").click(function(){										//when go button is clicked, the go button on
	javascript:window.nextCallBack["US"][8002][0].goOnClick("US",0);	//amazon's widget is 'clicked'
																		
		var searchT = document.getElementById("search").value;	//get user input
		
		if (searchT == '') {							//make sure the user entered something
		$("#info").empty();
		$("#info").append("You did not enter anything");
		$("#info").fadeIn(4000);
		}
	
		
		// Send Request
		var http = new XMLHttpRequest;
		http.open("GET", "http://www.omdbapi.com/?t=" + searchT, false);
		http.send(null);

		// Response to JSON
		var omdbData = http.responseText;
		var omdbJSON = eval("(" + omdbData + ")");
		console.dir(omdbData);   //look at the returned data in the console
		
		
		if (omdbJSON.Response === "True") {				//if the api call worked...
			console.log("inside if statement and omdbJSON.Response is " + omdbJSON.Response);
			var year = omdbJSON.Year;					//get variables from json
			var title = omdbJSON.Title;
			
			if (omdbJSON.Poster) {						//check if poster exists, if it does set as background
			var poster = omdbJSON.Poster;
			$("body").css("background-image", "url(" + poster + ")");
			}
			
			if (omdbJSON.Plot) {							//if the plot isn't in imdb's database, display error
			var plot = omdbJSON.Plot;						//otherwise set plot as variable
			}
			else {
			plot = "Plot Unavailable"; 
			}
		
			$("#info").empty();									//clear the info div and add new info
			$("#info").append(title + "<br/>" + year + "<br/>");
			
			var genreString = omdbJSON.Genre;
			var genreArray = genreString.split(" ");
			
				//loop through genre array and append to info div
				//and get rid of commas at the end of genre strings
				for (x=0; x < genreArray.length; x++) {
					if (genreArray[x].charAt(genreArray[x].length-1) == ",") { 
						var genreTempString = genreArray[x].substring(0, genreArray[x].length - 1);
						genreArray[x] = genreTempString;
					}
				$("#info").append("<div class='genre'>" + genreArray[x] + "</div>");
				}
			
			$("#info").append("<br/><br/>" + plot);				//add plot to info div
		
			$("#info").fadeIn(4000);							//fade in the info and amazon divs
			$("#amazon").fadeIn(4000);
			$("#amazon_widget_US_8002_0").css("width", "800px");	//set width of amazon widget to 800px so it centers
			
			}
			
			else {										//if the title isn't in imdb's database, display error
			$("#info").empty();
			$("#info").append("Title not found");
			$("#info").fadeIn(4000);
			}
		
		
		$('#search').val(""); 	//empty the input field
		$('#search').focus();   //puts focus back on input field
	});
	
	$(document).keypress(function(event){		//handles pressing of enter as continue being clicked
    var keycode = (event.which);				//when key is pressed
		if(keycode == '13'){					//if that key was 13 (enter)
			$("#myGo").click();   				//then button is "clicked"
		}
	});
	
});