module.exports = {
  apps: [{
    name   : 'blog_v2',
    script : 'npm start',
    ignore_watch: [
      'node_modules',
      'draft',
    ],
    error_file: './logs/pm2/app-err.log',
    // 自定义应用程序日志文件(正常日志文件)
    out_file: './logs/pm2/app-out.log',
    // 设置追加日志而不是新建日志
    merge_logs: true,
    // 指定日志文件的时间格式
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
  }]
}
