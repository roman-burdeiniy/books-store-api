/**
 * Created by roman_b on 4/26/2017.
 */
const passport = require('passport');
const JwtStrategy  = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
import UserService from '../dataServices/UserService';
import MongoDBProvider from '../db/MongoDBProvider';
var jwt = require('jsonwebtoken');
var winston = require('winston');
import config from '../../../data/scripts/config/config';

class PassportManager{
    configure(app){
        app.use(passport.initialize());
        var opts = {}
        opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
        opts.secretOrKey = config.tokenSecret;
        passport.use(new JwtStrategy(opts,
            (jwt_payload, done) => {
                var a = 0;
              /*  const service = new UserService(MongoDBProvider);
                service.getUser(username)
                    .then(result => service.validate(result, password))
                    .then(result => done(result.err, result.user))
                    .catch(err => {
                        winston.error(err);
                        done(err)
                    })*/
            }
        ));
    }

    login(req, res, next){
        const service = new UserService(MongoDBProvider);
        service.getUser(req.body.username)
            .then(result => service.validate(result, req.body.password))
            .then(result => {
                const token = jwt.sign(result.user, config.tokenSecret, {expiresIn: '24h'});
                res.setHeader('Authorization', `JWT ${token}`);
                res.render('admin');
            })
            .catch(err => {
                winston.error(err);
                res.render('login',
                    {failMessage : 'Login failed.<br>Username or password is not correct'});
            })
    }
}

export default new PassportManager();