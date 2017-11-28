//client.js
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
			//Add posts to index.html as #grid-items
			for (j=0;j<data.length;j++){
				if(data[j].content_type == undefined){
					data[j].content_type = "none";
				}
				
			console.log("content_type: "+data[j].content_type);
				if(!data[j].content_type.includes('html')){
					if (data[j].network_name=="Facebook"){
						$('<div id="grid-item" data-i="'+j+'">')		
							.append('<img src="./images/'+data[j].image+'" width="'+imageWidth+'" alt="'+data[j].image+'"></>')
							.append("<p>"+iconImageArray[0].title+" : "+data[j].name+" : "+data[j].date+"</p>")
							.appendTo('#thegrid');
					} else if (data[j].network_name=="Instagram") {
						$('<div id="grid-item" data-i="'+j+'">')
							.append('<img src="./images/'+data[j].image+'" width="'+imageWidth+'" alt="'+data[j].image+'"></>')
							.append("<p>"+iconImageArray[1].title+" : "+data[j].name+" : "+data[j].date+"</p>")
							.appendTo('#thegrid');
					} else if (data[j].network_name=="Twitter") {
						$('<div id="grid-item" data-i="'+j+'">')
							.append('<img src="./images/'+data[j].image+'" width="'+imageWidth+'" alt="'+data[j].image+'"></>')
							.append("<p>"+iconImageArray[2].title+" : "+data[j].name+" : "+data[j].date+"</p>")
							.appendTo('#thegrid');
					}
				}
				
			}
			console.log("2nd j: "+j);
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
						queue: true
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
