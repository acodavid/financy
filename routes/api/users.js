const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//validation
const validationLogin = require('../../validation/login');
const validationRegister = require('../../validation/register');

//models
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Testing users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users are working!!!' }));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {

    const { errors, isValid } = validationRegister(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                errors.email = 'Email vec postoji';
                return res.status(400).json({ errors });
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    type: req.body.type,
                    workplace: req.body.workplace,
                    isAdmin: req.body.isAdmin
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })

})

// @route   POST api/users/login
// @desc    Login user
// @access  Public
router.post('/login', (req, res) => {

    const { errors, isValid } = validationLogin(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {

        if (!user) {
            errors.email = 'User not found';
            return res.status(404).json(errors);
        };

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name,
                    isAdmin: user.isAdmin,
                    workplace: user.workplace,
                    type: user.type
                }

                jwt.sign(payload, keys.secretOrKey, { expiresIn: 86400 }, (err, token) => {
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    });
                });

            } else {
                errors.password = 'Password incorrect'
                return res.status(400).json(errors);
            }
        })

    });

});

// @route   GET api/users/current
// @desc    Returning current user
// @access  private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {

    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        type: req.user.type,
        workplace: req.user.workplace,
        isAdmin: req.user.isAdmin
    });

});

// @route   GET api/users/companies
// @desc    Get all companies
// @access  Public
router.get('/companies', (req, res) => {

    User.find().where('type').equals("company")
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.status(404);
            console.log(err);
        })

});

// @route   GET api/users/companies/arhive
// @desc    Get all companies
// @access  Public
router.get('/companies/arhive', (req, res) => {

    User.find().where('type').equals("arhive")
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.status(404);
            console.log(err);
        })

});

// @route   GET api/users/companies/statistic
// @desc    Get all companies
// @access  Public
router.get('/companies/statistic', (req, res) => {

    User.find().where('type').equals("statistic")
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.status(404);
            console.log(err);
        })

});

// @route   DELETE api/users/:id
// @desc    delete user by id
// @access  Public
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    User.findById(req.params.id)
        .then(user => {
            user.remove().then(() => res.json({ success: true }))
        })
        .catch(err => res.status(404).json({ notFound: 'There is not user with that id' }))

})


module.exports = router;