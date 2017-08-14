var appDB=[
  {
      "appId":"app1",
      "appName":"Travian",
      "keywords":["t1","t2"],
      "categories":"category-1",
      "desc":"Just another game"
  },
  {
      "appId":"app2",
      "appName":"Project IGI",
      "keywords":["IGI1","IGI2"],
      "categories":"category-1",
      "desc":"Scary mission"
  },
  {
      "appId":"app3",
      "appName":"Temple Run 1",
      "keywords":["MC1","MC2"],
      "categories":"category-2",
      "desc":"Play this game if you like being chased by a wild monkey"
  },
  {
      "appId":"app4",
      "appName":"Temple Run 2",
      "keywords":["MC1","MC2","MC3"],
      "categories":"category-2",
      "desc":"Play this game if you like being chased by a neanderthal"
  },
  {
      "appId":"app5",
      "appName":"Quidditch",
      "keywords":["t1","t2","MC1"],
      "categories":"category-3",
      "desc":"Play this game if you can fly"
  },
  {
      "appId":"app6",
      "appName":"Age of Empires",
      "keywords":["MC1","MC3"],
      "categories":"category-3",
      "desc":"Awesome game based on medieval settings"
  }
];

function genesis()
{
  debug("Starting genesis from hpm")
//  call("anchor","addAnchor","");
  call("anchor","anchor_type_create","category");
  putData(appDB);// adding from genesis to test display of all apps on pageload()
  return true;

}

/* this function is only testing out the category commit and the app commit */
/*function putData(appdata)
{
  debug("inside putData");
  var directory = getDirectory();
  var pivot="skeletonKeyForAllApps";
  var skeletonKeyHash=commit("key",pivot);
  var w=commit("skeletonKey_link",{Links:[{Base:directory,Link:skeletonKeyHash,Tag:"key"}]});
  debug("before for loop starts");
  for (var i=0;i<appdata.length;i++)
  {
    debug("appdata:"+JSON.stringify(appdata[i]));
    var appHash=commit("app_dna_entry",appdata[i]);
    //var x=commit("app_links",{Links:[{Base:skeletonKeyHash,Link:appHash,Tag:"app_dna_entry"}]}); // linking all apps to same key
    var category=appdata[i].categories;

    var checkKey=keywordExists({Anchor_Type:"category",Anchor_Text:category});
    debug("checkKey"+checkKey);
    if(checkKey==="")
    {
      call("anchor","anchor_create",{Anchor_Type:"category",Anchor_Text:category});
      debug("anchor for "+category+" created ");
      var ctgry=makeHash({Anchor_Type:"category",Anchor_Text:category});
      var categoryLinks=commit("category_links",{Links:[{Base:ctgry ,Link: appHash ,Tag:"app_dna_entry"}]});
      debug("categoryLinks : "+categoryLinks);

    }else{

      var ctgry=makeHash({Anchor_Type:"category",Anchor_Text:category});
      var categoryLinks=commit("category_links",{Links:[{Base:ctgry ,Link: appHash ,Tag:"app_dna_entry"}]});
      debug("linking app to already existing category: "+categoryLinks)
      debug(" linking  to category :"+appdata[i].categories)
    }

  //  var categoryLinks=commit("category_links",{Links:[{Base:ctgry ,Link: appHash ,Tag:"app_dna_entry"}]});
  //  debug("categoryLinks : "+categoryLinks);





  }

  fetchByCategory({Anchor_Type:"category",Anchor_Text:"category-2"});
  //return "success";

}*/



