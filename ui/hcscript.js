function searchApp(){

//document.getElementById("searched-val").innerHTML=document.getElementById("searchBar").value;
var searchParameter=document.getElementById("searchBar").value;
var array=[
  {
      "appId":"app1",
      "appName":"Travian",
      "desc":"Just a game",
  },
  {
      "appId":"app2",
      "appName":"Project IGI",
      "desc":"Scary mission",
  },
  {
      "appId":"app3",
      "appName":"King Solomon",
      "desc":"Join the king community",
  }
];
for(var i=0; i< array.length; i++)
{

    if(searchParameter===array[i].Name)
    {
      alert(searchParameter+" found");
    }
}

if(document.getElementById("searchBar").value)
{
  var appElement= document.createElement('div');
  appElement.class="col-sm-4";
  appElement.style.width="400px";
  appElement.style.height="110px";
  appElement.style.margin="5px 5px 10px 135px";
  appElement.style.background="powderblue";
  var appH1= document.createElement('h3');
  appH1.innerText="App 1";

  var appP1= document.createElement('p');
  appP1.innerText="Add an Image";
  var appP2= document.createElement('p');
  appP2.innerText="And brief description..";

  document.body.appendChild(appElement);
  appElement.appendChild(appH1);
  appElement.appendChild(appP1);
  appElement.appendChild(appP2);

}

}
