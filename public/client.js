//client.js
var maxImageWidth = 420;
var maxImageHeight = 450;
var j = 0;

var iconImageArray = new Array();
iconImageArray[0]=new Image();
iconImageArray[0].width=24;
iconImageArray[0].alt="Facebook Icon";
iconImageArray[0].src = "facebook.png";
iconImageArray[0].title = "FB";
iconImageArray[1]=new Image();
iconImageArray[1].width=24;
iconImageArray[1].alt="Instagram Icon";
iconImageArray[1].src = "./instagram.png";
iconImageArray[1].title = "IG";
iconImageArray[2]=new Image();
iconImageArray[2].width=24;
iconImageArray[2].alt="Twitter Icon";
iconImageArray[2].src = "./twitter.png";
iconImageArray[2].title = "TW";

$(function () {//Runs immediately
	$.ajax({
		type: 'POST', //Production - Change this to GET
		url: 'http://localhost:3000/feed', //Production - change this to http://systemsengineering.co.uk/feed
		success: function (data){
			//Add posts to index.html as #grid-items
			for (j=0;j<data.length;j++){
				if(data[j].content_type == undefined){
					data[j].content_type = "none";
				}

				var imageSizer;
				if(data[j].image_width>=data[j].image_height){
					imageSizer = '" width="'+maxImageWidth;
				}	

				if(data[j].image_width<data[j].image_height){
					imageSizer = '" height="'+maxImageHeight;
				}


				if(!data[j].content_type.includes('html')){
					if (data[j].network_name=="Facebook"){
						$('<div id="grid-item" data-i="'+j+'" style="display: none;">')		
							.append('<img src="./images/'+data[j].image+imageSizer+'" alt="'+data[j].image+'"></>')
							.append('<p><img src="'+iconImageArray[0].src+'" alt="FB" width="'+iconImageArray[0].width+'">&nbsp&nbsp'+data[j].name+' : '+data[j].date+'</p>')
							.appendTo('#thegrid');
					} else if (data[j].network_name=="Instagram") {
						$('<div id="grid-item" data-i="'+j+'" style="display: none;">')
							.append('<img src="./images/'+data[j].image+imageSizer+'" alt="'+data[j].image+'"></>')
							.append('<p><img src="'+iconImageArray[1].src+'" alt="FB" width="'+iconImageArray[1].width+'">&nbsp&nbsp'+data[j].name+" : "+data[j].date+"</p>")
							.appendTo('#thegrid');
					} else if (data[j].network_name=="Twitter") {
						$('<div id="grid-item" data-i="'+j+'" style="display: none;">')
							.append('<img src="./images/'+data[j].image+imageSizer+'" alt="'+data[j].image+'"></>')
							.append('<p><img src="'+iconImageArray[2].src+'" alt="FB" width="'+iconImageArray[2].width+'">&nbsp&nbsp'+data[j].name+" : "+data[j].date+"</p>")
							.appendTo('#thegrid');
					}
				}
				
			}
			//Configure and layout Masonry grid
			$('#thegrid').imagesLoaded(function() {
				console.log("Loaded "+j+" images. Beginning animation.");
				var index = 1;
				var maxIndex = j-1;

				$("#thegrid").children().each(function(){

					if ($(this).attr('data-i')<index){
						$(this).hide(1000);	
					}
					if ($(this).attr('data-i')>=index && $(this).attr('data-i')<index+8){
						$(this).show();
					}
				});
				index++;

				setInterval(function(){
					$("#thegrid").children().each(function(){
						if ($(this).attr('data-i')<index){
							$(this).hide(1000);	
						}
						if ($(this).attr('data-i')>=index && $(this).attr('data-i')<index+8){
							$(this).show(1200);
						}
					});
					if (index>maxIndex){
						index = 1;
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
