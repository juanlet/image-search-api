var express=require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jade=require('jade');
var imgSearcher=require('./modules/img-searcher');
process.on('uncaughtException', console.error);
require('dotenv').config({
  silent: true
});;

var mongoose = require('mongoose');


var app = express();

// Path to our public directory

var pub = __dirname;
app.use(express.static(pub));

var mongouri = process.env.MONGOLAB_URI || "mongodb://" + process.env.IP + ":27017/img-sal";
    
mongoose.connect(mongouri)    
    .then(()=>console.log("connected"));


// Set our default template engine to "jade"
// which prevents the need for extensions
// (although you can still mix and match)
app.set('view engine', 'jade');


app.use(bodyParser.urlencoded({ extended: true }))

/* GET home page. */
app.get('/',function(req,res,next){

    res.render('index', { title: 'Express' });

});


app.get('/search/:searchTerm', function(req, res, next) {

   var searchTerm=req.params.searchTerm;
   var offSet=req.query.offset || 0;
   var pageSize=req.query.pageSize || 10;

     
     imgSearcher.searchImage(mongoose,searchTerm,offSet,pageSize,next)
    .then(searchRes=>{res.json(searchRes);});

});


app.get('/latest', function(req, res, next) {

   imgSearcher.getLatest().then(lastSearches=>res.json(lastSearches));

});



app.listen(process.env.PORT || 5000);