var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var latestySchema = new Schema({
     searchTerm: String,
     date: String
    });
    
module.exports =  mongoose.model('Latest', latestySchema);