import * as React from 'react';
import { Modal, Form, Input, Button, Alert, Spin, Table, message, Radio } from 'antd';
import {FormComponentProps, FormCreateOption} from 'antd/lib/form';
import {formItemLayout} from "../Config";
import {DVAPageProp, PageUtil} from "lib/SysModel";
import {ColumnProps} from "antd/lib/table";
import {PaginationProps} from "antd/lib/pagination";
import {OrgUser, OrgContentInterface} from '../interface/OrgContentInterface';
import {connect} from 'dva';
const FormItem = Form.Item;

const columns: ColumnProps<any>[] = [
    {title: 'SSO账号', dataIndex: 'loginId', key: 'loginId', width: 100},
    {title: '姓名', dataIndex: 'lastName', key: 'lastName', width: 100},
    {title: '职务', dataIndex: 'jobTitles', key: 'jobTitles', width: 150},
    {title: '手机号码', dataIndex: 'mobile', key: 'mobile', width: 80},
    {title: '一级部门', dataIndex: 'subcompanyName', key: 'subcompanyName', width: 50},
    {title: '二级部门', dataIndex: 'departmentName', key: 'departmentName', width: 50},
    {title: '级别', dataIndex: 'orgLevel', key: 'orgLevel', width: 50},
]

let postId: number[] = [];

interface addUserState {
    loading: boolean,
    pagination: PaginationProps,
    search: searchSsoUserRequest,
    dataList: OrgUser[],
    selectedRowKeys: string[],
    errMsg: string,
    isLoading: boolean
    listLoading: boolean,
    ruleVisible: boolean,
    userLevel: number
}

interface addUserOtherProps extends FormComponentProps{
}

export interface searchSsoUserRequest extends PageUtil{
    loginId: string
    lastName: string
}

export interface saveOrgUserRequest {
    orgId: number,
    id: number,
    userLevel: number
}

export interface deleteOrgUserRequest {
    orgId: number,
    id: number
}

interface addUserProps extends DVAPageProp {
    OrgContentModel: OrgContentInterface;
};

class ModelFrom extends React.PureComponent<addUserProps & addUserOtherProps, addUserState> {

    constructor(props: addUserProps & addUserOtherProps) {
        super(props)
        this.state = {
            loading: false,
            search: {
                loginId: '',
                lastName: '',
                pageNo: 1,
                pageSize: 20
            },
            selectedRowKeys: [],
            isLoading: false,
            listLoading: false,
            ruleVisible: false,
            errMsg: '',
            pagination: {
                current: 1,
                total: 0,
                pageSize: 20
            },
            dataList: new Array<OrgUser>(),
            userLevel: 2
        }
    };

    onChangeUserLevel = (e: any) => {
        this.setState({
            userLevel: e.target.value,
        }, () => {
            console.info(this.state)
        });
    }

    handleRuleOk = () => {
        this.saveOrg()
    }

    handleRuleCancel =() => {
        this.setState({
            ruleVisible: false,
            userLevel: 2
        })
    }

    saveOrg = () => {
        this.setState({listLoading: true})
    }

    searchList = (e: any):void => {
        e.preventDefault();
        this.props.form.validateFields((err: any, {search}: {search: searchSsoUserRequest}) => {
            if (!err) {
                if (!search.lastName && !search.loginId) {
                    this.setState({
                        errMsg: 'SSO账号和真实姓名不能都为空!'
                    })
                } else {
                    this.setState({
                        isLoading: true,
                        errMsg: ''
                    })
                }
            } else {
                this.setState({
                    errMsg: ''
                })
            }
        });
    };

    selectRow = (selectedRowKeys: string[], selectedRows: OrgUser[]) => {
        postId = selectedRows.map((user: OrgUser) => {
            return user.id
        });
        this.setState({ selectedRowKeys });
    }

    onSave = () => {
        if (!postId.length) {
            message.warning('请选择用户!')
        } else {
            this.setState({
                ruleVisible: true
            })
        }
    };
    onCancel = (e: any) => {
        this.props.dispatch({
            type: 'OrgContentModel/closeMedal',
            visible: true
        });
        postId = [];
        this.setState({
            dataList: [],
            search: {
                loginId: '',
                lastName: '',
                pageNo: 1,
                pageSize: 20
            },
            selectedRowKeys: [],
            isLoading: false
        })
    };

    render() {
        const { form } = this.props;
        const { visible } = this.props.OrgContentModel;
        const {errMsg, isLoading, dataList, listLoading, userLevel, selectedRowKeys} = this.state
        const { getFieldDecorator } = form;
        const rowSelection: any = {
            selectedRowKeys,
            onChange: this.selectRow,
            type: 'radio'
        }
        return (
                <Modal
                    visible={visible}
                    title="关联用户"
                    onCancel={this.onCancel}
                    onOk={this.onSave}
                    cancelText="关闭"
                    width="1000px"
                >
                    <Spin spinning={listLoading}>
                        <Form layout="inline" onSubmit={this.searchList}>
                            <FormItem label="SSO账号" {...formItemLayout}>
                                {getFieldDecorator('search.loginId', {
                                        rules:[{max: 50, message: 'SSO账号最多输入50个字'}]
                                    })(<Input />)
                                }
                            </FormItem>
                            <FormItem label="真实姓名" {...formItemLayout}>
                                {getFieldDecorator('search.lastName', {
                                        rules:[{max: 50, message: 'SSO账号最多输入50个字'}]
                                    })(<Input />)
                                }
                            </FormItem>
                            <Button type="primary" icon="search" htmlType="submit">查询</Button>
                            {errMsg.length > 0? <Alert message={errMsg} type="error" />: null}
                        </Form>
                        <Spin spinning={isLoading}>
                            <Modal
                                title="请选择"
                                visible={this.state.ruleVisible}
                                onOk={this.handleRuleOk}
                                onCancel={this.handleRuleCancel}
                                closable={false}
                                maskClosable={false}
                            >
                                <Radio.Group onChange={this.onChangeUserLevel} value={userLevel}>
                                    <Radio value={1}>部门领导</Radio>
                                    <Radio value={2}>部门员工</Radio>
                                </Radio.Group>
                            </Modal>
                            <Table bordered dataSource={dataList} columns={columns} rowSelection={rowSelection} pagination={false} rowKey={(record: OrgUser) => record.loginId}/>
                        </Spin>
                    </Spin>
                </Modal>
        );
    }
}

function serializeProps({ OrgContentModel }: {OrgContentModel: OrgContentInterface}) {
    return {OrgContentModel}
}

const connectModelFrom = connect(serializeProps)(ModelFrom)

const FormOptions: FormCreateOption<addUserProps> = {  };
const ModelFromHtml = Form.create(FormOptions)(connectModelFrom)

class AddUserModal extends React.PureComponent<addUserProps, addUserState> {
    render() {
        return (
            <ModelFromHtml/>
        );
    }
}

export default connect(serializeProps)(AddUserModal)