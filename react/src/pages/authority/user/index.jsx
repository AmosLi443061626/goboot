import { Divider, Tag, Button, message, Modal, Form, Input } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from 'dva';
import CreateForm from './components/CreateForm';
import RolesCrad from './components/RolesCrad';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { fakeFind } from './service';
import moment from 'moment';
import { getBtnAuthority } from '@/utils/authority';
const FormItem = Form.Item;

class Roles extends React.Component {
  state = {
    createModalVisible: false,
    //新建层显示
    handleModalVisible: b => {
      this.setState({
        createModalVisible: b,
      });
    },
    rolesModalVisible: false, //配置菜单层显示
    handleRolesModalVisible: (b) => {
      this.setState(
        {
          rolesModalVisible: b
        }
      )
    },
    pwdModalVisible: false,//修改密码
    roleData: [], //角色数据
    roleSedDta: [], //角色选中数据
    sedUserId: 0, //配置角色的用户id
  };

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
      type: 'authorityUsers/findRoles',
      callback: (response) => {
        this.setState({
          roleData: response.data
        })
      }
    });
  }



  handleGetRoles = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'authorityUsers/findbyUserid',
      payload: { userid: id },
      callback: (response) => {
        this.setState({
          sedUserId: id,
          rolesModalVisible: true,
          roleSedDta: response.data.roles_ids == '' ? [] : response.data.roles_ids.split(','),
        })
      }
    });
  }

  handleSetRole = (param) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'authorityUsers/uproles',
      payload: {
        userid: this.state.sedUserId,
        role_ids: param.join(),
      },
    });
  }

  handleSetPwd = (param) => {
    const { dispatch,form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      dispatch({
        type: 'authorityUsers/upPwd',
        payload: {
          userid: this.state.sedUserId,
          ...fieldsValue
        },
      });
      this.setState({
        pwdModalVisible: false
      })
    }); 
  }

  render() {
    const { form } = this.props;
    const handleAdd = param => {
      const { dispatch } = this.props;
      dispatch({
        type: 'authorityUsers/submitForm',
        payload: param,
      });
      this.state.handleModalVisible(false);
      setTimeout(() => {
        this.protableRef.current.reload();
      }, 1500);
    };

    const columns = [
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
        title: '登录名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '别名',
        dataIndex: 'alias_name',
        key: 'alias_name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        hideInSearch: true,
        render: (text, record) => (
          <a>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</a>
        ),
      },
      {
        title: '过期时间',
        dataIndex: 'expired_time',
        key: 'expired_time',
        hideInSearch: true,
        render: (text, record) => (
          <a>{moment(text).format('YYYY-MM-DD')}</a>
        ),
      },
      {
        title: '操作',
        key: 'action',
        hideInSearch: true,
        render: (text, record) => (
          <span>
            {/* <a onClick={() => message.info(text.id)}>配置菜单</a>  */}
            <Button loading={this.props.submitting} onClick={() => {
              this.handleGetRoles(text.id)
            }} style={{ display: getBtnAuthority(`/api/v2/auth/users/getroles`) ? "" : "none" }}>配置角色</Button>
            <Divider type="vertical" />
            <Button loading={this.props.submitting} onClick={() => {
              this.setState({
                sedUserId: text.id,
                pwdModalVisible: true,
              })
            }} style={{ display: getBtnAuthority(`/api/v2/auth/pwd/change`) ? "" : "none" }}>修改密码</Button>
          </span>
        ),
      },
    ];

    return (
      <PageHeaderWrapper>
        <ProTable
          headerTitle=""
          actionRef={this.protableRef}
          rowKey="id"
          toolBarRender={(action, { selectedRows }) => [
            <Button icon="plus" type="primary" onClick={() => this.state.handleModalVisible(true)}
              style={{ display: getBtnAuthority(`/api/v2/auth/users/add`) ? "" : "none" }}>
              新建
            </Button>,
          ]}
          pagination={{
            showSizeChanger: true,
          }}
          options={{
            setting: false,
            reload: true,
          }}
          columns={columns} //rowSelection={{}}
          onRequestError={() => message.error('加载失败,请重试')}
          request={param => fakeFind(param)}
        />
        <CreateForm
          onSubmit={param => {
            handleAdd(param);
          }}
          onCancel={() => this.state.handleModalVisible(false)}
          modalVisible={this.state.createModalVisible}
        />
        <RolesCrad
          dataSource={this.state.roleData}
          selectedData={this.state.roleSedDta}
          onSubmit={(param) => {
            this.handleSetRole(param)
            this.state.handleRolesModalVisible(false)
          }}
          onCheck={(param) => {
            this.setState({
              roleSedDta: param
            })
          }}
          onCancel={() => this.state.handleRolesModalVisible(false)}
          modalVisible={this.state.rolesModalVisible}
        />
        <Modal
          destroyOnClose
          title="修改密码"
          visible={this.state.pwdModalVisible}
          onOk={this.handleSetPwd}
          onCancel={() => {
            this.setState({
              pwdModalVisible: false
            })
          }}
        >
          <FormItem
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 15,
            }}
            label="密码"
          >
            {form.getFieldDecorator('pwd', {
              rules: [
                {
                  required: true,
                  message: '请输入至少6位密码',
                  min: 6,
                },
              ],
            })(<Input placeholder="请输入" />)}
          </FormItem>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(connect(({ loading }) => ({
  submitting: loading.models.authorityUsers,
}))(Roles));
