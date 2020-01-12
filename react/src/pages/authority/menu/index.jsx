import { Tree, Card, Modal, Button, Form, Input, Popconfirm, Select, message } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { getBtnAuthority } from '@/utils/authority';

const { TreeNode, DirectoryTree } = Tree;
const FormItem = Form.Item;
const { Option } = Select;

class OrganizationIndex extends React.Component {
    state = {
        visible: false, //弹出层
        clickStatus: 0, //0: 新增 1:修改
        selectd: 0, //tree选中key
        orans: [] //组织管理数据
    };

    find = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'authorityMenu/find',
            callback: (response) => {
                this.setState({
                    orans: response.data
                })
            }
        });
    }

    componentDidMount() {
        this.find()
    }


    hanldeUpdate = () => {
        const { form: { setFieldsValue, getFieldValue } } = this.props;
        var ary = this.state.orans.filter(item => item.id == this.state.selectd)
        if (ary.length == 0) {
            message.info("请选择一项")
            return
        }
        setFieldsValue({
            'name': ary[0].name,
            'icon': ary[0].icon,
            'authurl': ary[0].authurl,
            'isbutton': '' + ary[0].isbtn,
            'ordernum': ary[0].ordernum
        })
        this.setState({ visible: true, clickStatus: 1 })
    }

    render() {
        const { dispatch, form: { setFieldValue } } = this.props;

        const closeModal = () => {
            this.setState({ visible: false })
            setTimeout(() => {
                this.find()
            }, 1500);
        }
        const onSelect = (keys) => {
            this.state.selectd = keys[0]
        }
        const onDelete = () => {
            dispatch({
                type: 'authorityMenu/delete',
                payload: { select_id: this.state.selectd },
                callback: () => {
                    this.find()
                }
            });
        }

        const recursiveTree = (ary, v) => {
            let rec = ary.filter(item => item.parent_id == v.id)
            return (
                <TreeNode title={`${v.name}(${rec.length})`} key={v.id} isLeaf={v.isbtn == 1}>
                    {
                        rec.map((item) => {
                            return recursiveTree(ary, item)
                        })
                    }
                </TreeNode>
            )
        }


        return (
            <PageHeaderWrapper>
                <Card>
                    <Button icon="plus" type="primary" onClick={() => this.setState({ visible: true, clickStatus: 0 })}  style={{ display: getBtnAuthority(`/api/v2/auth/menus/add`) ? "" : "none" }}>新建</Button>
                    <Button icon="edit" type="primary" onClick={() => this.hanldeUpdate()} style={{ marginLeft: '20px', display: getBtnAuthority(`/api/v2/auth/menus/update`) ? "" : "none" }}>修改</Button>
                    <Popconfirm title="是否确定删除?" onConfirm={onDelete}><Button icon="delete" type="primary" style={{ marginLeft: '20px', display: getBtnAuthority(`/api/v2/auth/menus/delete`) ? "" : "none" }}>删除</Button></Popconfirm>
                    <br />
                    <DirectoryTree multiple defaultExpandAll onSelect={onSelect}>
                        <TreeNode title={`菜单管理(${this.state.orans.length})`} key="0">
                            {
                                this.state.orans.filter(item => item.parent_id == 0).map((v) => {
                                    return (
                                        recursiveTree(this.state.orans, v)
                                    );
                                })
                            }
                        </TreeNode>
                    </DirectoryTree>
                </Card>
                <Modal
                    visible={this.state.visible}
                    onCancel={() => closeModal()}
                    footer={null}
                >
                    {FormItems(this.props, closeModal, this.state)}
                </Modal>
            </PageHeaderWrapper>)
    }
}

const FormItems = (props, closeModal, state) => {
    const {
        form: { getFieldDecorator }, submitting
    } = props;
    const handleSubmit = e => {
        const { dispatch, form } = props;
        e.preventDefault();
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch({
                    type: state.clickStatus == 0 ? 'authorityMenu/submitForm' : 'authorityMenu/update',
                    payload: { select_id: state.selectd, ...values },
                });
                form.resetFields()
                closeModal()
            }
        });
    };
    const resetFields = () => {
        const { form } = props;
        form.resetFields()
    }
    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 7,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 12,
            },
            md: {
                span: 10,
            },
        },
    };
    const submitFormLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 10,
                offset: 7,
            },
        },
    };
    return (
        <Form
            onSubmit={handleSubmit}
            hideRequiredMark
            style={{
                marginTop: 8,
            }}
        >
            <FormItem {...formItemLayout} label="菜单名称">
                {getFieldDecorator('name', {
                    rules: [
                        {
                            required: true,
                            message: '请输入菜单名称',
                        },
                    ],
                })(<Input placeholder="请输入菜单名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="ICON图标">
                {getFieldDecorator('icon', {
                    rules: [
                        {
                            required: true,
                            message: '请输入iconfont图标',
                        },
                    ],
                })(<Input placeholder="请输入iconfont图标" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="鉴权标签">
                {getFieldDecorator('authurl', {
                    rules: [
                        {
                            required: true,
                            message: '请输入鉴权url',
                        },
                    ],
                })(<Input placeholder="鉴权url" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="功能">
                {getFieldDecorator('isbutton', {
                    initialValue: '0'
                })(<Select>
                    <Option value="0">菜单</Option>
                    <Option value="1">功能</Option>
                </Select>)}
            </FormItem>
            <FormItem {...formItemLayout} label="排序">
                {getFieldDecorator('ordernum')(<Input placeholder="越小越靠前" />)}
            </FormItem>
            <FormItem
                {...submitFormLayout}
            >
                <Button type="primary" htmlType="submit" loading={submitting}>
                    提交
              </Button>
                <Button
                    style={{
                        marginLeft: 8,
                    }}
                    onClick={() => {
                        resetFields()
                        closeModal()
                    }}
                >
                    关闭
              </Button>
            </FormItem>
        </Form>
    )
}

export default Form.create()(
    connect(({ loading }) => ({
        submitting: loading.effects['authorityMenu/submitForm'],
    }))(OrganizationIndex),
);