package config

type Config struct {
	General general
	Mysql   mysql
	Redis   redis
}

type general struct {
	ENV string `toml:"ENV"`
}

type mysql struct {
	IsInit      bool
	DSN         string
	MaxOpenConn int
	MaxIdleConn int
}

type redis struct {
	IsInit   bool
	Addr     string
	Password string
	Db       int
	PoolSize int
}
