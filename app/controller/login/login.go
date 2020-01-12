package login

import (
	"github.com/gin-gonic/gin"
	"goboot/app/controller/token"
	"goboot/app/db/mysqldb"
	"goboot/app/model"
	"strconv"
	"time"
)

//TODO: 登录管理

//用户登录
func LoginUser(c *gin.Context) {
	username := c.PostForm("user")
	pwd := c.PostForm("pwd")
	var user model.Users
	err := mysqldb.GetDB().Where("username =? ", username).First(&user).Error
	if err != nil {
		model.Error(c, 1, "用户名密码错误", struct{}{})
		return
	}
	if user.ExpiredTime.After(time.Now()) {
		model.Error(c, 2, "用户名已过期", struct{}{})
		return
	}
	if pwd != user.Passwd {
		model.Error(c, 3, "用户名密码错误", struct{}{})
		return
	}
	cred := &token.UserCredentials{
		Username: username,
		UserId:   user.Id,
	}
	model.Success(c, "", cred.JWT())
}

func LoginChangePwd(c *gin.Context) {
	userId := c.PostForm("userid")
	if "" == userId {
		model.Error(c, 0, "参数验证错误", struct{}{})
		return
	}
	userIdInt, err := strconv.Atoi(userId)
	if err != nil {
		model.Error(c, 1, "参数验证错误", struct{}{})
		return
	}
	err = mysqldb.GetDB().Model(model.Users{}).
		Where("id = ?", userIdInt).
		Updates(map[string]interface{}{
			"passwd": c.PostForm("pwd"),
		}).
		Error
	if err != nil {
		model.Error(c, 0, "修改失败", "")
		return
	}
	model.SuccessDefault(c)
}
