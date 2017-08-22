function genesis()
{
  return true;
}
//Bridge genesis function initializes the volunteer node value. Currently not using argument , hence initializing to default volunteerNode = true
function bridgeGenesis()
{
  debug("Wroking bridgeGenesis on From side");
  var VolunteerForIndex = "true";

  if(VolunteerForIndex == "true")
  {


    var VolunteerNode = commit("VolunteerNode",VolunteerForIndex);
    commit("volunteer_link",{Links:[{Base:App.Key.Hash,Link:VolunteerNode,Tag:"VolunteerNode"}]});
    debug("VolunteerNode :"+ VolunteerNode);
    var addSelfAsAnchor = {Anchor_Type:"IndexNodes",Anchor_Text:App.Key.Hash};

     anchorMain = {Anchor_Type:"Anchor_Type",Anchor_Text:""};

    var amhash = makeHash(anchorMain);
    debug("Multihash :"+amhash);

    var checkexist = get(amhash,{GetMask:HC.GetMask.Sources});
    debug("Checkexist for add anchor : "+checkexist);
    if(checkexist == JSON.stringify(anchorMain)){

      var IndexNodesAnchor = {Anchor_Type:"IndexNodes",Anchor_Text:""};
      var inhash = makeHash(JSON.stringify(IndexNodesAnchor));
      checkexist = get(inhash,{GetMask:HC.GetMask.Sources});
      debug("Checkexist for index nodes: "+checkexist);

      if(checkexist == JSON.stringify(IndexNodesAnchor) )
      {
        debug("Adding self to index nodes ... "+App.Key.Hash);
        var lnk = call("anchor","anchor_create",addSelfAsAnchor);
        debug(lnk);
      }
      else {
        debug("Creating anchor type IndexNodes");
        //var IndexNodeAnchorType = {Anchor_Type:"IndexNodes",Anchor_Text:""};
        call("anchor","anchor_type_create","IndexNodes");

        debug("Adding self to index nodes ... "+App.Key.Hash);
        var lnk = call("anchor","anchor_create",addSelfAsAnchor);
        debug(lnk);
        }

      }
      else {
        call("anchor","addAnchor","");

        debug("Creating anchor type IndexNodes");
        //var IndexNodeAnchorType = {Anchor_Type:"IndexNodes",Anchor_Text:""};
        var at = call("anchor","anchor_type_create","IndexNodes");
        //debug("Anchor type indexNodes : "+at);

        debug("Adding self to index nodes ... "+App.Key.Hash);
        //debug(typeof JSON.stringify(App.Key.Hash));
        var lnk = call("anchor","anchor_create",addSelfAsAnchor);
        //debug(lnk);
      }
      var ret = JSON.parse(lnk);
      debug(ret[0]);
      return true;
    }
    else
    {
      var VolunteerNode = commit("VolunteerNode",VolunteerForIndex);
      commit("volunteer_link",{Links:[{Base:App.Key.Hash,Link:VolunteerNode,Tag:"VolunteerNode"}]});
      return true;
    }
}

function selectIndexNode()
{

  var VolunteerNodeH = getLink(App.Key.Hash,"VolunteerNode",{Load:true});
  debug(VolunteerNodeH);
  debug("Volunteer node value :"+VolunteerNodeH.Links[0].E)

  if(VolunteerNodeH.Links[0].E == "true")
  {
    var key =App.Key.Hash;
  }
  else
  {
    var indexNodes = call("anchor","anchor_list","IndexNodes");
    var IndexNodesjs = JSON.parse(indexNodes);

    var numberOfIndexNodes = IndexNodesjs.length;
    debug("Number of index nodes : "+numberOfIndexNodes);

    var selectedNumber = Math.floor(Math.random()*numberOfIndexNodes);

    var key = IndexNodesjs[selectedNumber].Anchor_Text;
  }
  return key;
}

