# goboot 
#### golang 简易开发框架

```
go mod init goboot
go build
goboot -s
```
| 技术列表  | 说明|
| ------------- | ------------- |
| Gin | http 服务 |
| Zap + lumberjack.v2 | 日志服务 | 
| Gorm | mysql orm |

| 文件夹名称  | 说明                    |
| ------------- | ------------------------------ |
|   app  |  http服务器    |
| console |  cmd命令执行方法 |
|views |  静态网页/文件存储 |
|conf.toml|配置文件|

| app 文件夹  | 说明                    |
| ------------- | ------------------------------ |
|  config  |  配置文件对应 struct    |
|  controller |  方法控制层 |
|  db |  redis / mysql 初始池化层 |
| log | 日志组件 ./goboot.log |
|model| struct 存放, mysql 表自动生成struct 函数 |
|model.result|  http统一返回函数|
|router|  gin 路由|
|tools| 帮助工具类 |
|tools.config| 配置文件读取|
|tools.global|全局参数定义|
|tools.shutdown|  优雅推出处理|
|tools.usage| flag - args参数处理|
|utils| 帮助扩展类 |
|initialization.go|初始化MySQL,Redis,Log,Config等|
