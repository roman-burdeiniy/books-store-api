/**
 * Created by roman_b on 4/27/2017.
 */
var bcrypt = require('bcrypt');
var saltRounds = 10;

var testPass = 'admin';
var permissions = [
    "admin"
];
var user1 = {name : 'admin', encryptedPass : '', email : 'roman.burdeiniy@gmail.com', permissions:permissions};

function generateUser(){
    var result = new Promise(function(success, reject){
        bcrypt.hash(testPass, saltRounds)
            .then(function(hash) {
                user1.encryptedPass = hash;
                success(user1);
            })
            .catch(function(err){
                console.log(err);
                reject(err);
            });
    })
    return result;
}

module.exports = generateUser;