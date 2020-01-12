package auth

import (
	"github.com/gin-gonic/gin"
	"goboot/app/db/mysqldb"
	"goboot/app/model"
	"strconv"
)

//TODO: 菜单管理

func MenusAdd(c *gin.Context) {
	name := c.PostForm("name")
	icon := c.PostForm("icon")
	authUrl := c.PostForm("authurl")
	isButton := c.PostForm("isbutton")
	order := c.PostForm("ordernum")
	parentId := c.PostForm("select_id")
	if "" == name {
		model.Error(c, 0, "参数验证错误", struct{}{})
		return
	}
	isButtonInt, err := strconv.Atoi(isButton)
	if err != nil {
		model.Error(c, 0, "参数验证错误", struct{}{})
		return
	}
	orderInt, err := strconv.Atoi(order)
	if err != nil {
		model.Error(c, 0, "参数验证错误", struct{}{})
		return
	}
	vParentId, err := strconv.Atoi(parentId)
	if err != nil {
		model.Error(c, 0, "参数验证错误", struct{}{})
		return
	}
	value := &model.Menus{
		Name:     name,
		Icon:     icon,
		Authurl:  authUrl,
		Isbtn:    isButtonInt,
		ParentId: vParentId,
		Ordernum: orderInt,
	}
	err = mysqldb.GetDB().Create(value).Error
	if err != nil {
		model.Error(c, 0, "写入失败", "")
		return
	}
	model.SuccessDefault(c)
}

func MenusSelect(c *gin.Context) {
	var values []*model.Menus
	err := mysqldb.GetDB().Model(model.Menus{}).Order("ordernum").Find(&values).Error
	if err != nil {
		model.Error(c, 0, "查询失败", "")
		return
	}
	model.Success(c, "", values)
}

func MenusDelete(c *gin.Context) {
	id := c.PostForm("select_id")
	vid, err := strconv.Atoi(id)
	if err != nil {
		model.Error(c, 0, "参数验证错误", struct{}{})
		return
	}
	err = mysqldb.GetDB().Where(" id = ?", vid).Delete(model.Menus{}).Error
	if err != nil {
		model.Error(c, 0, "删除失败", struct{}{})
		return
	}
	model.SuccessDefault(c)
}

func MenusUpdate(c *gin.Context) {
	id := c.PostForm("select_id")
	vid, err := strconv.Atoi(id)
	if err != nil {
		model.Error(c, 0, "参数验证错误", struct{}{})
		return
	}
	err = mysqldb.GetDB().Model(model.Menus{}).
		Where("id = ?", vid).
		Updates(map[string]interface{}{
			"name":     c.PostForm("name"),
			"icon":     c.PostForm("icon"),
			"authurl":  c.PostForm("authurl"),
			"isbtn":    c.PostForm("isbutton"),
			"ordernum": c.PostForm("ordernum"),
		}).
		Error
	if err != nil {
		model.Error(c, 0, "修改失败", "")
		return
	}
	model.SuccessDefault(c)
}
