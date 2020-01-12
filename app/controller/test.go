package controller

import (
	"github.com/gin-gonic/gin"
	"goboot/app/model"
)

func ContollerTest(c *gin.Context) {
	model.Error(c, 0, "失败了", nil)
}

func ContollerGet(c *gin.Context) {
	model.Success(c, "成功", nil)
}
