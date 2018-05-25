
import * as React from 'react';
import { Form, Button} from 'antd';
import {FormComponentProps, FormCreateOption} from 'antd/lib/form';
import {ViewHTMLNode, ViewTemplateConfig} from "./Entity";
import {GetTemplateData} from "./service/service";
import {isArray} from "util";
import {owoNode} from "./RenderNode";
import {submitFormLayout} from "../../modules/Organization/Config";
//
const FormItem = Form.Item

export interface viewTemplateProps {
    expendConfig: ViewTemplateConfig,
    baseData: object,
    baseUrl?: string,
    okText?: string,
    cancelText?: string,
    action?: React.ReactNode
}

interface htmlTemplateProps extends FormComponentProps{
}

export interface viewTemplatePropsFun {
    onOk?: (e:any) => void,
    onCancel?: (e:any) => void,
}

interface viewTemplateState {
    detail: object,
}

class ViewTemplateComponent extends React.PureComponent<viewTemplateProps & viewTemplatePropsFun & htmlTemplateProps, viewTemplateState> {
    constructor(props: viewTemplateProps & viewTemplatePropsFun & htmlTemplateProps) {
        super(props)
        this.state = {
            detail: {}
        }
    };

    componentWillReceiveProps(nextProps: viewTemplateProps & viewTemplatePropsFun & htmlTemplateProps) {
        if (nextProps.baseUrl) {
            this.getDetailFromUrl(nextProps.baseUrl)
        } else if (nextProps.baseData) {
            this.setState({
                detail: nextProps.baseData
            })
        }
    }

    getDetailFromUrl(url: string) {
        GetTemplateData(url).then((json: object) => {
            this.setState({
                detail: json
            })
        })
    }

    onCancel(e: any) {
        // this.props.onCancel(e);
        this.props.form.resetFields()
    };

    onSave = (e: any): void => {
        e.preventDefault();
        const {onOk} = this.props;
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                onOk && onOk(values)
            }
        });
    };

    // renderFormItem() {
    //     const {expendConfig, okText, cancelText, action, onOk, onCancel, form} = this.props;
    //     return (
    //
    //     )
    // }

    render() {
        const {expendConfig, okText, cancelText, onCancel, form} = this.props;
        const {detail} = this.state;
        expendConfig.formType = expendConfig.formType || 'horizontal'
        return (
            <Form onSubmit={this.onSave}>
                {
                    isArray(expendConfig.nodes)? expendConfig.nodes.map((entity: ViewHTMLNode, index: number) => {
                        return owoNode.RenderFormNode(form, entity, detail, index)
                    }): null
                }
                <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                    {
                        cancelText? <Button onClick={(e: any) => onCancel && onCancel(e)}></Button> : null
                    }
                    {
                        okText && okText.length > 0 ? <Button type="primary" htmlType="submit">{okText}</Button>: null
                    }
                </FormItem>
            </Form>
        );
    }
}

const FormOptions: FormCreateOption<viewTemplateProps & viewTemplatePropsFun> = {
    mapPropsToFields(props: viewTemplateProps) {
        const baseData: any = {};
        for (const key in props.baseData) {
            baseData[key] = Form.createFormField({
                value: props.baseData[key],
            })
        }
        return baseData;
    }
};
const ViewTemplateHtml = Form.create(FormOptions)(ViewTemplateComponent)


export default class ViewTemplate extends React.PureComponent {
    props: viewTemplateProps & viewTemplatePropsFun
    render() {
        return (
            <ViewTemplateHtml {...this.props}/>
        );
    }
}