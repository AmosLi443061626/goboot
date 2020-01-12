package middleware

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/patrickmn/go-cache"
	"goboot/app/controller/auth"
	"goboot/app/controller/token"
	"goboot/app/model"
	"strconv"
	"strings"
	"time"
)

var (
	//不需要权限验证url
	NoAuth = map[string]bool{
		"/api/v2/roles/user/get": true,
	}
)

//TODO:权限验证
func AuthRequired() gin.HandlerFunc {
	return func(c *gin.Context) {
		authorization := c.GetHeader("Authorization")
		if authorization == "" {
			c.JSON(401, struct{}{})
			c.Abort()
			return
		}
		clearRoleCache(c.Request.URL.Path)
		cred := &token.UserCredentials{}
		err := cred.JWTNewDecoder(authorization)
		if err != nil {
			c.JSON(401, struct{}{})
			c.Abort()
			return
		}
		c.Keys = make(map[string]interface{}, 1)
		c.Keys["authorizationUID"] = cred.UserId
		if _, ok := NoAuth[c.Request.URL.Path]; ok {
			c.Next()
			return
		}
		if authVerification(cred.UserId, c.Request.URL.Path) {
			c.Next()
			return
		}
		c.JSON(401, struct{}{})
		c.Abort()
	}
}

//专用权限保存
var roleCache = cache.New(8*time.Minute, 10*time.Minute)

func clearRoleCache(url string) {
	if strings.Index(url, "/api/v2/auth") != -1 {
		roleCache.Flush()
	}
}

//鉴权
func authVerification(userid int, url string) bool {
	if userid == 1 {
		 return true
	}
	var menus []*model.Menus
	cmenus, ok := roleCache.Get(strconv.Itoa(userid))
	if !ok {
		var err error
		cmenus, err = auth.GetRoleById(userid)
		if err != nil {
			return false
		}
		roleCache.Set(strconv.Itoa(userid), menus, 15*time.Minute)
	}
	menus = cmenus.([]*model.Menus)
	for _, v := range menus {
		fmt.Println(v)
		if v.Authurl == url {
			return true
		}
	}
	return false
}
