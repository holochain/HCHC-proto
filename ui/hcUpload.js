

var fileContent;
$(document).ready(function(){
$("#tableMenu a").click(function(e){
 e.preventDefault(); // cancel the link behaviour
  //alert("category has been clicked");

  var selText = $(this).text();
   $("#tableAnchor").text(selText);

});

});

function getContent(){
  var fr = new FileReader();

  fr.onload=function(){
    alert("Reading file..");
  document.getElementById("fileContents").textContent=this.result;

  }
  var x=document.getElementById("fileInput").files[0];
  fr.readAsText(x);

}





/* styling for drag and drop zone */
function dragOver(event) {
  event.preventDefault();
  var dropzone=document.getElementById('dropzone');
  dropzone.className='dropzone dragover col-sm-9'
  return false;

}



function drag_drop(event) {
  event.preventDefault();
  var dropzone=document.getElementById('dropzone');
  dropzone.className='dropzone col-sm-9';

  /**let's see if this works*/
  var files = event.dataTransfer.files;
  var fr = new FileReader();

  fr.onload=function(e){
    alert("Reading file..");
  //document.getElementById("fileContents").textContent=this.result;
  //document.getElementById("hiddenFileContents").value=atob(this.result);
  fileContent=this.result;
  //fileContent=e.target.result;
  //alert("fileContent"+JSON.stringify(fileContent));

  }
  var x=files[0];
  //alert("readAsArrayBuffer");
  //fr.readAsArrayBuffer(x);
  fr.readAsText(x);
  document.getElementById('dropzone').innerHTML=files[0].name;



}

function drag_leave(event) {
  event.preventDefault();
  var dropzone=document.getElementById('dropzone');
  dropzone.className='dropzone col-sm-9'

}
//  var formData= new FormData();
function uploadFile(files,contents){
  alert(JSON.stringify(files));
  // it is the responsibility of the user to upload a scaffold file
  //   then send the scaffold file to the server to be validateDel
  //   and wait for a response from the server, containing
  //   interesting information about what is in the file
  //   that you can display to the user

  var txt="";
  for(var i=0;i<files.length;i++)
  {
        var file=files[i];
          if ('name' in file) {
            txt += "name: " + file.name + "<br>";
        }
        if ('size' in file) {
            txt += "size: " + file.size + " bytes <br>";
            txt +="contents: "+contents;
        }


  }

  //  return formData;
  //alert("formData:="+JSON.stringify(formData));

document.getElementById("demo").innerHTML = txt;
document.getElementById("fileInput").value=files;
}

/* end of styling for drag and drop zone */


function upload()
{
  var appDB=[];
  //alert("upload method");
  var objForm,appName,desc,keywords,res,category,files;
  objForm=document.getElementById("app-form");

  appName=objForm.elements["appName"].value;
  desc=objForm.elements["desc"].value;
  keywords=objForm.elements["keywords"].value;
  res=keywords.split(",");
  //category=objForm.elements["tableAnchor"].value;
  category=document.getElementById("tableAnchor").innerHTML;
  //files=document.getElementById("hiddenFileContents").value;
  //alert("Actual file content:"+  fileContent);



  var  appObj= {
    "appId":"app8",
    "appName":appName,
    "desc":desc,
    "categories":category,
    "files":fileContent,
    "keywords":res
  }
  //alert("checking upload() "+JSON.stringify(appObj));
  console.log();("checking upload() "+JSON.stringify(appObj));
  //alert("displaying appOBJ"+JSON.stringify(appObj));
  appDB.push(appObj);
//alert("displaying appRepo"+JSON.stringify(appDB));
var x=JSON.stringify(appDB);
send("putData",x, function(data) {
    //console.log("printing data"+typeof JSON.parse(data));


     alert("msg returned by putData: "+data);



  });
  var url = "/index.html";
  window.location(url);
}
