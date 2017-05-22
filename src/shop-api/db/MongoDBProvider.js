/**
 * Created by roman_b on 1/4/2017.
 */
import monk from 'monk';
import mongodb from 'mongodb';
import config from '../../../data/scripts/config/config';

class MongoDBProvider{
    constructor(){
       this.db = monk(config.dbURI);
       this.authDb = monk(config.authDbURI);
    }
}

export default new MongoDBProvider();
