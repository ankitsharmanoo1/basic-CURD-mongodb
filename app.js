const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session'); 
require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.urlencoded({ extended: false }));

// Sessions middleware
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

// Routes
const artRoutes = require('./routes/Art');
const userRoutes = require('./routes/user');
app.use('/', artRoutes);
app.use('/', userRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});











// const cookieParser = require('cookie-parser')

// const express = require('express');

// const bcrypt = require('bcrypt');

// var jwt = require('jsonwebtoken');

// const app = express();

// app.use(cookieParser())

// app.get("/", function (req,res){
//     // res.cookie("name", "Ankit"); how to set a cookie
//     var token = jwt.sign({ email: 'ankitsharma11876@gmail.com' }, 'secret');
//     res.cookie("token", token)

//     console.log("Donnnee");

//     res.send("Cookie set on Your Browser")


// })

// app.get("/read", function (req,res){
//     console.log(req.cookies.token);
//     res.send("read this alsooo ")
//     const data = jwt.verify(req.cookies.token,'secret');
//     console.log(data);
// })



// app.listen(3000);