/**
 * Created by roman_b on 4/26/2017.
 */
var bcrypt = require('bcrypt');

export default class UserService{
    constructor(dbProvider){
        this.dbProvider = dbProvider;
    }

    getUser(name){
        const result = new Promise((success, reject) => {
            const users = this.dbProvider.authDb.get('users');
            return users.findOne({name : name}, (err, result) => {
                if (err != null)
                    reject(err);
                else
                    success(result);
            });
        });
        return result;
    }

    validate(user, password){
        if (user == null){
            return Promise.reject({null, false})
        }
        const result = new Promise((success, reject) => {
            bcrypt.compare(password, user.encryptedPass)
            .then((res) => {
               const result = res ? user : res;
               success({err : null, user: result});
            })
            .catch(err => {reject(err);});
        })
        return result;
    }
}