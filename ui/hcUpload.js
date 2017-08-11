


$(document).ready(function(){
$("#tableMenu a").click(function(e){
 e.preventDefault(); // cancel the link behaviour
  alert("category has been clicked");

  var selText = $(this).text();
   $("#tableAnchor").text(selText);

});

});




// working on upload file
/*
(function(){
  var dropzone=document.getElementById('dropzone');
  dropzone.ondragover=function(){
    this.ClassName='dropzone dragover'
    return false;
    }


  dropzone.ondragleave=function(){
    this.ClassName='dropzone';
    return false;

  }

});
*/


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

  var files = event.dataTransfer.files;
  document.getElementById('dropzone').innerHTML=files;
  uploadFile(event.dataTransfer.files);
  //handleFileSelect(event);
  //alert(event.dataTransfer.files[0].name);

}

function drag_leave(event) {
  event.preventDefault();
  var dropzone=document.getElementById('dropzone');
  dropzone.className='dropzone col-sm-9'

}
//  var formData= new FormData();
function uploadFile(files){
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
        }
  }

//  return formData;
  //alert("formData:="+JSON.stringify(formData));

document.getElementById("demo").innerHTML = txt;

 document.getElementById("fileInput").value=files;


}




function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  }
/* end of styling for drag and drop zone */


function upload()
{
  var appDB=[];
  alert("upload method");
  var objForm,appName,desc,keywords,res,category,files;
  objForm=document.getElementById("app-form");

  appName=objForm.elements["appName"].value;
  desc=objForm.elements["desc"].value;
  keywords=objForm.elements["keywords"].value;
  res=keywords.split(",");
  //category=objForm.elements["tableAnchor"].value;
  category=document.getElementById("tableAnchor").innerHTML;
//  files=document.getElementById("fileInput").value;



  var  appObj= {
    "appId":"app8",
    "appName":appName,
    "keywords":res,
    "categories":category,
  //  "files":files[i],
    "desc":desc
  }
  //alert("displaying appOBJ"+JSON.stringify(appObj));
  appDB.push(appObj);
alert("displaying appRepo"+JSON.stringify(appDB));
var x=JSON.stringify(appDB);
send("putData",x, function(data) {
    //console.log("printing data"+typeof JSON.parse(data));


     alert("msg returned by putData: "+data);



  });
alert("send has been invoked");

// alert(appName+":"+desc+":"+res);
}
