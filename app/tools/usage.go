package tools

import (
	"flag"
	"fmt"
	"log"
	"os"
)

var (
	H bool
	S bool
	P string
	C string
)

func init() {
	flag.BoolVar(&H, "h", false, "帮助")
	flag.BoolVar(&S, "s", false, "启动goboot")
	flag.StringVar(&P, "p", "80", "goboot端口")
	flag.StringVar(&C, "c", "conf.toml", "配置文件路径")
	flag.Usage = usage
	log.SetPrefix("goboot_error: ")
	log.SetFlags(log.Ldate | log.Lmicroseconds | log.Llongfile)
}

func usage() {
	_, err := fmt.Fprintf(os.Stderr, `version: goboot/0.1 author: HUI
Usage: goboot [-p port] [-s start]
Options:
 -s  启动goboot
 -p  端口
 -h  帮助
`)
	if err != nil {
		panic(err.Error())
	}
}
