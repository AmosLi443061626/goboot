package main

import (
	"flag"
	"fmt"
	"goboot/app"
	"goboot/app/log"
	"goboot/app/router"
	"goboot/app/tools"
	"net/http"
	"runtime"
)

func main() {
	flag.Parse()
	if tools.H {
		flag.Usage()
		return
	}

	defer func() {
		err := recover()
		if err != nil {
			var buf [4096]byte
			n := runtime.Stack(buf[:], false)
			log.Error(string(buf[:n]))
		}
	}()

	//app项目初始化
	app.Initialization()

	r := router.NewRouter()

	server := &http.Server{
		Addr:    ":" + tools.P,
		Handler: r,
	}
	if tools.S {
		go server.ListenAndServe()
		fmt.Println("启动端口", server.Addr)
	}
	//关机
	tools.Shutdwon(server)
}
