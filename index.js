const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');
const Movie = require('./models/movie');


// create a movies schema that allows users to input their favourite film, actors, release dates, rating , ways to stream

// in a post request for a movies page render all of the information in a list

mongoose.connect(`${process.env.databaseURL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(bodyParser.urlencoded({extended: false}));  // take a string everything
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // style.css 

app.engine('hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs',
    partialsDir: path.join(__dirname, 'views','partials')
}));

app.set('view engine', '.hbs');

app.get('/', async (req, res) => {
    res.render('index', );
});


//// USER SECTION //////

app.post('/', async(req, res) => {
    let {name, email, password } = req.body;
    let existingEmail = await User.findOne({ email })
    let existingUsername = await User.findOne({ name })

    if (existingEmail || existingUsername) {
        console.log('that already exists, silly.')
        let err = new Error (
            `${email} / ${name}: A user whit that email or username already exists`
        )
        err.status=400;
        console.log(err)

        res.render('index', {errorMessage: `${email} / ${name}: A user whit that email or username already exists`});
        return;
    }
    const user = new User ({
        name, /// name in the schema
        email, /// email in the schema 
        password /// password in the schema
    })

    await user.save();
    res.redirect('/');
})


//// MOVIES /////

app.get('/movie', async (req, res) => {
    res.render('movie', );
});

app.post('/movie', async(req, res) => {
    let {title, actor, date, rating, stream } = req.body;
    let existingtitle = await Movie.findOne({ title })
    if (existingtitle) {
        let err = new Error (
            `${title} already exists in Database.`
        )
        err.status=400;
        console.log(err)
        res.render('movie', {errorMessage: `${title} already exists in Database.`});
        return;
    }
    const movie = new Movie ({
        title, 
        actor, 
        date, 
        rating,
        stream
    })
    await movie.save();
    res.redirect('/movie');

    })












// const movie = new Movie ({
//     name, /// name in the schema
//     email, /// email in the schema 
//     password /// password in the schema
// })



// app.post('/login', async(req, res) => {
//     let {email, password } = req.body;
//     let existingEmail = await User.findOne({ email })
//     let existingUsername = await User.findOne({ name })



app.listen(3000, () => {
    console.log('I am listening on 3000')
});



// for PD ... what on earth unified Topology means in the context of mongoose

// const user = new User({
//     name: 'Dean',
//     email: 'deansingleton@dean.com',
//     password: 'ilovejacob'    
// })


// user.save();
