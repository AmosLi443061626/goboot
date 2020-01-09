package tools

import "github.com/BurntSushi/toml"

func NewOnceConfig() {
	if _, err := toml.DecodeFile(C, &CONFIG); err != nil {
		panic(err)
	}
}
