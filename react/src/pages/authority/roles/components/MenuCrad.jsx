import { Drawer, Button, Tree } from 'antd';
import React, { useState } from 'react';
import { getBtnAuthority } from '@/utils/authority';

const { TreeNode } = Tree;

const MenuCrad = props => {
  const { modalVisible, onSubmit: handleSave, onCancel, onCheck, menusData, selectedData } = props;

  const renderTreeNodes = (data, v) => {
    return data.filter(f => f.parent_id == v).map(item => {
      let rec = data.filter(v => v.parent_id == item.id)
      if (rec.length > 0) {
        return (
          <TreeNode title={item.name} key={item.id} dataRef={item}>
            {renderTreeNodes(data, item.id)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.id} title={item.name} dataRef={item} />;
    })
  }

  return (
    <Drawer visible={modalVisible} onClose={() => onCancel()}>
      <Button type="primary"
        onClick={() => {
          handleSave(selectedData)
        }}
        style={{ display: getBtnAuthority(`/api/v2/auth/roles/setmenu`) ? "" : "none" }}>
        保存
        </Button>
      <Tree
        selectable
        checkable
        checkStrictly
        // defaultExpandAll
        onCheck={(selectedKeys) => {
          onCheck(selectedKeys.checked)
        }}
        checkedKeys={selectedData}
      >
        {renderTreeNodes(menusData, 0)}
      </Tree>
    </Drawer>
  );
};

export default MenuCrad;
