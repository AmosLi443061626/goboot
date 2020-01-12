package auth

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"goboot/app/db/mysqldb"
	"goboot/app/model"
	"goboot/app/utils"
	"strconv"
	"time"
)

//TODO:用户管理

func UsersAdd(c *gin.Context) {
	name := c.PostForm("name")
	if 1 > len(name) {
		model.Error(c, 0, "name参数验证错误", struct{}{})
		return
	}
	pwd := c.PostForm("passwd")
	if 5 > len(pwd) {
		model.Error(c, 0, "name参数验证错误", struct{}{})
		return
	}
	alias := c.PostForm("aliasname")
	if 1 > len(alias) {
		model.Error(c, 0, "aliasname参数验证错误", struct{}{})
		return
	}
	expired := c.PostForm("expiredtime")
	if 1 > len(expired) {
		model.Error(c, 0, "expiredtime参数验证错误", struct{}{})
		return
	}
	expiredtime, err := utils.StringToTimeMD(expired)
	if err != nil {
		model.Error(c, 0, "expiredtime参数验证错误", struct{}{})
		return
	}
	phone := c.PostForm("phone")
	if 1 > len(phone) {
		model.Error(c, 0, "phone参数验证错误", struct{}{})
		return
	}

	value := &model.Users{
		Username:    name,
		AliasName:   alias,
		Passwd:      pwd,
		Phone:       phone,
		CreateTime:  time.Now(),
		ExpiredTime: expiredtime,
	}
	fmt.Println(time.Now(), expiredtime)
	err = mysqldb.GetDB().Create(value).Error
	if err != nil {
		model.Error(c, 0, "写入失败,请确认是否已经写入", "")
		return
	}
	model.SuccessDefault(c)
}

func UserFindPage(c *gin.Context) {
	current := c.DefaultQuery("current", "1")
	currentInt, err := strconv.Atoi(current)
	if err != nil {
		model.Error(c, 0, "参数验证错误", struct{}{})
		return
	}

	pageSize := c.DefaultQuery("pageSize", "15")
	pageSizeInt, err := strconv.Atoi(pageSize)
	if err != nil {
		model.Error(c, 0, "参数验证错误", struct{}{})
		return
	}
	if pageSizeInt > 100 {
		pageSizeInt = 100
	}
	name := c.Query("username")
	query := mysqldb.GetDB().Model(&model.Users{})
	if len(name) > 0 {
		query = query.Where("username=?", name)
	}
	alias := c.Query("alias_name")
	if len(alias) > 0 {
		query = query.Where("alias_name=?", alias)
	}
	var count int64
	query.Count(&count)
	var roles []model.Users
	query.Offset((currentInt - 1) * pageSizeInt).Limit(pageSizeInt).Find(&roles)
	model.SuccessPage(c, count, pageSizeInt, currentInt, roles)
}

func UserRolesSelect(c *gin.Context) {
	var values model.UsersRoles
	err := mysqldb.GetDB().Model(model.UsersRoles{}).Where("user_id = ?", c.Query("userid")).FirstOrInit(&values).Error
	if err != nil {
		model.Error(c, 0, "查询失败", "")
		return
	}
	model.Success(c, "", values)
}

func UserAddRoles(c *gin.Context) {
	rids := c.PostForm("role_ids")
	userId := c.PostForm("userid")
	if "" == userId {
		model.Error(c, 0, "参数验证错误", struct{}{})
		return
	}
	userIdInt, err := strconv.Atoi(userId)
	if err != nil {
		model.Error(c, 0, "参数验证错误", struct{}{})
		return
	}
	value := &model.UsersRoles{
		UserId:   userIdInt,
		RolesIds: rids,
	}
	var count int64
	query := mysqldb.GetDB().Model(model.UsersRoles{}).Where("user_id = ?", userIdInt)
	query.Count(&count)
	if count > 0 {
		err = query.Update("roles_ids", rids).Error
	} else {
		err = mysqldb.GetDB().Create(value).Error
	}
	if err != nil {
		model.Error(c, 0, "操作失败", "")
		return
	}
	model.SuccessDefault(c)
}
