//client.js
var imageArray = new Array();
var imageWidth = 150;
var j = 0;

var iconImageArray = new Array();
iconImageArray[0]=new Image();
iconImageArray[0].width=128;
iconImageArray[0].alt="Facebook Icon";
iconImageArray[0].src = "facebook.png";
iconImageArray[0].title = "FB";
iconImageArray[1]=new Image();
iconImageArray[1].width=128;
iconImageArray[1].alt="Instagram Icon";
iconImageArray[1].src = "./instagram.png";
iconImageArray[1].title = "IG";
iconImageArray[2]=new Image();
iconImageArray[2].width=128;
iconImageArray[2].alt="Twitter Icon";
iconImageArray[2].src = "./twitter.png";
iconImageArray[2].title = "TW";

$(function () {//Runs immediately
	$.ajax({
		type: 'POST', //Production - Change this to GET
		url: 'http://localhost:3000/feed', //Production - change this to https://api.curator.io/v1/feeds/FEED-ID/posts/?api_key=API_KEY
		success: function (data){
			j=0;
			for (var i=0;i<data.postCount;i++){
				if (data.posts[i].has_image==1){
					imageArray[j]=new Image();
					imageArray[j].src = data.posts[i].image;
					imageArray[j].width = imageWidth;
					imageArray[j].alt = data.posts[i].text;
					imageArray[j].name = data.posts[i].user_screen_name;
					imageArray[j].network_name = data.posts[i].network_name;
					var date = new Date(data.posts[i].source_created_at);
					imageArray[j].date = date.toLocaleDateString("en-GB");
					j++;
				}
			}

			//Add posts to index.html as #grid-items
			for (j=0;j<imageArray.length;j++){
				if (imageArray[j].network_name=="Facebook"){
					$('<div id="grid-item" data-i="'+j+'">')		
						.append(imageArray[j])
						.append("<p>"+iconImageArray[0].title+" : "+imageArray[j].name+" : "+imageArray[j].date+"</p>")
						.appendTo('#thegrid');
				} else if (imageArray[j].network_name=="Instagram") {
					$('<div id="grid-item" data-i="'+j+'">')
						.append(imageArray[j])
						.append("<p>"+iconImageArray[1].title+" : "+imageArray[j].name+" : "+imageArray[j].date+"</p>")
						.appendTo('#thegrid');
				} else if (imageArray[j].network_name=="Twitter") {
					$('<div id="grid-item" data-i="'+j+'">')
						.append(imageArray[j])
						.append("<p>"+iconImageArray[2].title+" : "+imageArray[j].name+" : "+imageArray[j].date+"</p>")
						.appendTo('#thegrid');
				}
			}

			//Configure and layout Masonry grid
			$('#thegrid').imagesLoaded(function() {
				$('#thegrid').masonry({
					columnWidth: (imageWidth+20), //Separation between columns, see css in index.html for image format
					gutterWidth: 0,
					itemSelector: '#grid-item',
					isAnimated: true,
					animationOptions: {
						duration: 500,
						easing: 'linear',
						queue: false
					}
				});

				$('#thegrid').masonry('layout');
			});
		},
		stop: function() {
			console.log("Ajax Stop");
		}
	});
})
