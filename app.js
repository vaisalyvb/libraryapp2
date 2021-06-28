const express = require('express');
const app = new express();
const port = process.env.PORT || 5000;
const nav1 = [
    {
        link: '/books', name: 'Books'
    },
    {
        link: '/authors', name: 'Authors'
    },
    {
        link: '/admin/addbook', name: 'Add Book'
    },
    {
        link: '/admin/addauthor', name: 'Add Author'
    },
    {
        link: '/', name: 'Log Out'
    }
];
const nav2 = [
    
  
    {
        link: '/signup', name: 'Sign Up'
    },
    {
        link: '/login', name: 'Log In'
    }
];



const booksRouter = require('./src/routes/bookRoutes')(nav1);
const authorsRouter = require('./src/routes/authorRoutes')(nav1);
const signupRouter = require('./src/routes/signupRoutes')(nav1,nav2);
const loginRouter = require('./src/routes/loginRoutes')(nav1,nav2);
const homeRouter = require('./src/routes/homeRoutes')(nav1);
const adminRouter = require('./src/routes/adminRoutes')(nav1);




app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views','./src/views');
app.use('/books', booksRouter);
app.use('/authors', authorsRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/home', homeRouter);
app.use('/admin', adminRouter);

app.get('/', function(req,res){
    res.render("index", 
    {
        nav2,
        title: 'Library App'
    });
});

app.listen(port,()=>{console.log("Server Ready at" + port)});