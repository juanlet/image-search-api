var express=require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jade=require('jade');
var imgSearcher=require('./modules/img-searcher');
process.on('uncaughtException', console.error);
require('dotenv').config({
  silent: true
});;


var app = express();

// Path to our public directory

var pub = __dirname;
app.use(express.static(pub));


// Set our default template engine to "jade"
// which prevents the need for extensions
// (although you can still mix and match)
app.set('view engine', 'jade');


app.use(bodyParser.urlencoded({ extended: true }))

/* GET home page. */
app.get('/',function(req,res,next){

    res.render('index', { title: 'Express' });

});


app.get('/search/:searchTerm?offset=:offset', function(req, res, next) {

  /* var searchTerm=req.params.searchTerm;
   var offSet=req.query.offset;
    console.log(searchTerm,offSet); */
     
     //urlConverter.redirectToShortURL(id,res, next);

});


app.get('/latest', function(req, res, next) {



  //urlConverter.shortenURL(url).then(obj=> {return res.json(obj);}).catch(next);

});



app.listen(process.env.PORT || 5000);