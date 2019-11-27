const express = require('express');
const router = express.Router();
const passport = require('passport');

const Brand = require('../../models/Brand');

// @route   POST api/brand
// @desc    Add brand
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const newBrand = {};


    if (req.body.brand) {
        newBrand.brand = req.body.brand
    } else {
        newBrand.brand = 'brand'
    }



    new Brand(newBrand).save().then(brand => res.json(brand));

})

// @route   GET api/brand
// @desc    GET brandS
// @access  Private
router.get('/', (req, res) => {

    Brand.find()
        .sort({ date: -1 })
        .then(brands => res.json(brands))
        .catch(err => console.log(err));

})


module.exports = router;