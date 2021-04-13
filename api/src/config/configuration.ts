const config = {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      ttl: process.env.REDIS_CACHE_TTL,
      max: process.env.REDIS_MAX_ITEM_IN_CACHE
    },
    mailgun: {
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
    }
  };
  
  export default () => config;
  