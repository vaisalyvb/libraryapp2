const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@ictakfiles.by4qw.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority');
const Schema = mongoose.Schema;


const AuthorSchema = new Schema({
    name : String,
    nationality : String,
    fambook : String,
    image : String
});

var Authordata = mongoose.model('authordata', AuthorSchema);

module.exports =  Authordata;
