import { Divider, Tag, Button, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'dva';
import CreateForm from './components/CreateForm';
import MenuCrad from './components/MenuCrad';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { fakeFind } from './service';
import { getBtnAuthority } from '@/utils/authority';


class Roles extends React.Component {
  state = {
    createModalVisible: false, //新建层显示
    handleModalVisible: (b) => {
      this.setState(
        {
          createModalVisible: b
        }
      )
    },
    menuModalVisible: false, //配置菜单层显示
    handleMenuModalVisible: (b) => {
      this.setState(
        {
          menuModalVisible: b
        }
      )
    },
    menusData: [], //菜单数据
    menusSedDta: [], //菜单选中数据
    menusRoleid: 0, //配置菜单的角色id
  }

  constructor(props) {
    super(props);
    this.protableRef = React.createRef();
  }

  componentDidMount() {
    this.initData()
  }

  initData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'authorityRoles/findMenus',
      callback: (response) => {
        this.setState({
          menusData: response.data
        })
      }
    });
  }

  handleGetRoleMenu = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'authorityRoles/findbyRoleid',
      payload: { roleid: id },
      callback: (response) => {
        this.setState({
          menusRoleid: id,
          menuModalVisible: true,
          menusSedDta: response.data.menus_ids == '' ? [] : response.data.menus_ids.split(','),
        })
      }
    });
  }

  columns = [
    {
      title: '序号',
      dataIndex: 'id',
      valueType: 'indexBorder',
    },
    {
      title: '编码',
      dataIndex: 'id',
      key: 'id',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      hideInSearch: true,
      render: (text) => (
        <span>
          {/* <a onClick={() => message.info(text.id)}>配置菜单</a>  */}
          <Button loading={this.props.submitting} onClick={() => {
            this.handleGetRoleMenu(text.id)
          }}    
          style={{ display: getBtnAuthority(`/api/v2/auth/roles/getmenu`) ? "" : "none" }}>配置菜单</Button>
        </span>
      ),
    },
  ];


  render() {
    const handleAdd = (param) => {
      const { dispatch } = this.props;
      dispatch({
        type: 'authorityRoles/submitForm',
        payload: param,
      });
      this.state.handleModalVisible(false)
      setTimeout(() => {
        this.protableRef.current.reload()
      }, 1500);
    }
    const handleSetMenu = (param) => {
      const { dispatch } = this.props;
      dispatch({
        type: 'authorityRoles/upmenus',
        payload: {
          roleid: this.state.menusRoleid,
          menus_ids: param.join(),
        },
      });
    }
    return (
      <PageHeaderWrapper>
        <ProTable
          headerTitle=""
          actionRef={this.protableRef}
          rowKey="id"
          toolBarRender={(action, { selectedRows }) => [
            <Button icon="plus" type="primary" onClick={() => this.state.handleModalVisible(true)}  
            style={{ display: getBtnAuthority(`/api/v2/auth/roles/add`) ? "" : "none" }}>
              新建
          </Button>
            ,
          ]}
          pagination={{
            showSizeChanger: true,
          }}
          options={{ setting: false, reload: true }}
          columns={this.columns}
          //rowSelection={{}}
          onRequestError={() => message.error('加载失败,请重试')}
          request={param => fakeFind(param)}
        />
        <CreateForm
          onSubmit={(param) => {
            handleAdd(param)
          }}
          onCancel={() => this.state.handleModalVisible(false)}
          modalVisible={this.state.createModalVisible}
        />
        <MenuCrad
          menusData={this.state.menusData}
          selectedData={this.state.menusSedDta}
          onSubmit={(param) => {
            handleSetMenu(param)
            this.state.handleMenuModalVisible(false)
          }}
          onCheck={(param) => {
            this.setState({
              menusSedDta: param
            })
          }}
          onCancel={() => this.state.handleMenuModalVisible(false)}
          modalVisible={this.state.menuModalVisible}
        />
      </PageHeaderWrapper>
    )
  }
}

export default (connect(({ loading }) => ({
  submitting: loading.models.authorityRoles,
}))(Roles));
