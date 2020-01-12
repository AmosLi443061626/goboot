package auth

import (
	"github.com/gin-gonic/gin"
	"goboot/app/db/mysqldb"
	"goboot/app/model"
	"strconv"
)

//TODO:角色管理

func RolesAdd(c *gin.Context) {
	name := c.PostForm("name")
	if "" == name {
		model.Error(c, 0, "参数验证错误", struct{}{})
		return
	}
	value := &model.Roles{
		Name: name,
	}
	err := mysqldb.GetDB().Create(value).Error
	if err != nil {
		model.Error(c, 0, "写入失败", "")
		return
	}
	model.SuccessDefault(c)
}

func RolesFindPage(c *gin.Context) {
	current := c.DefaultQuery("current", "1")
	currentInt, err := strconv.Atoi(current)
	if err != nil {
		model.Error(c, 0, "参数验证错误", struct{}{})
		return
	}
	if err != nil {
		model.Error(c, 0, "参数验证错误", struct{}{})
		return
	}
	if err != nil {
		model.Error(c, 0, "参数验证错误", struct{}{})
		return
	}
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
	id := c.Query("id")
	name := c.Query("name")
	query := mysqldb.GetDB().Model(&model.Roles{})
	if len(id) > 0 {
		idInt, err := strconv.Atoi(id)
		if err != nil {
			model.Error(c, 0, "参数验证错误", struct{}{})
			return
		}
		query = query.Where("id=?", idInt)
	}
	if len(name) > 0 {
		query = query.Where("name=?", name)
	}
	var count int64
	query.Count(&count)
	var roles []model.Roles
	query.Offset((currentInt - 1) * pageSizeInt).Limit(pageSizeInt).Find(&roles)
	model.SuccessPage(c, count, pageSizeInt, currentInt, roles)
}

func RolesAddMenu(c *gin.Context) {
	mids := c.PostForm("menus_ids")
	roleId := c.PostForm("roleid")
	if "" == roleId {
		model.Error(c, 0, "参数验证错误", struct{}{})
		return
	}
	roleIdInt, err := strconv.Atoi(roleId)
	if err != nil {
		model.Error(c, 0, "参数验证错误", struct{}{})
		return
	}
	value := &model.RolesMenus{
		RolesId:  roleIdInt,
		MenusIds: mids,
	}
	var count int64
	query := mysqldb.GetDB().Model(model.RolesMenus{}).Where("roles_id = ?", roleIdInt)
	query.Count(&count)
	if count > 0 {
		err = query.Update("menus_ids", mids).Error
	} else {
		err = mysqldb.GetDB().Create(value).Error
	}
	if err != nil {
		model.Error(c, 0, "操作失败", "")
		return
	}
	model.SuccessDefault(c)
}

func RolesMenuSelect(c *gin.Context) {
	var values model.RolesMenus
	err := mysqldb.GetDB().Model(model.RolesMenus{}).Where("roles_id = ?", c.Query("roleid")).FirstOrInit(&values).Error
	if err != nil {
		model.Error(c, 0, "查询失败", "")
		return
	}
	model.Success(c, "", values)
}

func RolesSelect(c *gin.Context) {
	var values []*model.Roles
	err := mysqldb.GetDB().Model(model.Roles{}).Find(&values).Error
	if err != nil {
		model.Error(c, 0, "查询失败", "")
		return
	}
	model.Success(c, "", values)
}
