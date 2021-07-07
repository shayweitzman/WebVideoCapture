const fs = require('fs')
var Video = require('./create-video');
var express = require('express');
var bodyParser = require('body-parser');


var app = express();
app.set('view engine','ejs');
app.listen(3000);
var urlencodedParser = bodyParser.urlencoded({ extended: false });


console.log("Running at: http://localhost:3000/");


app.get('/',function(req,res) {
  res.render('home',{path:""});
});


app.post('/',urlencodedParser,function (req,res){
  const chosenURL = JSON.parse(JSON.stringify(req.body));
  console.log("JSON Received : " ,chosenURL);
  Video.CreateVideo(chosenURL.url);
  var videoObj = {
    file:Video.videoPath
  };
  setTimeout(function(){
    console.log("JSON Sent:" ,videoObj)
    res.render('home', {path:videoObj.file}); }, 9000);
});




