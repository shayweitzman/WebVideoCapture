var webshot = require('webshot-node');

module.exports.take = function(url){
    webshot(url,(__dirname+"\\temp.png"), function(err) {
    });
}
