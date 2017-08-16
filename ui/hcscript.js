

// global variable to contain app related values so it can be debugged in console
var apps;

var appContainer=document.getElementById("row");

$(document).ready(function(){
$("#tableMenu a").click(function(e){
    e.preventDefault(); // cancel the link behaviour
    $(".row").html("");
    var selText = $(this).text();
    $("#tableAnchor").text(selText);
    listAppByCategory(selText);
});

});




function listAppByCategory(selText)
{
  var category=JSON.stringify(selText);
  //alert("Parameter passed:"+selText);
//  var searchString={Anchor_Type:"category",Anchor_Text:category};
  send("fetchByCategory",category, function(data) {
    console.log("printing data"+typeof JSON.parse(data));

     apps=JSON.parse(data);
     //alert("apps:"+data);
     if(! apps[0]){
      // alert("no Results");
       noResults();

   }else{
     //alert("Results found");
     for(var i=0;i<apps.length;i++)
     {
         var appInfo=JSON.parse(apps[i].app_dna_entry);

         // pass apps[i].app_dna_entry here
         //-->createHTML(appInfo);
         createHTML(apps[i].app_dna_entry);
        //console.log("app Name"+appInfo.appName+":"+appInfo.desc);
     }

   }

  });


}

function searchApp(){
  var searchInput= JSON.stringify( $('#searchBar').val());
/* data in function(data) here is the value returned by fetchData */
  send("fetchData",searchInput, function(data) {
    console.log("printing data"+typeof JSON.parse(data));

     apps=JSON.parse(data);
    // alert("apps:"+data);
     //error handling not working
     if(! apps[0]){
       //alert("no Results");
       $(".row").html("");
       noResults();

   }else{
    // alert("Results found");
     $(".row").html("");
     for(var i=0;i<apps.length;i++)
     {
         var appInfo=JSON.parse(apps[i].app_dna_entry);
         createHTML(appInfo);
        //console.log("app Name"+appInfo.appName+":"+appInfo.desc);
     }

   }

  });



}



function findAllApps(){
  var searchInput= JSON.stringify( $('#searchBar').val());
// data in function(data) here is the value returned by fetchData
  send("fetchAllApps",searchInput, function(data) {
    console.log("printing data"+typeof JSON.parse(data));

     apps=JSON.parse(data);
     //alert("apps:"+data);
     //error handling not working
     if(! apps[0]){
       //alert("no Results");
       noResults();

   }else{
     //alert("Results found");
     for(var i=0;i<apps.length;i++)
     {
         var appInfo=JSON.parse(apps[i].app_dna_entry);
         //createHTML(appInfo);   <-- uncomment this and comment addApp(appInfo) if this doesnt work
         addApp(appInfo);
        //console.log("app Name"+appInfo.appName+":"+appInfo.desc);
     }

   }

  });



}
/*testing out return of dom elements  from function*/
function addApp(appInfo)
{
//  var addApp=document.querySelector("div.row");
  $("div.row").prepend(makeAppHTML(appInfo));
}
function makeAppHTML(appInfo)
{
  var appID,appName,appDesc,appCategory;

 appName=appInfo.appName;
 appID=appName+1;
 appDesc=appInfo.desc;
 appCategory=appInfo.category

 return '<div class="col-md-3" id="'+appID+'"><div class="media"><a href="#" class="thumbnail pull-left"><img src="images/smartBear.jpg" class="center-block img-responsive"  alt="App Logo" width="250px" height="150px"/></a><div class="media-body"><h5>'+appName+'</h5></div></div></div>'

}
/* end of test*/
function download(appInfo){
  //alert("downloading.."+appInfo);
  var appObj=JSON.stringify(appInfo);
  send("fetchFileByApp",appObj, function(data) {
    //console.log("printing data"+typeof JSON.parse(data));

     //files=JSON.parse(data);
    files=JSON.stringify(data);
    parsedFile=JSON.parse(data);
    var y=parsedFile[0].file;
    //alert("fetchFileByApp() was called succesfully and returns : "+y);

    var newFile = new Blob([y],{type:"text/plain;charset=utf-8"});
    saveAs(newFile,"AppInfo.txt");
     //alert("Results found:"+files);





  });
}


function redirect(appInfo){
  window.location = "appPage.html";
  /*
  // take appInfo from here and store it in session variable of the application page.
  var cookieString="appInfo="+JSON.stringify(appInfo);
  //alert("appInfo inside redirect(): "+appInfo);
  //var cookieString="appInfo="+appInfo;
  document.cookie=cookieString;
  */

  sessionStorage.setItem('key',JSON.stringify(appInfo));
}

function getCookie()
{
  var value=sessionStorage.getItem('key');
  //alert("value"+value);
  download(JSON.parse(value));


  /*
  alert("getCookie1: "+document.cookie);
  var appInfo1=document.cookie.split("=");
  appInfo2=appInfo1[0];
  alert("getCookie2: "+appInfo2);
  appInfo3=appInfo2.split(";");
  var appInfo4=appInfo3[0];
  alert("getCookie3: "+JSON.stringify(appInfo4));
  //var appInfo2=document.cookie.split(";");
  //alert("appInfo:"+appInfo2[0]);
  var customObj=JSON.parse(appInfoArray[1]);
  //alert("getCookie"+document.cookie);
//  alert("checking one of the parameters of app Object:"+customObj.appId);
*/
}


function createHTML(appInf){
  //alert("inside createHTML");

var appInfo=JSON.parse(appInf);
  var appElement=document.createElement('div');
  appElement.class="col-md-4";
  //var x='redirect('+appInf+')';
  //alert("x"+x);
  // change this to  onclick - page redirect
  //appElement.setAttribute('onclick','download('+appInf+')');
  appElement.setAttribute('onclick','redirect('+appInf+')');

  //appElement.style.margin="5px 5px 10px 135px";
  var appH1= document.createElement('h4');
  appH1.innerText=appInfo.appName;

  var appP1= document.createElement('p');
  appP1.innerText="Add an Image";
  var appP2= document.createElement('p');
  appP2.innerText=appInfo.desc;
  var addApp=document.querySelector("div.row");
  //addApp.innerText="no results found";

  var bttn=document.createElement("BUTTON");
  bttn.class="btn btn-info";
  var node=document.createTextNode("download");
  bttn.appendChild(node);
  //bttn.class="btn btn-success";

  appElement.appendChild(appH1);
  appElement.appendChild(appP1);
  appElement.appendChild(appP2);
  appElement.appendChild(bttn);
  addApp.prepend(appElement);


}

function noResults()
{
  var appElement= document.createElement('div');
  appElement.class="alert alert-warning";
  appElement.role="alert";
  appElement.style.margin="5px 5px 10px 135px";
  var appH1= document.createElement('h3');
  appH1.innerText="No results Found..";
  var appP1= document.createElement('p');
  appP1.innerText="Add an Image";
  var addApp=document.querySelector("div.row");
  appElement.appendChild(appH1);
  appElement.appendChild(appP1);
  addApp.prepend(appElement);
}
