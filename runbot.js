var fs = require('fs');
var process = require('process');
var app = require('electron').remote;
var dialog = app.dialog;
var twit = require('twit');
var hashtag = '';
var text = JSON.parse(fs.readFileSync('./temp/runbot.txt','utf8'));
var botName = text.name;
var settings = text.account;
var wait = require('wait-for-stuff');

//GET DETAILS FROM bots
var details = JSON.parse(fs.readFileSync('./bots/' + botName + '.txt','utf8'));
    //structure
    /*
    'name': name,
    'criteria': criteria,
    'response': response
    */
//GET DETAILS FROM settings
var creds = JSON.parse(fs.readFileSync('./settings/' + settings + '.txt','utf8'));
if (fs.existsSync('./temp/runbot.txt')) {
    fs.unlinkSync('./temp/runbot.txt');
}
    //structure
    /*
    'NAME': name,
    'AK': AK,
    'ASK': ASK,
    'AT': AT,
    'ATS': ATS
    */
//TWITTER PORTION OH NO!!!!
var T = new Twit({
  consumer_key: creds.AK.trim(),
  consumer_secret: creds.ASK.trim(),
  access_token: creds.AT.trim(),
  access_token_secret: creds.ATS.trim(),
  timeout_ms: 2000
});
var comment;
var user;

function getHash(){
    hashtag = document.getElementById('hashtag').value.toString();
    if(hashtag != ''){
        document.getElementById('hash').style.display = "none";
        document.getElementById('respond').style.display = "none";
        document.getElementById('hashflow').style.display = "none";
        document.getElementById('followers').style.display = "none";
        T.get('search/tweets', { q: hashtag, count: 1}, function(err, data, response) {
            alert(JSON.stringify(data));
            for(var i = 0; i < data.statuses.length; i++){
                document.getElementById('insert').innerHTML = JSON.stringify(data.statuses[i].text);
                document.getElementById('insert2').innerHTML = JSON.stringify(data.statuses[i].user.screen_name) + '\n' + JSON.stringify(data.statuses[i].user.name);
                T.post('statuses/update',{status: details.response + ' @' +  JSON.stringify(data.statuses[i].user.screen_name)}, function(err, data2, response){})
            }
        });
        document.getElementById('current').style.display = "block";
    } else{
        alert('Please type in a hashtag!');
    }
}
function runBot(num){
    if(num == '1'){
        alert('1');
    } else if(num == '2'){
        document.getElementById('hash').style.display = "block";
    } else{
        alert('3');
    }
}