function indexObject(object)
{
  var indexNode = selectIndexNode();
  debug("Selected index node : "+indexNode);
  var objHash = object.objHash;
  //For tests
  //var objHash = makeHash(object);
  debug("Hash of object : "+objHash);
  var App_DNA_Hash = "QmQjgvQQik1RhBEg1zpDY1PKRsdgm1YQhbZ7Ebj2drY7f4";

  var messageObj = {type:"createIndex",content:object.content,hashOfObject:objHash,language:"English"};
  if(indexNode == App.Key.Hash)
  {
    var createIndex = bridge(App_DNA_Hash,"indexcontent","IndexContent",messageObj);
  }
  else {
      var createIndex = send(indexNode,messageObj);
  }
  debug(createIndex);
  return createIndex;
}

function indexObjectForTest(object) //This function was created as make hash cannot be done in test
{
  var indexNode = selectIndexNode();
  debug("Selected index node : "+indexNode);

  var objHash = makeHash(object);
  debug("Hash of object : "+objHash);
  var App_DNA_Hash = "QmQjgvQQik1RhBEg1zpDY1PKRsdgm1YQhbZ7Ebj2drY7f4";

  var messageObj = {type:"createIndex",content:object.content,hashOfObject:objHash,language:"English"};
  if(indexNode == App.Key.Hash)
  {
    var createIndex = bridge(App_DNA_Hash,"indexcontent","IndexContent",messageObj);
  }
  else {
      var createIndex = send(indexNode,messageObj);
  }
  debug(createIndex);
  return createIndex;
}


function searchContent(StringOfsearchKeywords)
{
  var indexNode = selectIndexNode();
  debug("Selected index node : "+indexNode);

  var App_DNA_Hash = "QmQjgvQQik1RhBEg1zpDY1PKRsdgm1YQhbZ7Ebj2drY7f4"

  var messageObj = {type:"searchKeywords",searchString:StringOfsearchKeywords};

  if(indexNode == App.Key.Hash)
  {
    var searchResults = bridge(App_DNA_Hash,"indexcontent","searchKeywords",StringOfsearchKeywords);
  }
  else {
      var searchResults = send(indexNode,messageObj);
  }
  debug("Returened from holodex"+searchResults);
  return searchResults;
}

function receive(input, msg)
{
  if(msg.type == "createIndex")
  {
    //var retVal = IndexContent(msg.content,msg.hashOfObject,msg.language);
    var retVal = bridge("QmQjgvQQik1RhBEg1zpDY1PKRsdgm1YQhbZ7Ebj2drY7f4","indexcontent","IndexContent",msg);
  }
  else if(msg.type == "searchKeywords")
  {
    debug("Searching for the string :::::: "+msg.searchString);
    //var retVal = searchKeywords(msg.searchString);
    var retVal = bridge("QmQjgvQQik1RhBEg1zpDY1PKRsdgm1YQhbZ7Ebj2drY7f4","indexcontent","searchKeywords",msg.searchString);

  }
  return retVal;
}

function isErr(result) {
    return ((typeof result === 'object') && result.name == "HolochainError");
}
function validatePut(entry_type,entry,header,pkg,sources) {
    return validate(entry_type,entry,header,sources);
}
function validateCommit(entry_type,entry,header,pkg,sources) {
    return validate(entry_type,entry,header,sources);
}
// Local validate an entry before committing ???
function validate(entry_type,entry,header,sources) {
//debug("entry_type::"+entry_type+"entry"+entry+"header"+header+"sources"+sources);
    if (entry_type == "anchor_links"||entry_type == "anchor") {
      return true;
    }
    return true
}

function validateLink(linkingEntryType,baseHash,linkHash,tag,pkg,sources){
    // this can only be "room_message_link" type which is linking from room to message
//debug("LinkingEntry_type:"+linkingEntryType+" baseHash:"+baseHash+" linkHash:"+linkHash+" tag:"+tag+" pkg:"+pkg+" sources:"+sources);
if(linkingEntryType=="anchor_links")
return true;

return true;
}
function validateMod(entry_type,hash,newHash,pkg,sources) {return false;}
function validateDel(entry_type,hash,pkg,sources) {return false;}
function validatePutPkg(entry_type) {return null}
function validateModPkg(entry_type) { return null}
function validateDelPkg(entry_type) { return null}
function validateLinkPkg(entry_type) { return null}
