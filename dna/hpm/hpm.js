var appDB=[
  {
      "appId":"app1",
      "appName":"Travian",
      "keywords":["t1","t2"]
      "desc":"Just another game",
  },
  {
      "appId":"app2",
      "appName":"Project IGI",
      "keywords":["IGI1","IGI2"],
      "desc":"Scary mission",
  },
  {
      "appId":"app3",
      "appName":"Run Meercat Run",
      "keywords":["MC1","MC2"],
      "desc":"Join the king without crown",
  },
  {
      "appId":"app4",
      "appName":"quidditch",
      "keywords":["t1","t2"],
      "desc":"Play this game if you can fly",
  },
  {
      "appId":"app5",
      "appName":"Age of Empires",
      "keywords":["MC1","MC3"],
      "desc":"Awesome game based on medieval settings",
  }
];

function genesis()
{
  debug("Starting genesis from hpm")
  putData(appDB);
  return true;

}

function putData(appdata)
{
  debug("inside putData")
  // traverse through appdata json array
  // and commit each element using the app id
  /*
  for (var i=0;i<appdata.length;i++){
  debug("Keyword "+(i+1)+" :"+appdata[i].keywords[0]);
}*/

  for (var i=0;i<appdata.length;i++)
  {
    //debug("in"+appdata[i])
    var appHash=commit("app_dna_entry",appdata[i]);
    var me=getMe();
    var x=commit("app_links",{Links:[{Base:me,Link:appHash,Tag:"app"}]});
    // prints the hash of the commit
      /*debug("commit "+(i+1)+" with Hash after committing to chain:"+x);
        debug("Keyword "+(i+1)+" :"+appdata[i].keywords);*/

      // link the app to the Keyword
      //var keyHash=makeHash(appdata[i].keywords);
    //  var keywordHash=commit("keyword",appdata[i].keywords);

      //check if keyword preexists.if yes, link to existing keyword. if not, then create a new one
     for(var k=0;k<appdata[i].keywords.length;k++)
      {

          var checkKey=keywordExists(appdata[i].keywords[k]);
          //debug("checkKey:"+checkKey)
          if(checkKey==="")
          {
            var directory = getDirectory();
            var keywordHash=commit("keyword",appdata[i].keywords[k]);
            //var keylink=  commit("keyword_links",{Links:[{Base:me,Link:keywordHash,Tag:"keyword"}]});
            //debug("able to commit keyword links"+keylink)
            var drlink= commit("directory_links",{Links:[{Base: directory,Link: keywordHash,Tag:"keyword"}]});
            debug("able to commit directory_links"+drlink)
            var keyapplink=commit("keyword_links",{Links:[{Base: keywordHash,Link: appHash ,Tag:"app_dna_entry"}]});
            debug("able to commit keyword to individual app"+keyapplink)
          }else{
            //commit("keyword_links",{Links:[{Base: checkKey,Link: appHash ,Tag:"app_dna_entry"}]});
            var keyHash=makeHash(appdata[i].keywords[k])
            var x=commit("keyword_links",{Links:[{Base: keyHash,Link: appHash ,Tag:"app_dna_entry"}]});
            debug("linking app to already existing keyword: "+x)
            debug("keyword already exists:"+appdata[i].keywords[k])
          }
   }


      /*
      var directory = getDirectory();

      var keylink=  commit("keyword_links",{Links:[{Base:me,Link:keywordHash,Tag:"keyword"}]});
      debug("able to commit keyword links"+keylink)
      var drlink= commit("directory_links",{Links:[{Base: directory,Link: keywordHash,Tag:"keyword"}]});
      debug("able to commit directory_links"+drlink)
      var keyapplink=commit("keyword_links",{Links:[{Base: keywordHash,Link: appHash ,Tag:"app_dna_entry"}]});
      debug("able to commit keyword to individual app"+keyapplink)
      */

  }

 //fetchData("t1");

}

function fetchData(keyword)
{
  debug("<--------fetching data ---------->");
    var apps=[];
    var keywordHash=makeHash(keyword);
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
      //debug("App_dna_entry------->"+apps);
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
