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

$(function () {
	console.log("Running initial function");
	$.ajax({
		type: 'POST',
		url: 'http://localhost:3000/feed',
		success: function (data){
			for (var i=0;i<data.postCount;i++){
				if (data.posts[i].has_image==1){
					imageArray[j]=new Image();
					imageArray[j].width = imageWidth;
					imageArray[j].alt = data.posts[i].text;
					imageArray[j].name = data.posts[i].user_screen_name;
					var date = new Date(data.posts[i].source_created_at);
					imageArray[j].date = date.toLocaleDateString("en-GB");
					imageArray[j].network_name = data.posts[i].network_name;
					imageArray[j].src = data.posts[i].image;
					j++;
				}
			}

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

			$('#thegrid').imagesLoaded(function() {
				$('#thegrid').masonry({
					columnWidth: (imageWidth+20),
					gutterWidth: 0.5,
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

