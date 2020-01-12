package auth

import (
	"github.com/gin-gonic/gin"
	"goboot/app/db/mysqldb"
	"goboot/app/model"
	"strings"
)

func GetUserRoles(c *gin.Context) {
	uid, ok := c.Keys["authorizationUID"]
	m := make([]*model.Menus,0)
	if !ok {
		model.Success(c, "", m)
		return
	}
	m, err := GetRoleById(uid.(int))
	if err != nil {
	}
	model.Success(c, "", m)
}

//获取权限根据用户
func GetRoleById(userid int) ([]*model.Menus, error) {
	if userid == 1 {
		return getMenusAll()
	}
	m := make([]*model.Menus,0)
	mdb := mysqldb.GetDB()
	var roles string
	err := mdb.Model(&model.UsersRoles{}).Select("roles_ids").Where("user_id = ?", userid).Row().Scan(&roles)
	if err != nil || roles == "" {
		return m, err
	}
	rolesIds := strings.Split(roles, ",")
	var menuFind []*model.RolesMenus
	err = mdb.Model(&model.RolesMenus{}).Select("menus_ids").Where("roles_id in (?)", rolesIds).Find(&menuFind).Error
	if err != nil || len(menuFind) == 0{
		return m, err
	}
	var sBuild strings.Builder
	for i := 0; i < len(menuFind); i++ {
		if i > 0 {
			sBuild.WriteString(",")
		}
		sBuild.WriteString(menuFind[i].MenusIds)
	}

	err = mdb.Model(&model.RolesMenus{}).Where("id in (?)", strings.Split(sBuild.String(), ",")).Order("ordernum").Find(&m).Error
	if err != nil {
		return m, err
	}
	return m, err
}

func getMenusAll() ([]*model.Menus, error) {
	var values []*model.Menus
	err := mysqldb.GetDB().Model(model.Menus{}).Order("ordernum").Find(&values).Error
	return values, err
}
