//client.js
var imageWidth = 380;
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
		url: 'http://systemsengineering.co.uk/feed', //Production - change this to https://api.curator.io/v1/feeds/FEED-ID/posts/?api_key=API_KEY
		success: function (data){
			//Add posts to index.html as #grid-items
			for (j=0;j<data.length;j++){
				if(data[j].content_type == undefined){
					data[j].content_type = "none";
				}

				if(!data[j].content_type.includes('html')){
					if (data[j].network_name=="Facebook"){
						$('<div class="hidden" id="grid-item" data-i="'+j+'">')		
							.append('<img src="./images/'+data[j].image+'" width="'+imageWidth+'" alt="'+data[j].image+'"></>')
							.append("<p>"+iconImageArray[0].title+" : "+data[j].name+" : "+data[j].date+"</p>")
							.appendTo('#thegrid');
					} else if (data[j].network_name=="Instagram") {
						$('<div class="hidden" id="grid-item" data-i="'+j+'">')
							.append('<img src="./images/'+data[j].image+'" width="'+imageWidth+'" alt="'+data[j].image+'"></>')
							.append("<p>"+iconImageArray[1].title+" : "+data[j].name+" : "+data[j].date+"</p>")
							.appendTo('#thegrid');
					} else if (data[j].network_name=="Twitter") {
						$('<div class="hidden" id="grid-item" data-i="'+j+'">')
							.append('<img src="./images/'+data[j].image+'" width="'+imageWidth+'" alt="'+data[j].image+'"></>')
							.append("<p>"+iconImageArray[2].title+" : "+data[j].name+" : "+data[j].date+"</p>")
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
