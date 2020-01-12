package utils

import (
	"time"
)

const TimeFomatYYYYMMDDHHddss = "2006-01-02 15:04:05"

//string转time.Timer'2006-01-02'
func StringToTimeMD(s string) (time.Time, error) {
	loc, err := time.LoadLocation("Asia/Shanghai")
	if err != nil {
		loc = time.FixedZone("CST", 8*3600)
	}
	return time.ParseInLocation("2006-01-02", s, loc)
}
