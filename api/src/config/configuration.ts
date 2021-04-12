const config = {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      ttl: process.env.REDIS_CACHE_TTL,
      max: process.env.REDIS_MAX_ITEM_IN_CACHE
    },
  };
  
  export default () => config;
  