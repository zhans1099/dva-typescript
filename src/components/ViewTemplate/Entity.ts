import * as React from 'react';
import {WrappedFormUtils} from "antd/lib/form/Form";
import {CascaderOptionType} from 'antd/lib/cascader';

interface CascaderOptionTypes extends CascaderOptionType {}
export interface enumEntity {
    code: string,
    desc: string
}

export interface ViewHTMLNode {
    attrName: string
    attrDesc: string
    attrType: string
    request?: boolean
    disabled? :boolean
    attrValueList: enumEntity[],
    option?: CascaderOptionTypes[],
    regexp: enumEntity[]
}

export interface ViewTemplateConfig {
    formType?: string
    nodes: ViewHTMLNode[]
}

export interface OWONode {
    RenderString: (item: ViewHTMLNode, data: any) => React.ReactNode,
    RenderNode: (item: ViewHTMLNode, data: any, index?: number)=> React.ReactNode,
    RenderFormNode: (form: WrappedFormUtils, item: ViewHTMLNode, data: any, index?: number)=> React.ReactNode,
}

const defaultFormatter = {
    default: (e: any) => e,
    date: (e: any) => e ? e.format('YYYY-MM-DD') : '',
    time: (e: any) => e ? e.format('HH:mm:ss') : '',
    datetime: (e: any) => e ? e.format('YYYY-MM-DD HH:mm:ss') : '',
}

export class Formatter {
    private maps: Map<string, (input: any) => any>
    constructor(nodes: ViewHTMLNode[]) {
        this.maps = new Map<string, (input: any) => any>();
        if (nodes.length) {
            nodes.forEach((node: ViewHTMLNode) => {
                this.maps.set(node.attrName, defaultFormatter[node.attrType] || defaultFormatter.default)
            })
        }
    }
    public getMaps(): Map<string, (input: any) => any> {
        return this.maps;
    }
    public getMap(key: string): (input: any) => any {
        return this.maps.get(key) || defaultFormatter.default
    }
    public get(key: string, value: any): any {
        return this.getMap(key)(value);
    }
    public set(key: string, func: (input: any) => any): void {
        this.maps.set(key, func)
    }
    public reSet(nodes: ViewHTMLNode[]): void {
        this.constructor(nodes)
    }
}