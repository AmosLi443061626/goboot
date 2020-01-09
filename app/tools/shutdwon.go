package tools

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

// 关机
func Shutdwon(server *http.Server) {
	c := make(chan os.Signal)
	signal.Notify(c, os.Interrupt, os.Kill, syscall.SIGHUP, syscall.SIGINT, syscall.SIGTERM)
	<-c
	cxt, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	err := server.Shutdown(cxt)
	if err != nil {
		fmt.Println("err", err)
	}
	fmt.Println("goboot exit.")
}
