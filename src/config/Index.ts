// All configurations will extend these options
// ============================================

const configFactory: any = {
  apiName: "Websocket-Server",
  env: process.env.NODE_ENV,
  // Server port
  port: process.env.PORT,

  // Server protocol
  protocol: process.env.PROTOCOL,

  // Server host
  host: process.env.HOST,

  // Server IP
  ip: process.env.IP,

  // Domain (e.g. https://localhost)
  domain: process.env.DOMAIN,

  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_IP,
    db: 1
  },
  // Lifetime for session
  token: {
    options: {
      issuer: "acme.com",
      expiresIn: 1 * 6000,
      algorithm: "HS256"
    },
    privateKey: process.env.SESSION_SECRET
  },


};


export default configFactory;