function putData(appdata)
{
  debug("inside putData")
  //alert("inside PutData");


//  for (var i=0;i<appdata.length;i++){
//  debug("Keyword "+(i+1)+" :"+appdata[i].keywords[0]);
//}
  var pivot="skeletonKeyForAllApps";
  var skeletonKeyHash=commit("key",pivot);
  /*** commiting  files to DHT ***/
  //var directory = getDirectory();


  /*** end of file commit ***/
  var w=commit("skeletonKey_link",{Links:[{Base:directory,Link:skeletonKeyHash,Tag:"key"}]});

  for (var i=0;i<appdata.length;i++)
  {
  //  debug ("watchout !!!!!: here comes my App --"+appdata[i].appName);
    var appHash=commit("app_dna_entry",appdata[i]);
    var me=getMe();
    var directory=getDirectory();
    var x=commit("app_links",{Links:[{Base:skeletonKeyHash,Link:appHash,Tag:"app_dna_entry"}]});
    var category=appdata[i].categories;

    /*-------validating category ----------*/
    var checkCategory=keywordExists({Anchor_Type:"category",Anchor_Text:category});

    if(checkCategory==="")
    {
      call("anchor","anchor_create",{Anchor_Type:"category",Anchor_Text:category});
      debug("anchor for "+category+" created ");
      var ctgry=makeHash({Anchor_Type:"category",Anchor_Text:category});
      var categoryLinks=commit("category_links",{Links:[{Base:ctgry ,Link: appHash ,Tag:"app_dna_entry"}]});
      debug("categoryLinks : "+categoryLinks);

    }else{

      var ctgry=makeHash({Anchor_Type:"category",Anchor_Text:category});
      var categoryLinks=commit("category_links",{Links:[{Base:ctgry ,Link: appHash ,Tag:"app_dna_entry"}]});
      debug("linking app to already existing category: "+categoryLinks)
      debug(" linking  to category :"+appdata[i].categories)
    }


      /*--check if keyword already exists.if yes, link to existing keyword, else create a new one--*/
     for(var k=0;k<appdata[i].keywords.length;k++)
      {

          var checkKey=keywordExists(appdata[i].keywords[k]);
          //debug("checkKey:"+checkKey)
          if(checkKey==="")
          {
            //var directory = getDirectory();
            var keywordHash=commit("keyword",appdata[i].keywords[k]);

            var drlink= commit("directory_links",{Links:[{Base: directory,Link: keywordHash,Tag:"keyword"}]});
            debug("able to commit directory_links"+drlink)
            var keyapplink=commit("keyword_links",{Links:[{Base: keywordHash,Link: appHash ,Tag:"app_dna_entry"}]});
            debug("able to link keyword to individual app:"+keyapplink)
          }else{
            //commit("keyword_links",{Links:[{Base: checkKey,Link: appHash ,Tag:"app_dna_entry"}]});
            var keyHash=makeHash(appdata[i].keywords[k])
            var x=commit("keyword_links",{Links:[{Base: keyHash,Link: appHash ,Tag:"app_dna_entry"}]});
            debug("linking app to already existing keyword: "+x)
            debug("keyword already exists:"+appdata[i].keywords[k])
          }

   }


  }

 //fetchData("t1");
 //fetchAllApps()
 //fetchByCategory({Anchor_Type:"category",Anchor_Text:"category-3"});
 //fetchByCategory("category-3");
 return "success";

}

function fetchByCategory(category)
{
    var obj={Anchor_Type:"category",Anchor_Text:category};

    // ----trial code ---//
    var apps=[];
    var categoryHash=makeHash(obj);
    debug("Category"+JSON.stringify(category));
    //var searchKey=keywordExists(keywordHash);
   var appList=doGetLinkLoad(categoryHash,"app_dna_entry");
    //var appLists=getLink(categoryHash,"app_dna_entry",{Load:true});
    debug("Length of applist"+appList.length)

    for(var j=0;j<appList.length;j++) {
            var app = appList[j];
            //debug("applist "+appList[j].H)
            apps.push(app);


      }
      debug("<--------fetching data by category---------->");
      debug(JSON.stringify(apps));

      return apps;

}


function fetchAllApps()
{
  debug("<--------fetching all apps ---------->");
  var apps=[];
  //var directory = getDirectory();
  var skeletonKeyHash=makeHash("skeletonKeyForAllApps");
  var appList=doGetLinkLoad(skeletonKeyHash,"app_dna_entry");
  debug("Length of applist"+appList.length)
  for(var j=0;j<appList.length;j++) {
          var app = appList[j]
          //debug("applist "+appList[j].H)
          apps.push(app);


    }
    debug("All App Data commited to DHT --> "+JSON.stringify(apps));
    return apps;
}


