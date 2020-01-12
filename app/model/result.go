package model

import (
	"github.com/gin-gonic/gin"
)

const (
	SUC = 200
	ERR = 500
)

//TODO:返回结构体
type Result struct {
	Code    int         `json:"code"`
	Msg     string      `json:"msg"`
	ErrCode int         `json:"errcode"`
	Data    interface{} `json:"data"`
}

//TODO:返回结构体
type PageResult struct {
	Code     int         `json:"code"`
	Msg      string      `json:"msg"`
	ErrCode  int         `json:"errcode"`
	Data     interface{} `json:"data"`
	Total    int64       `json:"total"`
	PageSize int         `json:"pageSize"`
	Current  int         `json:"current"`
}

//返回错误信息
func Error(c *gin.Context, errCode int, msg string, data interface{}) {
	c.JSON(200, &Result{
		Code:    ERR,
		Msg:     msg,
		ErrCode: errCode,
		Data:    data,
	})
}

//返回成功信息
func Success(c *gin.Context, msg string, data interface{}) {
	c.JSON(200, &Result{
		Code: SUC,
		Msg:  msg,
		Data: data,
	})
}

//返回成功信息
func SuccessDefault(c *gin.Context) {
	c.JSON(200, &Result{
		Code: SUC,
		Msg:  "",
		Data: struct{}{},
	})
}

//返回成功信息
func SuccessPage(c *gin.Context, count int64, pagesize, current int, data interface{}) {
	c.JSON(200, &PageResult{
		Code:     200,
		Total:    count,
		PageSize: pagesize,
		Current:  current,
		Data:     data,
	})
}

//返回未登录信息
func NoLogin(c *gin.Context, msg string, data interface{}) {

}
