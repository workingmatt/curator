//helpers.js
var feed;
var fs = require('fs');
const https = require('https');
var request = require('request');
var postArray = new Array();

module.exports = {

	sendFeed: function(res){
		//res.send("hi from sendFeed");
		fs.readFile('./public/feed.json', 'utf-8', function(err,json){
			if(err){
				console.log("got an err in readfile");
				console.log(err);
				return;
			}
			var obj = JSON.parse(json);
			res.send(obj);
		});
	},

	getPosts: function(res){
		postArray = [];
		var that = this;
		return new Promise(function(resolve,reject){
			console.log("getPosts ***********");
			https.get('https://api.curator.io/v1/feeds/57C5020C-83C8-4F7D-B227-B8EEEC4A/posts/?api_key=a750692d-1236-47c4-b108-69607e0e06af', (resp)=>{
				let data = '';
				resp.on('data',(chunk)=>{
					data += chunk;
				});

				resp.on('end',()=>{
					console.log("got data from curator.io");
					feed = JSON.parse(data);
					that.getImages()
						.then(function(v){
							resolve(res.send(v));
						})
						.catch(function(v){
							console.log("reject");
							console.log(v);
							console.log("end reject message");
						});
				});

				resp.on('error', (err)=>{
					console.log("https.get error: ");
					console.log(err);
					reject(err);
				});	
			});
		});
	},

	getImages: function() {
		return new Promise(function(resolve, reject){
			var k=0;
			console.log("postCount: "+feed.postCount);
			var promises = new Array;
			for (var i=0;i<feed.postCount;i++){
				
				if(feed.posts[i]!=undefined && feed.posts[i].has_image==1){
					console.log("Has image? "+feed.posts[i].has_image+"- index "+k);
					k=k+1;
					promises.push(getImageLoop(feed, i)); //add all instances of getImageLoop to the pile of promises
				}
			}//end of for loop
			Promise.all(promises) //once all of the pile of promises are done go back to getPosts
				.then(function(){
					console.log("Finished getting all images");
					resolve(postArray);
				})
				.catch(function(err){
					console.log("error in getImages");
					console.log(err);
				});
		});
	}
}

function getImageLoop(feed, i) {
	return new Promise(function(resolve,reject){
		let fileStream = fs.createWriteStream("./public/images/"+i);
		let objPost = new Object();

		objPost.has_image = feed.posts[i].has_image;
		objPost.image = i;
		objPost.image_width = feed.posts[i].image_width;
		objPost.image_height = feed.posts[i].image_height;

		objPost.image_large = feed.posts[i].image_large;
		objPost.image_large_width = feed.posts[i].image_large_width;
		objPost.image_large_height = feed.posts[i].image_large_height;

		objPost.name = feed.posts[i].user_screen_name;
		objPost.text = feed.posts[i].text;
		objPost.network_name = feed.posts[i].network_name;
		var date = new Date(feed.posts[i].source_created_at)
		objPost.date = date.toLocaleDateString("en-GB-oed");
		
		postArray.push(objPost);

		request(feed.posts[i].image, function(err, response, body){ //feed.posts[i].image is a URL
			//console.log(response.headers['content-type']);
			if(err){
				console.log("Err in getImages: ");
				console.log(err);
			}
			if(response.headers['content-type'].includes('text/html')){
				console.log("html detected");
			}
			objPost.content_type = response.headers['content-type'];
		}).pipe(fileStream);

		fileStream.on('close', ()=>{
			resolve();
		});
		fileStream.on('error', (e)=>{
			reject(e);
		});
	});
}
/*			console.log("--------START POST-----------");
			//console.log("id- "+obj.posts[0].id);
			//console.log("network_id- "+obj.posts[0].network_id);
			console.log("status- "+obj.posts[0].status);
			//console.log("flagged- "+obj.posts[0].flagged);
			//console.log("has_media- "+obj.posts[0].has_media);
			console.log("source_type- "+obj.posts[0].source_type);
			//console.log("source_identifier- "+obj.posts[0].source_identifier);
			//console.log("source_created_at- "+obj.posts[0].source_created_at);
			console.log("user_screen_name- "+obj.posts[0].user_screen_name);
			console.log("user_full_name- "+obj.posts[0].user_full_name);
			console.log("user_image- "+obj.posts[0].user_image);
			console.log("text- "+obj.posts[0].text);
			//console.log("is_html- "+obj.posts[0].is_html);
			//console.log("image- "+obj.posts[0].image); PROBABLY A URL 
			//console.log("video- "+obj.posts[0].video);
			console.log("url- "+obj.posts[0].url);
			console.log("user_url- "+obj.posts[0].user_url);
			//console.log("thumbnail- "+obj.posts[0].thumbnail);
			//console.log("video_width- "+obj.posts[0].video_width);
			//console.log("video_height- "+obj.posts[0].video_height);
			console.log("comments- "+obj.posts[0].comments);
			//console.log("views- "+obj.posts[0].views);
			//console.log("is_repost- "+obj.posts[0].is_repost);
			//console.log("is_reply- "+obj.posts[0].is_reply);
			//console.log("is_deleted- "+obj.posts[0].is_deleted);
			//console.log("likes- "+obj.posts[0].likes);
			//console.log("originator_user_screenname- "+obj.posts[0].originator_user_screenname);
			//console.log("originator_user_url- "+obj.posts[0].originator_user_url);
			//console.log("originator_post_url- "+obj.posts[0].originator_post_url);
			//console.log("pinned- "+obj.posts[0].pinned);
			//console.log("longitude- "+obj.posts[0].longitude);
			//console.log("latitude- "+obj.posts[0].latitude);
			console.log("location_name- "+obj.posts[0].location_name);
			console.log("image_width- "+obj.posts[0].image_width);
			console.log("image_height- "+obj.posts[0].image_height);
			console.log("image_processed- "+obj.posts[0].image_processed);
			//console.log("has_image- "+obj.posts[0].has_image);
			//console.log("has_video- "+obj.posts[0].has_video);
			console.log("image_large- "+obj.posts[0].image_large);
			console.log("image_large_width- "+obj.posts[0].image_large_width);
			console.log("image_large_height- "+obj.posts[0].image_large_height);
			console.log("network_name- "+obj.posts[0].network_name);
			//console.log("source_id- "+obj.posts[0].source_id);
			console.log("feed_id- "+obj.posts[0].feed_id);
			//console.log("last_modified- "+obj.posts[0].last_modified);
			}
*/

