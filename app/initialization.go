package app

import (
	"goboot/app/db/mysqldb"
	"goboot/app/db/redisdb"
	"goboot/app/log"
	"goboot/app/tools"
)

//TODO:初始化MySQL,Redis,Log,Config等
func Initialization() {
	tools.NewOnceConfig() //配置文件初始化
	log.NewLog()          //初始化日志
	if tools.CONFIG.Redis.IsInit {
		redisdb.NewOnceRedis() //初始化redis
	}
	if tools.CONFIG.Mysql.IsInit {
		mysqldb.NewOnceMySql() //初始化db
	}
}
