/**
 * Created by roman_b on 4/28/2017.
 */
function removeCollection(coll){
    var prom = new Promise(function (success, reject){
        coll.drop()
            .then(function(res){
                success()
            })
            .catch(function(err){
                console.log("Can't remove collection. Not found");
                success();
            })
    })
    return prom;
}

module.exports = removeCollection;