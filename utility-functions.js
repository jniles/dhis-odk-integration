/**
 * Created by harsh on 7/5/16.
 */

var _ = {};

_.prepareIdToObjectMap = function(object,id){
    var map = [];
    for (var i=0;i<object.length;i++){
        map[object[i][id]] = object[i];
    }
    return map;
}

_.prepareMapGroupedById= function(object,id){
    var map = [];
    for (var i=0;i<object.length;i++){
        if (!map[object[i][id]]){
            map[object[i][id]] = [];
        }
        map[object[i][id]].push(object[i]);
    }
    return map;
}

_.prepareUID = function(options,ids){
    
    var sha1 = require('js-sha1');
    var uid = sha1(ids.sort());

    return "CL"+uid.substr(0,9);
}
/*
  _.flattenMap = function(data,delimiter){

  var flattenedData = {};
  for (var key in data){
  if (typeof data[key] == "object"){
  for (var key2 in data[key]){
  flattenedData[key+delimiter+key2] = data[key][key2]; 
  }
  }else{
  flattenedData[key] = data[key]; 
  }
  }
  return flattenedData;
  }
*/
_.flattenMap = function(data,delimiter){

    var flattenedData = {};
    for (var key in data){
        var resultingKey = "";
        inner(key,data[key],resultingKey,delimiter,flattenedData)
    }

    return flattenedData;

    function inner(key,data,resultingKey,delimiter,flattenedData){
        resultingKey += key;

        if (typeof data == "object"){
            var isEmpty = true;
            for (var key in data){
                isEmpty = false;
                inner(key,data[key],resultingKey+delimiter,delimiter,flattenedData)
            }
            if (isEmpty){
                //flattenedData[resultingKey] = undefined;
            }
        }else{
            flattenedData[resultingKey] = data;
        }
    }
}
_.getMapLength = function(map){
    var index =0;
    for (var key in map){
        index = index+1;
    }
    
    return index;
}

//http://stackoverflow.com/questions/9804777/how-to-test-if-a-string-is-json-or-not
//http://stackoverflow.com/users/3119662/kubosho
_.isJson = function(item) {
    item = typeof item !== "string"
        ? JSON.stringify(item)
        : item;

    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }

    if (typeof item === "object" && item !== null) {
        return true;
    }

    return false;
}

_.shadowStringify= function (json){
    var str = json;
    str = JSON.stringify(str);
    str = str.replace(/\"/g,'^');
    str = str.replace(/{/g,'<');
    str = str.replace(/}/g,'>');
    return str;
}

_.unshadowStringify = function(str){
    str = str.replace(/\^/g,'"');
    str = str.replace(/</g,'{');
    str = str.replace(/>/g,'}');

    return JSON.parse(str);
}

_.findValueAgainstId = function (data,idKey,id,valKey){

    for (var i=0;i<data.length;i++){
        if (data[i][idKey]==id){
            return data[i][valKey]
        }
    }
    return null;
}
module.exports = _;
