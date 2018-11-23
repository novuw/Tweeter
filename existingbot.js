var fs = require('fs')
var process = require('process');
var app = require('electron').remote;
var dialog = app.dialog;

var bots = [];
fs.readdir('./bots', (err, files) => {
  files.forEach(file => {
      bots.push(file);
      file = file.toString().substring(0, file.length - 4);
      document.getElementById('contents').innerHTML = document.getElementById('contents').innerHTML + '<option value="' + file + '">' + file + '</option>';
  });
});

fs.readdir('./settings', (err, files) => {
  files.forEach(file => {
      bots.push(file);
      file = file.toString().substring(0, file.length - 4);
      document.getElementById('accounts').innerHTML = document.getElementById('accounts').innerHTML + '<option value="' + file + '">' + file + '</option>';
  });
});


function persistInfo(){
    //get information
    //redirect to runbot.html
    let dataForm = new FormData(document.querySelector('#botInfo'));
    let botName = dataForm.get('contents');
    let accountInfo = dataForm.get('accounts');
    let storedInfo = {'name': botName,
                      'account': accountInfo};
    if (!fs.existsSync('./temp')){
        fs.mkdirSync('./temp');
    }
    process.chdir('./temp');
    if (fs.existsSync('./runbot.txt')) {
        fs.unlinkSync('./runbot.txt');
    }
    var createStream = fs.createWriteStream("runbot.txt");
    createStream.write(JSON.stringify(storedInfo));
    createStream.end();
}
