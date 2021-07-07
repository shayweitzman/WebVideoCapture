var videoshow = require('videoshow')
var ScreenShot = require('./take-screenshot')
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
var ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

var picturePath = __dirname+"\\temp.png"
var videoPath = __dirname+"\\video.mp4"

module.exports.videoPath= require('path').resolve(videoPath);

module.exports.CreateVideo = function (url) { // Take ScreenShot , and make video from it.
   ScreenShot.take(url);
   screenshotToVideo(picturePath);
};


function screenshotToVideo(picturePath, timeout=2000) { // Make video from screenshot.
    const intervalObj = setInterval(function() {
        var file = picturePath;
        const fileExists = fs.existsSync(file);
        if (fileExists) { // If Picture already created. - check again every 2000 ms.
            var SECONDS = 10
            var images = [
                {path: (picturePath), loop: SECONDS},
            ]
            videoshow(images)
                .save(videoPath)
                .on('start', function (command) {
                    console.log('Processing..');
                })
                .on('error', function (err) {
                    console.error('Error:', err)
                })
                .on('end', function (output) {
                    console.log('Video created in:', output)
                     fs.unlinkSync(file); // Delete the picture.
                })
            clearInterval(intervalObj);
        }
    }, timeout);
};

