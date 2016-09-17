var mongoose = require('mongoose');
var assert = require('assert');
var Search = require('bing.search');
var util = require('util');
var Latest=require('./../models/Latest.js');

module.exports={
    
    searchImage:function(db,searchTerm,offset,next){
    console.log("searching"); 
    var search = new Search('1ROPTXstQWql5EMwzD6VFKUp+pf0BeSCEsVBNCw6iXk');
    
  var promise=  new Promise((resolve, reject) => search.images(searchTerm, {top: 10, offset:offset}, (err, result) => { if (err) reject(err); else resolve(result)}));
  
  return  promise.then(searchResult=>{return searchResult}).catch(err=>{return next(err)})
  
  .then(searchRes=>{

   //save it to latest searches

    var searchObject = {
      "searchTerm": searchTerm,
      "date": new Date().toLocaleString()
     };
    
    return this.saveToDB(searchObject,Latest,searchRes);
 
  });
  
    },
  saveToDB:function(obj,Latest,searchRes){
    var searchObj=new Latest(obj);
    return new Promise(function(resolve,reject){searchObj.save(function (doc) {
      resolve(console.log("Search saved"));
    })});

  },    
  getLatest:function(){
  //conect to mongoose and get the latest searches      
      
  }    
    
    
};