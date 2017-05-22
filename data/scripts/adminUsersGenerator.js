/**
 * Created by roman_b on 4/27/2017.
 */
var config = require('./config/config');
var generateUser = require('./mock-admin');
var MongoClient = require('mongodb').MongoClient;
var removeCollection = require('./utils');

function generate(){
    MongoClient.connect(config.authDbURI, function(err, db) {
        console.log("Connected to auth db");
        var usersColl = db.collection('users');
        populateDB(db);
        removeCollection(usersColl).then(function(){
            populateDB(db);
        });
    });

}

function populateDB(db) {
   var usersColl = db.collection('users');
   generateUser()
        .then(function(user){
            usersColl.insert(user)
                .then(function(res){process.exit()});
        })
        .catch(err => {
            process.exit();
        })
}

generate();