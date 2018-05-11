//client.js
var maxImageWidth = $(window).width()-200;
var maxImageHeight = $(window).height()-200;
console.log("maxImageheight"+maxImageHeight);
var j = 0;

var iconImageArray = new Array();
iconImageArray[0]=new Image();
iconImageArray[0].width=48;
iconImageArray[0].alt="Facebook Icon";
iconImageArray[0].src = "facebook.png";
iconImageArray[0].title = "FB";
iconImageArray[1]=new Image();
iconImageArray[1].width=48;
iconImageArray[1].alt="Instagram Icon";
iconImageArray[1].src = "./instagram.png";
iconImageArray[1].title = "IG";
iconImageArray[2]=new Image();
iconImageArray[2].width=48;
iconImageArray[2].alt="Twitter Icon";
iconImageArray[2].src = "./twitter.png";
iconImageArray[2].title = "TW";

$(function () {//Runs immediately
	$.ajax({
		type: 'POST',
		url: 'http://localhost:3000/feed',//For production use 'http://systemsengineering.co.uk/feed',
		success: function (data){
			//Add posts to index.html as #grid-items
			for (j=0;j<data.length;j++){

				if(data[j].content_type == undefined){
					data[j].content_type = "none";
				}

				var imageSizer;
				var imageAspectRatio;
				imageAspectRatio = data[j].image_width/data[j].image_height;

				//Height is fixed at 800px. Width variable with max 1500px
				imageSizer = '" height="'+maxImageHeight;

				if(maxImageHeight*imageAspectRatio > maxImageWidth){
					imageSizer = '" width="'+maxImageWidth
				}

				if(!data[j].content_type.includes('html')){ //If post does not contain html add post as a #thegrid child <div>
					if (data[j].network_name=="Facebook"){
						$('<div class="slide-item" data-i="'+j+'">')		
							.append('<img src="./images/'+data[j].image+imageSizer+'" alt="'+data[j].image+'"></>')
							.append('<p><img src="'+iconImageArray[0].src+'" alt="FB" width="'+iconImageArray[0].width+'">&nbsp&nbsp'+data[j].name+' : '+data[j].date+'</p>')
							.appendTo('.slide-item-wrapper');
					} else if (data[j].network_name=="Instagram") {
						$('<div class="slide-item" data-i="'+j+'"">')
							.append('<img src="./images/'+data[j].image+imageSizer+'" alt="'+data[j].image+'"></>')
							.append('<p><img src="'+iconImageArray[1].src+'" alt="IG" width="'+iconImageArray[1].width+'">&nbsp&nbsp'+data[j].name+" : "+data[j].date+"</p>")
							.appendTo('.slide-item-wrapper');
					} else if (data[j].network_name=="Twitter") {
						$('<div class="slide-item" data-i="'+j+'"">')
							.append('<img src="./images/'+data[j].image+imageSizer+'" alt="'+data[j].image+'"></>')
							.append('<p><img src="'+iconImageArray[2].src+'" alt="TW" width="'+iconImageArray[2].width+'">&nbsp&nbsp'+data[j].name+" : "+data[j].date+"</p>")
							.appendTo('.slide-item-wrapper');
					}
				}
				
			}
			//Configure and layout the grid
			$('.slide-item-wrapper').imagesLoaded(function() {
				console.log("Loaded "+j+" images. Beginning animation.");
				var index = 0;
				var maxIndex = j-1;

				$(".slide-item-wrapper").children().each(function(){

					if ($(this).attr('data-i')==index-1){
						$(this).toggleClass("show");
					}
					if ($(this).attr('data-i')==index){
						$(this).toggleClass("show");
					}
				});
				index++;

				//Interval between animations of images
				//hide and show transitions
				setInterval(function(){
					$(".slide-item-wrapper").children().each(function(){
						if ($(this).attr('data-i')==index-1){
							$(this).toggleClass("show");	
						}
						if ($(this).attr('data-i')==index){
							$(this).toggleClass("show");
						}
					});
					if (index>maxIndex){
						index = 0;
					} else {
						index++;	
					}
				},10000);
			});
			
		},
		stop: function() {
			console.log("Ajax Stop");
		}
	});
})
