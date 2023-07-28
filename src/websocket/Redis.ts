import IoRedis from "ioredis";
import logger from "../core/utility/Logger";


export default class RedisIO {

    public instance: IoRedis.Redis;
    private options: IoRedis.RedisOptions;

    constructor(options: IoRedis.RedisOptions, truncateCache?: boolean) {
        this.options = options;
        this.instance = new IoRedis(this.options);
        this.attachListener();
        if (truncateCache) {
            this.instance.flushdb().then(() => (
                logger.info(`db sinstance : ${this.options.db} truncated.`)
            ));
        }

    }

    public connect = async (): Promise<boolean> => (
        new Promise((resolve, reject) => {
            resolve(true);
        })
    )

    public disconnect = async (): Promise<boolean> => (
        new Promise((resolve, reject) => {
            this.instance.disconnect();
            resolve(true);
        })
    )

    private attachListener = (): void => {

        this.instance.on("connect", () => {
            logger.info(`########## Redis connected - : ip:${this.options.host} host: ${this.options.port} ###########`);
        });

        this.instance.on("error", (err) => {
            logger.error(`Redis connection failed: ${err} `);
        });

        this.instance.on("end", () => {
            logger.info("Redis connection ended");
        });
    };

}
