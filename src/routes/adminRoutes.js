const express = require('express');
const adminRouter = express.Router();
const Bookdata = require('../model/Bookdata');
const Authordata = require('../model/Authordata');

function router(nav){
    //Book Controls

    adminRouter.get('/addbook', function(req,res){
        res.render("addbook", 
        {
            nav,
            title: 'Library App'
        }); 
    });

    adminRouter.post('/addbook', function(req,res){
        var item = { title : req.body.title, author : req.body.author, genre : req.body.genre, image : req.body.image};
        var book = Bookdata(item);
        book.save();
        res.redirect('/books');
    });
    
    adminRouter.get('/editbook/:id', function(req,res){
        const id = req.params.id;
        Bookdata.findOne({_id: id})
        .then(function(book){
            res.render('editbook', {
                nav,
                title: 'Library App',
                book
            });
        })
    });
    
    adminRouter.post('/editbook/:id', function(req,res){
        const id = req.params.id;
        let book = {}
        if (req.body.title) book.title = req.body.title
        if (req.body.author) book.author = req.body.author
        if (req.body.genre) book.genre = req.body.genre
        if (req.body.image) book.image = req.body.image
        book = { $set: book }
        Bookdata.updateOne({_id: id},book)
        .then(function(){
            res.redirect('/books');
        })
    });
    
    adminRouter.get('/deletebook/:id', function(req,res){
        const id = req.params.id;
        Bookdata.remove({_id: id})
        .then(function(){
            res.redirect('/books');
        })
    });

    // Author Controls

    adminRouter.get('/addauthor', function(req,res){
        res.render("addauthor", 
        {
            nav,
            title: 'Library App'
        }); 
    });

    adminRouter.post('/addauthor', function(req,res){
        var item = { name : req.body.name, nationality : req.body.nationality, fambook : req.body.fambook, image : req.body.image};
        var author = Authordata(item);
        author.save();
        res.redirect('/authors');
    });

    adminRouter.get('/editauthor/:id', function(req,res){
        const id = req.params.id;
        Authordata.findOne({_id: id})
        .then(function(author){
            res.render('editauthor', {
                nav,
                title: 'Library App',
                author
            });
        })
    });
    
    adminRouter.post('/editauthor/:id', function(req,res){
        const id = req.params.id;
        let author = {}
        if (req.body.name) author.name = req.body.name
        if (req.body.nationality) author.nationality = req.body.nationality
        if (req.body.fambook) author.fambook = req.body.fambook
        if (req.body.image) author.image = req.body.image
        author = { $set: author }
        Authordata.updateOne({_id: id},author)
        .then(function(){
            res.redirect('/authors');
        })
    });

    adminRouter.get('/deleteauthor/:id', function(req,res){
        const id = req.params.id;
        Authordata.remove({_id: id})
        .then(function(){
            res.redirect('/authors');
        })
    });

    return adminRouter;
}

module.exports = router;