package controller

import (
	"github.com/gin-gonic/gin"
	"goboot/app/tools"
)

func ContollerTest(c *gin.Context) {
	tools.Error(c, "失败了", nil)
}

func ContollerGet(c *gin.Context) {
	tools.Success(c, "成功", nil)
}
