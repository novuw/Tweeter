var app = require('electron').remote;
var dialog = app.dialog;
var fs = require('fs')
var process = require('process');

function remember(){
    alert("Seperate each criterion with a comma. For example: Giveaway, giveaway, OnlineAds. Each will be used.");
}

function saveFile(){
    let formData = new FormData(document.querySelector('#botData'))
    let name = formData.get('name');
    let criteria = formData.get('criteria');
    let response = formData.get('response');
    let writeObj = {
        'name': name,
        'criteria': criteria,
        'response': response
        };
    alert(JSON.stringify(writeObj));

    var dir = './bots';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        alert('Bots folder created. \nThis will contain the templates that Firebird uses to make your bots.');
    }
    process.chdir('./bots');
    alert(__dirname.toString());
    var createStream = fs.createWriteStream(name + ".txt");
    createStream.write(JSON.stringify(writeObj));
    createStream.end();
    alert('Bot Created! Head over to the existing bot page to run it!');
}