function fetchData(keyword)
{
  debug("<--------fetching data by keyword---------->");
    var apps=[];
    var keywordHash=makeHash(keyword);
    debug("keyword"+keyword);
    //var searchKey=keywordExists(keywordHash);
   var appList=doGetLinkLoad(keywordHash,"app_dna_entry");
    //var appLists=getLink(keywordHash,"app_dna_entry",{Load:true});
    debug("Length of applist"+appList.length)
    for(var j=0;j<appList.length;j++) {
            var app = appList[j]
            //debug("applist "+appList[j].H)
            apps.push(app);


      }
      debug("All App DATA --> "+JSON.stringify(apps));
/*
      debug("----- Apps by Keyword -----");
      debug("appHash:"+apps[0].H);
      debug("app_dna_entry:"+apps[0].app_dna_entry["appName"]);
      */

      //debug("App_dna_entry------->"+apps);
      //debug("type of"+typeof apps);
      return apps;
}





function keywordExists(keyword) // borrowed from getAgent
{
  debug(" matching hash against DHT for: "+keyword);
  var keyHash=makeHash(keyword);
  //var tempHash=keywordHash;
  debug("keyHash: "+keyHash)

  var sources=get(keyHash,{GetMask:HC.GetMask.Sources});
  if (isErr(sources)) {
    sources = [];
  }
  if (sources != undefined) {
      var n = sources.length -1;
      return (n >= 0) ? sources[n] : "";
  }
  return "";
}

/*---- Helper functions ----*/

function getMe() {return App.Key.Hash;}

function getDirectory() {return App.DNA.Hash;}

function isErr(result) {
    return ((typeof result === 'object') && result.name == "HolochainError");
}


// helper function to do getLink call, handle the no-link error case, and copy the returned entry values into a nicer array
function doGetLinkLoad(base, tag) {
    // get the tag from the base in the DHT
    var links = getLink(base, tag,{Load:true});
    debug("Links Raw:"+JSON.stringify(links));

    if (isErr(links)) {
        links = [];
    } else {
        links = links.Links;
    }
    var links_filled = [];
    for (var i=0;i <links.length;i++) {
        var link = {H:links[i].H};
        link[tag] = links[i].E;
        links_filled.push(link);
    }
    debug("Links Filled:"+JSON.stringify(links_filled));
    return links_filled;
}


/****Validation***/
function validatePut(entry_type,entry,header,pkg,sources) {
    return validate(entry_type,entry,header,sources);
}
function validateCommit(entry_type,entry,header,pkg,sources) {
    return validate(entry_type,entry,header,sources);
}
// Local validate an entry before committing ???
function validate(entry_type,entry,header,sources) {
//debug("entry_type::"+entry_type+"entry"+entry+"header"+header+"sources"+sources);
    if (entry_type == "app_dna_entry"||entry_type == "app_links"||entry_type == "keyword"||entry_type == "keyword_links"||entry_type == "directory_links") {
      return true;
    }
    return true
}

function validateLink(linkingEntryType,baseHash,linkHash,tag,pkg,sources){
    // this can only be "room_message_link" type which is linking from room to message
//debug("LinkingEntry_type:"+linkingEntryType+" baseHash:"+baseHash+" linkHash:"+linkHash+" tag:"+tag+" pkg:"+pkg+" sources:"+sources);
if(linkingEntryType=="app_links"||linkingEntryType=="keyword_links"||linkingEntryType=="directory_links")
return true;


return true;
}
function validateMod(entry_type,hash,newHash,pkg,sources) {return false;}
function validateDel(entry_type,hash,pkg,sources) {return false;}
function validatePutPkg(entry_type) {return null}
function validateModPkg(entry_type) { return null}
function validateDelPkg(entry_type) { return null}
function validateLinkPkg(entry_type) { return null}
