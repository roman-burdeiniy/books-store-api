/**
 * Created by roman_b on 4/22/2017.
 */
var config = require('./config/config');
var Data = require('./mock-data');
var MongoClient = require('mongodb').MongoClient;
var removeCollection = require('./utils');

function generate(){
    MongoClient.connect(config.dbURI, function(err, db) {
        console.log("Connected to db");
        populateDB(db);
    });

}

function populateDB(db){
    var langColl = db.collection('languages');
    var categoriesColl = db.collection('categories');
    var itemsColl = db.collection('items');
    var ordersColl = db.collection('orders');
    removeCollection(itemsColl)
        .then(function(){
            removeCollection(categoriesColl);
        })
        .then(function(){
            removeCollection(langColl);
        })
        .then(function(){
            removeCollection(ordersColl);
        })
        .then(function(){
            var data = new Data();
            itemsColl.ensureIndex({name: "text", publisher: "text", author: "text"},
                {weights: {name: 3, author: 2, publisher : 1}, name : "TextIndex"})
            .then(function(){
                return itemsColl.insert(data.items);
            })
            .then(function(){
                return langColl.insert(data.languages);
            })
            .then(function(){
                return categoriesColl.insert(data.categories);
            })
            .then(function(){
                process.exit();
            });
        })
}

generate();


