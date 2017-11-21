//client.js
console.log("hi from curator client.js");

$(function () {
	console.log("Running initial function");
	$.ajax({
		type: 'POST',
		url: 'http://localhost:3000/feed',
		success: function (data){
			console.log('ajax worked');
			console.log(data);			
		},
		stop: function() {
			console.log("image done");
		}
	});
})