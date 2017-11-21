//helpers.js
var fs = require('fs');

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
		console.log("***********");
		var path = "./public";
		fs.readFile('./public/feed.json', 'utf-8', function(err,json){
			if(err){
				console.log("got an err in readfile");
				console.log(err);
				return;
			}
			var obj = JSON.parse(json);
			console.log("json1: "+obj.success)
			console.log("json2: "+obj.sources[0].name)
			for (var i=0;i<obj.sources.length; i++){
				console.log("Checking the following network: "+obj.sources[i].name);
			}
			console.log("json3: "+obj.posts.length+" posts available");

/*			for (var i=0;i<obj.posts.length;i++){
				console.log("--------START POST-----------");
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
			//console.log("image- "+obj.posts[0].image);
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
console.log(obj.posts);			
			//res.send(obj);
			//return;

		});
		//console.log("Arguement: "+process.argv[2]);
		//var path = "./public/turnercontemporary";
		//fs.readdir(path,'utf8',function(err,files){
		//	if(err){
		//		console.log("getFileList error: ");
		//		console.log(err);
		//		console.log("*** End of Error");
		//		return err;
		//	}
		//	console.log('Sending file list');
		//	res.send(files);
		//	return;
		//})
	}




}