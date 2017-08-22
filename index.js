const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var win = null;

/* -trying out shell- */
var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout);alert(stdout) }
exec(`/${__dirname}/bin/hcdev web`, puts);
//exec(`ls ${__dirname}`, puts);
//exec('ls -la')


//$('input[name=appFolder]').change(function(ev) {
//exec(`/${__dirname}/bin/hcdev package`, puts);
//});


function show(error, stdout, stderr) {
alert("running hcdev package..."+stdout);
console.log("running hcdev package"+stdout);
}
function packageApp(x) {
  alert("Inside packageApp():"+x);
   //exec(`/${__dirname}/bin/hcdev package`, puts);
  exec(`/Users/tishachoudhuri/gitrepo/HCHC/bin/hcdev package`,show)
}





app.on('ready',function(){
  win = new BrowserWindow({
    width:612,
    height:384
    //nodeIntegration: false
  });
  //win.$ = window.jQuery = require('jquery');

  let $ = require(`/${__dirname}/bower_components/jquery/dist/jquery.js`);
  win.$ = $;

  win.webContents.openDevTools();

  win.loadURL(`file://${__dirname}/ui/index.html`);
  //win.loadURL('http://localhost:4141');

  win.on('closed', () => {
    win = null
  });


})
