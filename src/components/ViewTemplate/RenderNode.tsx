import * as React from 'react';
import {enumEntity, OWONode, ViewHTMLNode} from "./Entity";
import { Form, Input, Radio, InputNumber, Select, DatePicker, TimePicker, Cascader } from 'antd';
import {formItemLayout} from "../../modules/Organization/Config";
import {isArray, isNullOrUndefined} from "util";
import {WrappedFormUtils} from "antd/lib/form/Form";
const FormItem = Form.Item,
    Option = Select.Option;


function renderEdit(form: WrappedFormUtils, entity: ViewHTMLNode, data: object, index?: number) {
    const rules: any[] = [];
    if (entity.request) {
        rules.push({required: true, message: `${entity.attrDesc}不能为空！`,})
    }
    if (entity.regexp && entity.regexp.length >0) {
        for (const reg of entity.regexp) {
            rules.push({pattern: reg.code, message: reg.desc})
        }
    }
    if (entity.attrType === 'integer') {
        rules.push({type: 'integer', message: '请输入整数'})
    }
    if (entity.attrType === 'float') {
        rules.push({type: 'float', message: '请输入含有小数的数字'})
    }
    let initialValue = data[entity.attrName];
    if (isNullOrUndefined(initialValue)) {
        initialValue = ''
    }
    const { getFieldDecorator } = form;

    return (
        <FormItem label={entity.attrDesc} {...formItemLayout} key={entity.attrName}>
            {
                getFieldDecorator(entity.attrName, {
                    rules: rules
                })(renderNode(entity, initialValue, index))
            }
        </FormItem>
    )
}

function renderNode(entity: ViewHTMLNode, data: any, index?: number): React.ReactNode {
    if (isNullOrUndefined(index)) index = 0;
    let disabled = entity.disabled || false;
    switch (entity.attrType) {
        case 'cascader':
            return (
                <Cascader options={entity.option || []} key={Math.random()} />
            );
        case 'radio':
            if (!isArray(entity.attrValueList)) return <div></div>;
            return (
                <Radio.Group key={entity.attrName + index}>
                    {entity.attrValueList.map((item: enumEntity) => {
                        // let disabled = isFunction(entity.disabled)? entity.disabled(item.code) : (entity.disabled || false)
                        return (
                            <Radio value={item.code} disabled={disabled} key={entity.attrName + item.code + index}>{item.desc}</Radio>
                        )
                    })}
                </Radio.Group>
            );
        case 'select':
            if (!isArray(entity.attrValueList)) return <div></div>;
            return (
                <Select placeholder={`请选择${entity.attrDesc}`} key={entity.attrName + index}>
                    {entity.attrValueList.map((item: enumEntity) => {
                        // let disabled = isFunction(entity.disabled)? entity.disabled(item.code) : (entity.disabled || false)
                        return (
                            <Option value={item.code} disabled={disabled} key={entity.attrName + item.code + index}>{item.desc}</Option>
                        )
                    })}
                </Select>
            );
        case 'date':
            return (
                <DatePicker format="YYYY-MM-DD" key={entity.attrName + index} disabled={disabled}/>
            );
        case 'time':
            return (
                <TimePicker format="HH:mm:ss" key={entity.attrName + index} disabled={disabled}/>
            );
        case 'datetime':
            return (
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" key={entity.attrName + index} disabled={disabled}/>
            );
        case 'float':
        case 'integer':
            return (
                <InputNumber key={entity.attrName + index} disabled={disabled} />
            );
        case 'input':
        case 'string':
            return (
                <Input key={entity.attrName + index} disabled={disabled} />
            );
        case 'print':
            return renderString(entity, data);
        default : return null;
    }
}

function renderString(entity: ViewHTMLNode, data: any): React.ReactNode {
    return (
        <FormItem label={entity.attrDesc} {...formItemLayout}>
            {getText(entity, data)}
        </FormItem>
    )
}

function getText(entity: ViewHTMLNode, data: any): any {
    if (isArray(entity.attrValueList) && entity.attrValueList.length > 0) {
        const item =  entity.attrValueList.find((_i: enumEntity) => {
            return _i.code == data
        })
        if (item) {
            return item.desc
        }
    }

    if (isNullOrUndefined(data)) {
        return ''
    }

    return data
}

export const owoNode: OWONode = {
    RenderString: renderString,
    RenderNode: renderNode,
    RenderFormNode: renderEdit
}