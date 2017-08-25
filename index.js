const electron = require('electron');
const child_process = require('child_process');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

//const BrowserWindow = require('browser-window');
var win = null;

/* getting the directory path */
//const remote = require('electron').remote;

//var dialog = remote.require('electron').dialog;
const dialog = require('electron').dialog;

 var path = require('path')

/**********************************/

/* -trying out shell- */
var result;
var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) {
  //sys.puts(stdout);
  result=stdout;
  console.log("stdout-->"+stdout);
  console.log("stderr-->"+stderr);
  console.log("error-->"+error);
  //var x=result.split('\n')[1];
//  exec('cd '+x+' && '+`${__dirname}/../bin/hcdev package`,displayJSON);
 }

 //function displayJSON(error, stdout, stderr) {

   //alert(stdout);
 //}
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
function packageApp() {
  alert("inside package app");
  //alert("Inside packageApp(y):"+y);
/*
  var x=__dirname;
  alert("Inside packageApp(x):"+x);
  var dirname=document.getElementById('file').value+"";
  var newPath = dirname.replace(/\\/g, "/");
  var url="/"+path.basename(newPath);
  var wholepath=path.join(process.cwd(),'static',url);

  alert("directory name:"+path.basename(newPath));
  alert("path of directory:"+newPath);
  //exec(`which `+path, puts);
//  var x = "/Users/tishachoudhuri/gitrepo/HCHC";
  //var command = 'cd '+x+' && '+`${__dirname}/../bin/hcdev package`;
  //var command=`${__dirname}/../bin/hcdev package`;
  /** var command=wholepath+`/../bin/hcdev package`; **/

  /*
  var command="find /Users${whoami} -name "+path.basename(newPath)+" -type d"
  exec(command, puts);*/
  //var command="find /Users -name "+path.basename(newPath)+" -type d"


   var path = dialog.showOpenDialog({
    properties: ['openDirectory']
});
  alert("path:"+path);
  //exec(`/Users/tishachoudhuri/gitrepo/HCHC/bin/hcdev package`,show)
}


console.log(dialog)


app.on('ready',function(){
  debugger
  console.log('app.on')
  win = new BrowserWindow({
    width:612,
    height:384,
    backgroundColor:'#2e2c29'
    //nodeIntegration: false
  });
  //win.$ = window.jQuery = require('jquery');

  let $ = require(`/${__dirname}/bower_components/jquery/dist/jquery.js`);
  win.$ = $;

  win.packageApp=packageApp;

  win.webContents.openDevTools();

  win.loadURL(`file://${__dirname}/ui/index.html`);
  //win.loadURL('http://localhost:4141');

  win.on('closed', () => {
    win = null
  });




})
