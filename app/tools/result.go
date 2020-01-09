package tools

import (
	"github.com/gin-gonic/gin"
	"goboot/app/model"
)

//返回错误信息
func Error(c *gin.Context, msg string, data interface{}) {
	c.JSON(200, &model.Result{
		Code: 500,
		Msg:  msg,
		Data: data,
	})
}

//返回成功信息
func Success(c *gin.Context, msg string, data interface{}) {
	c.JSON(200, &model.Result{
		Code: 200,
		Msg:  msg,
		Data: data,
	})
}

//返回未登录信息
func NoLogin(c *gin.Context, msg string, data interface{}) {

}
