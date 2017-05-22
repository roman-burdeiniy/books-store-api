/**
 * Created by roman_b on 4/27/2017.
 */
var express = require('express');
var router = express.Router();
const passport = require('passport');
import PassportManager from '../managers/PassportManager';

router.get('*', (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        if (err) {return next(err);}
        if (!user) {return res.render('login');}
        res.render('admin');
    })(req, res, next);
});

router.post('*', (req, res, next) => {
    return PassportManager.login(req, res, next);
});

module.exports = router;
