var appDB=[
  {
      "appId":"app1",
      "appName":"Travian",
      "keywords":"t1",
      "desc":"Just another game",
  },
  {
      "appId":"app2",
      "appName":"Project IGI",
      "keywords":"IGI1",
      "desc":"Scary mission",
  },
  {
      "appId":"app3",
      "appName":"King Meercat",
      "keywords":"MC1",
      "desc":"Join the king without crown",
  },
  {
      "appId":"app4",
      "appName":"quidditch",
      "keywords":"t1",
      "desc":"Play this game if you can fly",
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
  for (var i=0;i<appdata.length;i++)
  {
    //debug("in"+appdata[i])
    var appHash=commit("app_dna_entry",appdata[i]);
    var me=getMe();
    var x=commit("app_links",{Links:[{Base:me,Link:appHash,Tag:"app"}]});
    // prints the hash of the commit
      debug("commit "+i+" with Hash after committing to chain:"+x);
      debug("Keyword "+i+" :"+appdata[i].keywords);

      // link the app to the Keyword
      var keywordHash=makeHash(appdata[i].keywords);
      var keywordHash=commit("keyword",appdata[i].keywords);
      //check if keyword preexists.if yes, link to existing keyword. if not, then create a new one
      var checkKey=keywordExists(keywordHash);
      debug("checkKey:"+checkKey)
      if(checkKey==="")
      {
        var directory = getDirectory();
        var keylink=  commit("keyword_links",{Links:[{Base:me,Link:keywordHash,Tag:"keyword"}]});
        debug("able to commit keyword links"+keylink)
        var drlink= commit("directory_links",{Links:[{Base: directory,Link: keywordHash,Tag:"keyword"}]});
        debug("able to commit directory_links"+drlink)
        var keyapplink=commit("keyword_links",{Links:[{Base: keywordHash,Link: appHash ,Tag:"app_dna_entry"}]});
        debug("able to commit keyword to individual app"+keyapplink)
      }else{
        commit("keyword_links",{Links:[{Base: checkKey,Link: appHash ,Tag:"app_dna_entry"}]});
          debug("keyword already exists:"+appdata[i].keywords)
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

}


function keywordExists(keywordHash) // borrowed from getAgent
{
  debug(" matching hash against DHT");
  var tempHash=keywordHash;

  var sources=get(tempHash,{GetMask:HC.GetMask.Sources});
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
    if (entry_type == "app_dna_entry"||entry_type == "app_links") {
      return true;
    }
    return true
}

function validateLink(linkingEntryType,baseHash,linkHash,tag,pkg,sources){
    // this can only be "room_message_link" type which is linking from room to message
//debug("LinkingEntry_type:"+linkingEntryType+" baseHash:"+baseHash+" linkHash:"+linkHash+" tag:"+tag+" pkg:"+pkg+" sources:"+sources);
if(linkingEntryType=="app_links")
return true;


return true;
}
function validateMod(entry_type,hash,newHash,pkg,sources) {return false;}
function validateDel(entry_type,hash,pkg,sources) {return false;}
function validatePutPkg(entry_type) {return null}
function validateModPkg(entry_type) { return null}
function validateDelPkg(entry_type) { return null}
function validateLinkPkg(entry_type) { return null}
