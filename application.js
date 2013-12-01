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
	
		//get the json object from imdb
		
		$.getJSON("http://mymovieapi.com/?title=" + searchT + "&type=json&plot=full&episode=0&limit=1" + 
		"&yg=0&mt=none&lang=en-US&offset=&aka=simple&release=simple&business=0&tech=0", function(json) {
		console.dir(json);
		
		if (json[0]) {								//if the json object exists...
			console.log("json[0] is true");
			var year = json[0].year;				//get variables from json
			var imdbURL = json[0].imdb_url;
			var title = json[0].title;
			
			if (json[0].poster) {							//check if poster exists, if it does set as background
			var poster = json[0].poster.imdb;
			$("body").css("background-image", "url(" + poster + ")");
			}
			
			if (json[0].plot) {								//if the plot isn't in imdb's database, display error
			var plot = json[0].plot;						//otherwise set plot as variable
			}
			else {
			plot = "Plot Unavailable"; 
			}
		
			$("#info").empty();									//clear the info div and add new info
			$("#info").append(title + "<br/>" + year + "<br/>");
		
			var genres = new Array();							//loop through genre array and append to info div
				for (x=0; x < json[0].genres.length; x++) {
				genres[x] = json[0].genres[x];
				$("#info").append("<div class='genre'>" + genres[x] + "</div>");
				}
			
			$("#info").append("<br/><br/>" + plot);				//add plot to info div
		
			$("#info").fadeIn(4000);							//fade in the info and amazon divs
			$("#amazon").fadeIn(4000);
			$("#amazon_widget_US_8002_0").css("width", "800px");	//set width of amazon widget to 800px so it centers
			
			}
			
			else {										//if the title isn't in imdb's database, display error
			console.log("json[0] isn't true");
			$("#info").empty();
			$("#info").append("Title not found");
			$("#info").fadeIn(4000);
			}
		});
		
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
//C90626 red color