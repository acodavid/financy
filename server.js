const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

//routes
const users = require('./routes/api/users');
const reports = require('./routes/api/reports');
const brands = require('./routes/api/brands');

const app = express();

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB je konektovan'))
    .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);


//use Routes
app.use('/api/users', users);
app.use('/api/reports', reports);
app.use('/api/brand', brands);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server je pokrenut na portu ${port}`))