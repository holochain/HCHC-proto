// Copyright (C) 2013-2017, The MetaCurrency Project (Eric Harris-Braun & Arthur Brock)
// Use of this source code is governed by GPLv3 found in the LICENSE file
//---------------------------------------------------------------------------------------

// Holochain UI library

// use send to make an ajax call to your exposed functions
module.exports = function send(fn,data,resultFn) {
    console.log("calling: " + fn+" with "+JSON.stringify(data));
    debugger;
    console.log($)
    $.post(
        "http://localhost:4141/fn/hpm/"+fn,
        data,
        function(response) {
            console.log("response: " + response);
            resultFn(response);
        }
    )//.error(function(response) {
    //    console.log("response failed: " + response.responseText);
    //})
    ;
};


//exports.data=send;

//module.exports = function send(fn,data,resultFn) {
