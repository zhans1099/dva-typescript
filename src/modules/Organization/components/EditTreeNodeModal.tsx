import * as React from 'react';
import { Modal, Form, Input, Radio, InputNumber } from 'antd';
import {FormComponentProps, FormCreateOption} from 'antd/lib/form';
import {OrgTree, OrgTreeModelInterface} from '../interface/OrgTreeInterface';
import {formItemLayout} from "../Config";
import {connect} from 'dva';
import {DVAPageProp} from "components/src/lib/SysModel";
const FormItem = Form.Item;

interface editTreeNodeState {
    loading: boolean
}

interface editTreeNodeProps extends DVAPageProp{
    OrgTreeModel: OrgTreeModelInterface;
};

interface editTreeNodeFormProps extends FormComponentProps{}

class ModelFrom extends React.PureComponent<editTreeNodeProps & editTreeNodeFormProps, editTreeNodeState> {

    constructor(props: editTreeNodeProps & editTreeNodeFormProps) {
        super(props)
        this.state = {
            loading: false
        }
    };

    onCancel(tree?: OrgTree) {
        this.props.dispatch({
            type: 'OrgTreeModel/closeMedal',
            tree
        });
        this.props.form.resetFields()
    };

    onSave(): void {
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                this.setState({loading: true})
            }
        });
    };

    render() {
        const { visible, pName, treeNode } = this.props.OrgTreeModel;
        const { loading } = this.state;
        const { form } = this.props;
        const { getFieldDecorator } = form;
        let levelDisabled: number = 0;

        return (
                <Modal
                    visible={visible}
                    title="新建/编辑组织结构"
                    onCancel={() => {this.onCancel()}}
                    onOk={() => this.onSave()}
                    okText="保存"
                    cancelText="取消"
                    maskClosable={!loading}
                    closable={!loading}
                >
                    <Form>
                        <FormItem label="父节点" {...formItemLayout}>
                            <Input value={pName} disabled={true}/>
                        </FormItem>
                        <FormItem label="机构名称" {...formItemLayout}>
                            {getFieldDecorator('treeNode.orgName', {
                                initialValue: treeNode.orgName,
                                rules:[{required: true, message: '请输入机构名称'},
                                    {max: 50, message: '机构名称最多输入50个字'}]
                            })(<Input />)
                            }
                        </FormItem>
                        <FormItem label="机构层级" {...formItemLayout}>
                            {getFieldDecorator('treeNode.orgLevel', {
                                initialValue: treeNode.orgLevel,
                                rules:[{required: true, message: '请选择机构层级',}]
                            })(
                                <Radio.Group>
                                    <Radio value={1} disabled={levelDisabled > 0}>一级机构</Radio>
                                    <Radio value={2} disabled={levelDisabled == 1}>二级机构</Radio>
                                </Radio.Group>
                            )}
                        </FormItem>
                        <FormItem label="排序" {...formItemLayout}>
                            {getFieldDecorator('treeNode.showOrder', {
                                initialValue: treeNode.showOrder,
                                rules:[
                                    {required: true, message: '请输入排序数'},
                                    {type: 'integer', message: '请输入大于0的整数'}
                                ]
                            })(<InputNumber min={0}  />)}
                        </FormItem>
                    </Form>
                </Modal>
        );
    }
}

function serializeProps({ OrgTreeModel }: {OrgTreeModel: OrgTreeModelInterface}) {
    return {OrgTreeModel}
}

const connectModelFrom = connect(serializeProps)(ModelFrom)

const FormOptions: FormCreateOption<editTreeNodeProps> = {  };

const TepModelFrom = Form.create(FormOptions)(connectModelFrom);

class EditTreeNode extends React.PureComponent<editTreeNodeProps> {
    render() {
        return (
            <TepModelFrom/>
        );
    }
}

export default connect(serializeProps)(EditTreeNode)