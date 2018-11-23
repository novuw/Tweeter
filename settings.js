var app = require('electron').remote;
var dialog = app.dialog;
var fs = require('fs');
var process = require('process');


function saveFile(){
    let formData = new FormData(document.querySelector('#accountInfo'));
    let name = formData.get('NAME');
    let AK = formData.get('AK');
    let ASK = formData.get('ASK');
    let AT = formData.get('AT');
    let ATS = formData.get('ATS');
    let writeObj = {
        'NAME': name,
        'AK': AK,
        'ASK': ASK,
        'AT': AT,
        'ATS': ATS
        };
    alert(JSON.stringify(writeObj));
    var dir = './settings';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        alert('Settings folder created. \nThis will contain the information required to connect to Twitter.');
    }
    process.chdir(dir);
    var createStream = fs.createWriteStream(name + ".txt");
    createStream.write(JSON.stringify(writeObj));
    createStream.end();
    alert('Settings saved!');
}
//SETTINGS- MAKE SURE THAT THIS SAVES TO THE SETTINGS FOLDER. VERY IMPORTANT. IT MAY HAVE ALREADY NAVIGATED OUT EARLIER.
