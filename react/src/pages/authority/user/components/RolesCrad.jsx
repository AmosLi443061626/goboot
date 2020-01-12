import { Drawer, Button, Tree } from 'antd';
import React from 'react';
import { getBtnAuthority } from '@/utils/authority';

const { TreeNode } = Tree;

const RolesCrad = props => {
  const { modalVisible, onSubmit: handleSave, onCancel, onCheck, dataSource, selectedData } = props;

  const renderTreeNodes = (data) => {
    return data.map(item => {
      return <TreeNode key={item.id} title={item.name} dataRef={item} />;
    })
  }

  return (
    <Drawer visible={modalVisible} onClose={() => onCancel()}>
        <Button type="primary"
          onClick={() => {
            handleSave(selectedData)
          }}
          style={{ display: getBtnAuthority(`/api/v2/auth/users/setroles`) ? "" : "none" }}>
          保存
        </Button>
      <Tree
        selectable
        checkable
        checkStrictly
        defaultExpandAll
        onCheck={(selectedKeys) => {
          onCheck(selectedKeys.checked)
        }}
        checkedKeys={selectedData}
      >
        {renderTreeNodes(dataSource)}
      </Tree>
    </Drawer>
  );
};

export default RolesCrad;
