const express = require('express');
const app =  express();
const bodyParser = require('body-parser');
const helper = require('./libs/helpers.js');
//const isOnline = require('is-online');

app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use((req, res, next) => {
	next()
})
app.use(express.static('./public/'));

//routes
app.get('/', (req,res) => {
	res.render('../index.html');
})

app.post('/feed', (req,res) => {
	//isOnline().then(online => {
    //	console.log("online?: ",online);
    //	if(online){
			helper.getPosts(res)
				.then(function(v){
				console.log("server getposts then function.");
				console.log(v.body);
			});
    //	} else {
    //		console.log("Waiting for internet connection");
    //	}
	//});

	
	//helper.sendFeed(res);
})

app.listen(3000)
