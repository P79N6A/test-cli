const Redis = require('ioredis');

/**
 *
 *
 * @class RedisStore
 */
class RedisStore{
    /**
     *Creates an instance of RedisStore.
     * @param {*} config
     * @memberof RedisStore
     */
    constructor(config) {
        this.isConnecttion = false;
        
        config.retryStrategy = function(times){
            return Math.min(times * 5000 , 30 * 60 * 1000);
        };
        this.redis = new Redis(config);

        this.redis.on('connect' , ()=>{
            this.isConnecttion = true;
            console.log('connect ioredis success' , this.isConnecttion);
        });
        this.redis.on('close' , ()=>{
            this.isConnecttion = false;
            console.log('ioredis is closed.' , this.isConnecttion);
        });
    }

    /**
     *
     *
     * @param {*} key
     * @returns
     * @memberof RedisStore
     */
    async get(key) {
        if ( this.isConnecttion === false ){
            throw Error('connection error');
        }
        let data = await this.redis.get(key);
        return JSON.parse(data);
    }

    /**
     *
     *
     * @param {*} key
     * @param {*} sess
     * @param {*} maxAge
     * @param {*} options
     * @returns
     * @memberof RedisStore
     */
    async set(key, sess, maxAge, options) {
        if ( this.isConnecttion === false ){
            throw Error('connection error');
        }
        try {
            // Use redis set EX to automatically drop expired sessions
            await this.redis.set(key, JSON.stringify(sess), 'EX', (maxAge / 1000) | 0);
        } catch (e) {
            console.log('redis set error:', e);
        }
        return key;
    }

    /**
     *
     *
     * @param {*} key
     * @returns
     * @memberof RedisStore
     */
    async destroy(key) {
        return await this.redis.del(key);
    }
}

module.exports = RedisStore;
