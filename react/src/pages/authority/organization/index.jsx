import { Tree, Card, Modal, Button, Form, Input, Popconfirm } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { getBtnAuthority } from '@/utils/authority';

const { TreeNode, DirectoryTree } = Tree;
const FormItem = Form.Item;

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
            type: 'authorityAndorganization/find',
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

    render() {
        const { dispatch } = this.props;
        const closeModal = () => {
            this.setState({ visible: false })
            this.find()
        }
        const onSelect = (keys) => {
            this.state.selectd = keys[0]
        }
        const onDelete = () => {
            dispatch({
                type: 'authorityAndorganization/delete',
                payload: { select_id: this.state.selectd },
                callback: () => {
                    this.find()
                }
            });
        }

        const recursiveTree = (ary, v) => {
            let rec = ary.filter(item => item.parent_id == v.id)
            return (
                <TreeNode title={`${v.name}(${rec.length})`} key={v.id}>
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
                    <Button icon="plus" type="primary" onClick={() => this.setState({ visible: true, clickStatus: 0 })} style={{ display: getBtnAuthority(`/api/v2/auth/organization/add`) ? "" : "none" }}>新建</Button>
                    <Button icon="edit" type="primary" onClick={() => this.setState({ visible: true, clickStatus: 1 })} style={{ marginLeft: '20px', display: getBtnAuthority(`/api/v2/auth/organization/update`) ? "" : "none" }} >修改</Button>
                    <Popconfirm title="是否确定删除?" onConfirm={onDelete}><Button icon="delete" type="primary" style={{ marginLeft: '20px', display: getBtnAuthority(`/api/v2/auth/organization/delete`) ? "" : "none" }}>删除</Button></Popconfirm>
                    <br />
                    <DirectoryTree multiple defaultExpandAll onSelect={onSelect}>
                        <TreeNode title={`组织管理(${this.state.orans.length})`} key="0">
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
                    type: state.clickStatus == 0 ? 'authorityAndorganization/submitForm' : 'authorityAndorganization/update',
                    payload: { select_id: state.selectd, ...values },
                });
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
            <FormItem {...formItemLayout} label="组织名称">
                {getFieldDecorator('name', {
                    rules: [
                        {
                            required: true,
                            message: '请输入组织名称',
                        },
                    ],
                })(<Input placeholder="请输入组织名称" />)}
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
        submitting: loading.effects['authorityAndorganization/submitForm'],
    }))(OrganizationIndex),
);