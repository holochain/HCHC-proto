/*var appDB={
  {
      "appId":"app1",
      "appName":"Travian",
      "keywords":["t1","t2"],
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
      "appName":"King Meercat",
      "keywords":["MC1","MC2"],
      "desc":"Join the king without crown",
  }
};
*/
function genesis()
{
  putData(appDB);
}

function putData(appdata)
{
  // traverse through appdata json array
  // and commit each element using the app id
  for (var i=0;i<appdata.length;i++)
  {
    var appHash=commit("app_dna_entry",appdata[i]);
    var me=getMe();
    var x=commit("app_links",{Links:[{Base:me,Link:appHash,Tag:"app"}]});
    // find if keyword exists in DHT

    debug("commit "+i+" :"+x);

  }

}


/*function search(keyword)
{
  // if keyword exists
    // list the appsByKeyword
    getAppsByKeyword(keyword);
  // else
    // debug("No results  found");

}
function getAppsByKeyword(keyword)
{
      var keywordhash=makeHash(keyword);
      var appsByKeyword=[];

      var appsByKeyword = doGetLinkLoad(keywordhash,"Apps"); // returns all the posts

      //return favoritePosts;
      return JSON.stringify(appsByKeyword);
}
*/

/*---- Helper functions ----*/

function getMe() {return App.Key.Hash;}

function getDirectory() {return App.DNA.Hash;}

// helper function to determine if value returned from holochain function is an error
function isErr(result) {
    return ((typeof result === 'object') && result.name == "HolochainError");
}

// helper function to do getLink call, handle the no-link error case, and copy the returned entry values into a nicer array
function doGetLinkLoad(base, tag) {
    // get the tag from the base in the DHT
    var links = getLinks(base, tag,{Load:true});
    if (isErr(links)) {
        links = [];
    }
    var links_filled = [];
    for (var i=0;i <links.length;i++) {
        var link = {H:links[i].Hash};
        link[tag] = links[i].Entry;
        links_filled.push(link);
    }
    debug("Links Filled:"+JSON.stringify(links_filled));
    return links_filled;
}
