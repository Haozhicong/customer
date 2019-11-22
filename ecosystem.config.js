module.exports = {
    apps: [{
        name: 'customer',
        script: 'app.js',
        args: 'null',
        instances: 2, // 集群实例，可以只有一个，这样表现上与fork无异，但可以用scale
        exec_mode: "cluster", // 集群模式，如不指定，默认为fork
        autorestart: false,
        min_uptime: "60s",
        max_restarts: 3,
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
    }],
};