package router

import (
	"github.com/gin-gonic/gin"
	"goboot/app/controller"
)

var routers *gin.Engine

func NewRouter() *gin.Engine {
	routers = gin.Default()

	routers.GET("/", controller.ContollerTest)

	return routers
}
