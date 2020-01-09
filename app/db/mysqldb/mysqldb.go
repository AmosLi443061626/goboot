package mysqldb

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"goboot/app/tools"
)

var _db *gorm.DB

func NewOnceMySql() {
	var err error
	_db, err = gorm.Open("mysql", tools.CONFIG.Mysql.DSN)
	if err != nil {
		panic(err)
	}
	if tools.CONFIG.General.ENV == "Debug" {
		_db.LogMode(true)
	}
	_db.DB().SetMaxOpenConns(tools.CONFIG.Mysql.MaxOpenConn) //设置数据库连接池最大连接数
	_db.DB().SetMaxIdleConns(tools.CONFIG.Mysql.MaxIdleConn) //连接池最大允许的空闲连接数，如果没有sql任务需要执行的连接数大于20，超过的连接会被连接池关闭。
}

func GetDB() *gorm.DB {
	return _db
}
