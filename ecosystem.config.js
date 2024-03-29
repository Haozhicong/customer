module.exports = {
    apps: [{
        name: 'customer',
        script: './bin/www',
        args: 'null',
        instances: 4,
        autorestart: false,
        min_uptime: "60s",
        watch: false,
        //error_file: "./logs/app-err.log",
        //out_file: "./logs/app-out.log",
        log: "./logs/app.log",
        //log_date_format: "YYYY-MM-DD HH:mm Z", // pm2 log添加日期
        max_memory_restart: '1G',
        //listen_timeout: 3000,
        kill_timeout: 3000,
        // wait_ready: true,
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production'
        }
    }]

};