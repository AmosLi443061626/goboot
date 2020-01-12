package model

import (
	"time"
)

type Organization struct {
	Id       int    `gorm:"id" json:"id"`
	Name     string `gorm:"name" json:"name"`           // 部门名称
	ParentId int    `gorm:"parent_id" json:"parent_id"` // 上一级组织名称
}

func (*Organization) TableName() string {
	return "organization"
}

type Roles struct {
	Id   int    `gorm:"id" json:"id"`
	Name string `gorm:"name" json:"name"` // 角色名称
}

func (*Roles) TableName() string {
	return "roles"
}

type Users struct {
	Id          int       `gorm:"id" json:"id"`
	Username    string    `gorm:"username" json:"username"`         // 用户名
	Passwd      string    `gorm:"passwd" json:"-"`                  // 密码
	AliasName   string    `gorm:"alias_name" json:"alias_name"`     // 别名
	Phone       string    `gorm:"phone" json:"phone"`               // 联系电话
	CreateTime  time.Time `gorm:"create_time" json:"create_time"`   // 创建时间
	ExpiredTime time.Time `gorm:"expired_time" json:"expired_time"` // 过期时间
}

func (*Users) TableName() string {
	return "users"
}

type Menus struct {
	Id       int    `gorm:"id" json:"id"`
	Name     string `gorm:"name" json:"name"`           // 菜单名称
	Icon     string `gorm:"icon" json:"icon"`           // 菜单图标
	Authurl  string `gorm:"authurl" json:"authurl"`     // 鉴权url/鉴权标签
	Isbtn    int    `gorm:"isbtn" json:"isbtn"`         // 是否是按钮(功能) 0菜单  1按钮
	ParentId int    `gorm:"parent_id" json:"parent_id"` // 上级菜单id
	Ordernum int    `gorm:"ordernum" json:"ordernum"`   // 排序数字
}

func (*Menus) TableName() string {
	return "menus"
}

type RolesMenus struct {
	Id       int    `gorm:"id" json:"id"`
	MenusIds string `gorm:"menus_id" json:"menus_ids"` // 菜单id,逗号分隔
	RolesId  int    `gorm:"roles_id" json:"roles_id"`  // 角色id
}

func (*RolesMenus) TableName() string {
	return "roles_menus"
}

type UsersRoles struct {
	Id       int    `gorm:"id" json:"id"`
	UserId   int    `gorm:"user_id" json:"-"`           // 用户id
	RolesIds string `gorm:"roles_ids" json:"roles_ids"` // 角色id,逗号分隔
}

func (*UsersRoles) TableName() string {
	return "users_roles"
}
