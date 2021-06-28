const express = require('express');
const signupRouter = express.Router();
const { check, validationResult } = require('express-validator');
const Userdata = require('../model/Userdata');

function router(nav1,nav2){
    signupRouter.get('/', function(req,res){
        nav=nav2;
        res.render("signup", 
        {
            nav,
            title: 'Library App'
        });
    });

    signupRouter.post('/', [check('name','Name must have atleast 3 alphabets').isAlpha().isLength({min:3}),
        check('email','Enter vaild email').isEmail()], check('pwd','Password must have atleast 6 characters').isLength({ min: 6})
        , function(req,res){
            const errors = validationResult(req);

            if(!errors.isEmpty()){
                nav=nav2;
                res.render("signup", 
                {
                    nav,
                    title: 'Library App',
                    error: errors.mapped()
                });
            }
            else{
                var item = {name : req.body.name, email : req.body.email, pwd : req.body.pwd};
                var user = Userdata(item);
                user.save();
                nav=nav1;     
                res.render("login", 
                {
                    nav,
                    title: 'Library App'
                });
            }
    });

    return signupRouter;
}

module.exports = router;