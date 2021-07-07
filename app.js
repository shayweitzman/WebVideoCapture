const fs = require('fs')
var Video = require('./create-video');
var express = require('express');
var bodyParser = require('body-parser');


var app = express();
app.set('view engine','ejs');
app.listen(3000);
var urlencodedParser = bodyParser.urlencoded({ extended: false });


console.log("Running at: http://localhost:3000/");


app.get('/',function(req,res) { //render for 'GET' request.
  res.render('home',{path:""});
});


app.post('/',urlencodedParser,function (req,res){ //render for 'POST' request.
  const chosenURL = JSON.parse(JSON.stringify(req.body)); //Create JSON from the url given.
  console.log("JSON Received : " ,chosenURL);
  if (!is_url(req.body.url)) { // Check if the URL is valid.
    console.log("Invalid URL");
    res.render('home', {path:'ERROR'}); // Render with an error.
  }
  else{       // if URL is valid
    Video.CreateVideo(chosenURL.url);   //Create video
    var videoObj = {
      file:Video.videoPath
    };
    setTimeout(function(){
      console.log("JSON Sent:" ,videoObj)
      res.render('home', {path:videoObj.file});}, 9000); // Render with the video's path.
  }
});

function is_url(str) { // Check if string is a valid URL.
  regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str))
        {return true;}
        else {return false;}
}




