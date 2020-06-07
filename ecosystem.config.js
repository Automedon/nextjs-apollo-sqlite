module.exports = {
  apps: [
    {
      name: "ssr",
      script: "./server.js",
      instances: 2,
      autorestart: true,
      watch: true,
      max_memory_restart: "2G",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
