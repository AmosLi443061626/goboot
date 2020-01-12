package router

import (
	"github.com/gin-gonic/gin"
	"goboot/app/controller"
	"goboot/app/controller/auth"
	"goboot/app/controller/login"
	"goboot/app/router/middleware"
	"goboot/app/tools"
)

var routers *gin.Engine

func NewRouter() *gin.Engine {
	routers = gin.Default()
	if tools.CONFIG.General.ENV == "Release" {
		gin.SetMode(gin.ReleaseMode)
	}

	routers.GET("/", controller.ContollerTest)
	authRouter()
	loginsRouter()
	return routers
}

func authRouter() {
	r := routers.Group("/api/v2/auth")
	r.Use(middleware.AuthRequired())
	{
		r.POST("/organization/add", auth.OrganAdd)       //权限管理-组织管理-新建
		r.POST("/organization/update", auth.OrganUpdate) //权限管理-组织管理-修改
		r.POST("/organization/delete", auth.OrganDelete) //权限管理-组织管理-删除
		r.GET("/organization/find", auth.OrganSelect)    //权限管理-组织管理-列表

		r.POST("/roles/add", auth.RolesAdd)           //权限管理-角色管理-新建
		r.GET("/roles/find", auth.RolesFindPage)      //权限管理-角色管理-列表
		r.POST("/roles/setmenu", auth.RolesAddMenu)   //权限管理-角色管理-配置菜单保存
		r.GET("/roles/getmenu", auth.RolesMenuSelect) //权限管理-角色管理-获取已配置的菜单

		r.POST("/users/add", auth.UsersAdd)            //权限管理-用户管理-新建
		r.GET("/users/find", auth.UserFindPage)        //权限管理-用户管理-列表
		r.GET("/roles/findall", auth.RolesSelect)      //权限管理-用户管理-获取角色所有数据
		r.GET("/users/getroles", auth.UserRolesSelect) //权限管理-用户管理-获取已经配置的角色
		r.POST("/users/setroles", auth.UserAddRoles)   //权限管理-用户管理-配置角色保存

		r.POST("/menus/add", auth.MenusAdd)       //权限管理-菜单管理-新建
		r.GET("/menus/find", auth.MenusSelect)    //权限管理-菜单管理-列表
		r.POST("/menus/delete", auth.MenusDelete) //权限管理-菜单管理-删除
		r.POST("/menus/update", auth.MenusUpdate) //权限管理-菜单管理-修改
	}

	r.POST("/pwd/change", login.LoginChangePwd)

	r1 := routers.Group("/api/v2/roles")
	r1.Use(middleware.AuthRequired())
	r1.GET("/user/get", auth.GetUserRoles)  //获取用户权限-不验证权限
}

func loginsRouter() {
	r := routers.Group("/api/v1/logins")
	r.POST("/glogin", login.LoginUser) //登录
}
