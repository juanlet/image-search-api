var mongoose = require('mongoose');
var assert = require('assert');
var Search = require('bing.search');
var util = require('util');
var Latest=require('./../models/Latest.js');
const Promise = require("bluebird");

module.exports={
    
    searchImage:function(db,searchTerm,offset,pageSize,next){
    console.log("searching"); 
    var search = new Search('1ROPTXstQWql5EMwzD6VFKUp+pf0BeSCEsVBNCw6iXk');
    
  return new Promise((resolve, reject) => search.images(searchTerm, {top: pageSize, skip:offset}, (err, result) => { 
      
      if (err) 
          {reject(err);} 
      else {
          var formResult=result.map(elem=>{ 
          
              return {"url":elem.url,"snippet":elem.title,"thumbnail":elem.thumbnail.url,"context":elem.sourceUrl}; 
              
          });
        resolve(formResult);  
       }
    }))
  
   .then(searchResult=>{return searchResult}).catch(err=>{return next(err)})
  
   .then(searchRes=>{

   //save it to latest searches

    var searchObject = {
      "searchTerm": searchTerm,
      "date": new Date().toLocaleString()
     };
    
   this.saveToDB(searchObject,Latest,searchRes);
   
   return searchRes;
 
  });
  
    },
    saveToDB: function(obj, Latest, searchRes) {
        var searchObj = new Latest(obj);
            searchObj.save(function(doc) {
                console.log("Search saved");
            });
 
 },    
  getLatest:function(){
  //get the latest searches      
  
  return Latest.find({}, {_id:0,__v:0}, {
      "limit": 10,
      "sort": {
        "when": -1
      }
  });
  
  
  }    
    
    
};