package redisdb

import (
	"fmt"
	"goboot/app/tools"
	"gopkg.in/redis.v4"
)

var _redisPool *redis.Client

func NewOnceRedis() {
	_redisPool = createClient()
}

func createClient() *redis.Client {
	client := redis.NewClient(&redis.Options{
		Addr:     tools.CONFIG.Redis.Addr,
		Password: tools.CONFIG.Redis.Password,
		DB:       tools.CONFIG.Redis.Db,
		PoolSize: tools.CONFIG.Redis.PoolSize,
	})

	// 通过 cient.Ping() 来检查是否成功连接到了 redis 服务器
	pong, err := client.Ping().Result()
	fmt.Println(pong, err)

	return client
}

func GetRedis() *redis.Client {
	return _redisPool
}
