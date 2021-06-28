const express = require('express');
const loginRouter = express.Router();
// var bodyParser = require('body-parser'); 
const Userdata = require('../model/Userdata');

function router(nav1,nav2){ 
    // loginRouter.use(bodyParser.urlencoded({ extended: true })); 
    loginRouter.get('/', function(req,res){
        nav=nav2;
        res.render("login", 
        {
            nav,
            title: 'Library App'
        }); 
    });

    loginRouter.post('/', function(req,res){
        if(req.body.email== "" || req.body.pwd ==""){
            nav=nav2;
            res.render("login", 
            {
                nav,
                title: 'Library App',
                msg: 'Enter Username and Password'
            });    
        }
        else{
            Userdata.findOne({name: req.body.name})
            .then(function(user){
                if(req.body.email== "admin96@gmail.com" || req.body.pwd =="Admin96"){
                    nav=nav1;
                    res.render("home", 
                    {
                        nav,
                        title: 'Library App',
                        msg:''
                    });
                }
                else if(req.body.email== "data?.email" || req.body.pwd =="data?.pwd"){
                    nav=nav3;
                    res.render("userHome", 
                    {
                        nav,
                        title: 'Library App',
                        msg:''
                    });
                }
                else{
                    nav=nav2;
                    res.render("login", 
                    {
                        nav2,
                        title: 'Library App',
                        msg: 'Wrong Password'
                    });
                }
            })
            .catch(function(){
                nav=nav2;
                res.render("login", 
                {
                    nav,
                    title: 'Library App',
                    msg: 'Wrong Username'
                });
            })
        }
    });

    return loginRouter;
}

module.exports = router;