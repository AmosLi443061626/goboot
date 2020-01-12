/*
Navicat MySQL Data Transfer

Source Server         : VBOX200
Source Server Version : 50728
Source Host           : 192.168.56.200:3308
Source Database       : goboot

Target Server Type    : MYSQL
Target Server Version : 50728
File Encoding         : 65001

Date: 2020-01-13 03:36:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for menus
-- ----------------------------
DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL COMMENT '菜单名称',
  `icon` varchar(64) DEFAULT NULL COMMENT '菜单图标',
  `authurl` varchar(255) NOT NULL COMMENT '鉴权url/鉴权标签',
  `isbtn` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否是按钮(功能) 0菜单  1按钮',
  `parent_id` int(11) NOT NULL DEFAULT '0' COMMENT '上级菜单id',
  `ordernum` int(11) NOT NULL DEFAULT '0' COMMENT '排序数字',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COMMENT='菜单表';

-- ----------------------------
-- Records of menus
-- ----------------------------
INSERT INTO `menus` VALUES ('4', '权限管理', 'icon-all', '/authority', '0', '0', '2');
INSERT INTO `menus` VALUES ('5', '组织管理', 'icon-c', '/authority/organization', '0', '4', '1');
INSERT INTO `menus` VALUES ('6', '角色管理', 'icon-all', '/authority/roles', '0', '4', '4');
INSERT INTO `menus` VALUES ('8', '菜单管理', 'icon-all', '/authority/menu', '0', '4', '5');
INSERT INTO `menus` VALUES ('9', '用户管理', 'icon-all', '/authority/user', '0', '4', '6');
INSERT INTO `menus` VALUES ('10', '新增功能', 'icon-all', '/api/v2/auth/menus/add', '1', '8', '0');
INSERT INTO `menus` VALUES ('11', '修改功能', 'icon-all', '/api/v2/auth/menus/update', '1', '8', '1');
INSERT INTO `menus` VALUES ('13', '删除功能', 'icon-all', '/api/v2/auth/menus/delete', '1', '8', '2');
INSERT INTO `menus` VALUES ('14', '列表', 'icon-cc', '/api/v2/auth/organization/find', '1', '5', '0');
INSERT INTO `menus` VALUES ('15', '新增功能', 'icon-all', '/api/v2/auth/organization/add', '1', '5', '0');
INSERT INTO `menus` VALUES ('16', '修改功能', 'icon-cc', '/api/v2/auth/organization/update', '1', '5', '0');
INSERT INTO `menus` VALUES ('17', '删除功能', 'icon-cc', '/api/v2/auth/organization/delete', '1', '5', '0');
INSERT INTO `menus` VALUES ('18', '列表', 'icon-cc', '/api/v2/auth/menus/find', '1', '8', '0');
INSERT INTO `menus` VALUES ('19', '新建功能', 'icon-cc', '/api/v2/auth/users/add', '1', '9', '0');
INSERT INTO `menus` VALUES ('20', '列表', 'icon-cc', '/api/v2/auth/roles/find', '1', '6', '0');
INSERT INTO `menus` VALUES ('21', '获取已配置的菜单', 'icon-cc', '/api/v2/auth/roles/getmenu', '1', '6', '0');
INSERT INTO `menus` VALUES ('22', '配置菜单保存', 'icon-cc', '/api/v2/auth/roles/setmenu', '1', '6', '1');
INSERT INTO `menus` VALUES ('23', '新建功能', 'icon-cc', '/api/v2/auth/roles/add', '1', '6', '1');
INSERT INTO `menus` VALUES ('24', '列表', 'icon-cc', '/api/v2/auth/users/find', '1', '9', '0');
INSERT INTO `menus` VALUES ('25', '获取角色所有数据', 'icon-cc', '/api/v2/auth/roles/findall', '1', '9', '0');
INSERT INTO `menus` VALUES ('26', '获取已经配置的角色', 'icon-cc', '/api/v2/auth/users/getroles', '1', '9', '0');
INSERT INTO `menus` VALUES ('27', '配置角色保存', 'icon-cc', '/api/v2/auth/users/setroles', '1', '9', '1');
INSERT INTO `menus` VALUES ('28', '修改密码', 'icon-cc', '/api/v2/auth/pwd/change', '1', '9', '0');

-- ----------------------------
-- Table structure for organization
-- ----------------------------
DROP TABLE IF EXISTS `organization`;
CREATE TABLE `organization` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `parent_id` int(11) DEFAULT '0' COMMENT '上一级组织名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COMMENT='组织信息表';

-- ----------------------------
-- Records of organization
-- ----------------------------

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '角色名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8 COMMENT='角色表';

-- ----------------------------
-- Records of roles
-- ----------------------------

-- ----------------------------
-- Table structure for roles_menus
-- ----------------------------
DROP TABLE IF EXISTS `roles_menus`;
CREATE TABLE `roles_menus` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menus_ids` varchar(512) DEFAULT NULL COMMENT '菜单id,逗号分隔',
  `roles_id` int(11) DEFAULT NULL COMMENT '角色id',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_roles_id` (`roles_id`) COMMENT '角色唯一'
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='角色对应菜单表';

-- ----------------------------
-- Records of roles_menus
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL COMMENT '用户名',
  `passwd` varchar(255) NOT NULL COMMENT '密码',
  `alias_name` varchar(255) NOT NULL DEFAULT '' COMMENT '别名',
  `phone` varchar(24) NOT NULL COMMENT '联系电话',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `expired_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '过期时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `
unique_username` (`username`) USING BTREE COMMENT '用户名唯一'
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'admin', '1111111111', 'admin', 'undefined', '2020-01-12 13:51:56', '2020-01-12 13:51:56');
INSERT INTO `users` VALUES ('8', 'admin1', '22222222', '12', '12', '2020-01-12 13:54:45', '2020-01-12 13:54:45');
INSERT INTO `users` VALUES ('9', 'admin2', '222222', '1', 'undefined', '2020-01-12 13:54:59', '2020-01-12 13:54:59');

-- ----------------------------
-- Table structure for users_roles
-- ----------------------------
DROP TABLE IF EXISTS `users_roles`;
CREATE TABLE `users_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `roles_ids` varchar(512) NOT NULL COMMENT '角色id,逗号分隔',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_id` (`user_id`) USING BTREE COMMENT '用户唯一'
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='用户角色对应表';

-- ----------------------------
-- Records of users_roles
-- ----------------------------
