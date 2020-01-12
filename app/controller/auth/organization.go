package auth

import (
	"github.com/gin-gonic/gin"
	"goboot/app/db/mysqldb"
	"goboot/app/model"
	"strconv"
)

//TODO: 组织管理

func OrganAdd(c *gin.Context) {
	name := c.PostForm("name")
	parentId := c.PostForm("select_id")
	if "" == name {
		model.Error(c, 0, "参数验证错误", struct{}{})
		return
	}
	vParentId, err := strconv.Atoi(parentId)
	if err != nil {
		model.Error(c, 0, "参数验证错误", struct{}{})
		return
	}
	value := &model.Organization{
		Name:     name,
		ParentId: vParentId,
	}
	err = mysqldb.GetDB().Create(value).Error
	if err != nil {
		model.Error(c, 0, "写入失败", "")
		return
	}
	model.SuccessDefault(c)
}

func OrganDelete(c *gin.Context) {
	id := c.PostForm("select_id")
	vid, err := strconv.Atoi(id)
	if err != nil {
		model.Error(c, 0, "参数验证错误", struct{}{})
		return
	}
	var count int64
	err = mysqldb.GetDB().Model(model.Organization{}).Where(" parent_id = ?", vid).Count(&count).Error
	if err != nil || count > 0 {
		model.Error(c, 1, "删除失败,请确认是否存在下级组织", struct{}{})
		return
	}
	err = mysqldb.GetDB().Where(" id = ?", vid).Delete(model.Organization{}).Error
	if err != nil {
		model.Error(c, 0, "删除失败", struct{}{})
		return
	}
	model.SuccessDefault(c)
}

func OrganUpdate(c *gin.Context) {
	id := c.PostForm("select_id")
	vid, err := strconv.Atoi(id)
	if err != nil {
		model.Error(c, 0, "参数验证错误", struct{}{})
		return
	}
	err = mysqldb.GetDB().Model(model.Organization{}).Where("id = ?", vid).Update("name", c.PostForm("name")).Error
	if err != nil {
		model.Error(c, 0, "修改失败", "")
		return
	}
	model.SuccessDefault(c)
}

func OrganSelect(c *gin.Context) {
	var values []*model.Organization
	err := mysqldb.GetDB().Model(model.Organization{}).Find(&values).Error
	if err != nil {
		model.Error(c, 0, "查询失败", "")
		return
	}
	model.Success(c, "", values)
}
