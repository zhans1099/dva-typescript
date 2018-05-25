import * as React from 'react';
import {Tabs, Row, Col, Spin, TreeSelect} from 'antd';
import {DVAPageProp, SysKeyVelue} from "lib/SysModel";
import {Formatter} from "components/ViewTemplate/Entity";
import {OrgTree} from "../interface/OrgTreeInterface";
import {OrgContentInterface} from '../interface/OrgContentInterface';
import {OrgPageModelInterface} from '../interface/OrgPageInterface';

import {connect} from 'dva';

interface orgcontentState {
}
interface orgcontentProp extends DVAPageProp {
    OrgPageModel: OrgPageModelInterface;
    OrgContentModel: OrgContentInterface;
}

const contentDesc: any[] = [
    {key: 'shortName', value: '简称'},
    {key: 'orgName', value: '全称'},
    {key: 'id', value: '部门ID', format: (type: number) :string=>type < 0 ? '' : ('' + type)},
    {key: 'orgCode', value: '部门编码'},
    {key: 'cityCode', value: '城市编码'},
    {key: 'orgLevel', value: '部门级别', format: (type: number) :string=>type == 1 ? '一级部门' : (type == 2 ? '二级部门' : '')},
    {key: 'leader', value: '部门主管', format: (list: any[]) :string=>{return list && list.length > 0 ? list.map((item: any)=>item.lastName).join(',') : ''}},
    {key: 'showOrder', value: '显示顺序'},
];

let formatter: any;
let g_orgId: number;

class OrgcontentComponent extends React.PureComponent<orgcontentProp, orgcontentState> {

    constructor(props: orgcontentProp){
        super(props);
    }

    componentDidUpdate() {
        const {orgId} = this.props.OrgPageModel;
        if (orgId !== g_orgId && !isNaN(orgId)) {
            this.props.dispatch({
                type: 'OrgContentModel/getOrgDetail',
                orgId
            });
            formatter = new Formatter(this.props.OrgPageModel.expendConfig.nodes);
            g_orgId = orgId
        }
    }

    onDelete =(text: string, record: any) => {
        this.props.dispatch({
            type: 'OrgContentModel/changeLoadChild',
            loadChild: 1
        });
    }

    addUser = () => {
        this.props.dispatch({
            type: 'OrgContentModel/changeVisible',
            visible: true
        });
    }
    closeMedal = (isReload?: boolean) => {
        this.props.dispatch({
            type: 'OrgContentModel/changeVisible',
            visible: false
        });
        if (isReload) {
            this.props.dispatch({
                type: 'OrgContentModel/getOrgUserList',
                orgId: this.props.OrgContentModel.listRequest.orgId,
                pageNo: 1
            });
        }
    }

    saveAttr = (e: any): void => {
        const extAttr: SysKeyVelue[] = new Array<SysKeyVelue>();
        for (const key in e) {
            extAttr.push({
                key: key,
                value: formatter.get(key, e[key])
            })
        }
        this.props.dispatch({
            type: 'OrgContentModel/changeLoadChild',
            loadChild: 1
        });
    }

    // 部门信息
    renderOrgDetail() {
        const {content} = this.props.OrgContentModel;
        return (
            content ?
            <div className="org-content">
                {
                    contentDesc.map((item, index) => {
                        return (<Row key={index} className="org-c-row">
                            <Col span={6} className="org-c-key">{item.value}</Col>
                            <Col span={18}>{item.format ? item.format(content[item.key]) : content[item.key]}</Col>
                        </Row>)
                    })
                }
            </div> : null
        )
    }

    // 关联HR 列表信息
    renderRelativeHRDetail() {
        const {relativeContent} = this.props.OrgContentModel;
        const colArr = ['shortName', 'orgName', 'id', 'orgCode', 'cityCode', 'orgLevel'];
        return (
            relativeContent ?
                <div className="org-content">
                    {
                        contentDesc
                            .filter(item => colArr.indexOf(item.key) >= 0)
                            .map((item, index) => {
                                return (<Row key={index} className="org-c-row">
                                    <Col span={6} className="org-c-key">{item.value}</Col>
                                    <Col span={18}>{item.format ? item.format(relativeContent[item.key]) : relativeContent[item.key]}</Col>
                                </Row>)
                            })
                    }
                </div> : null
        )
    }

    // 选中树
    handleTreeSelectChange = (value: string) => {
        this.props.dispatch({
            type: 'OrgContentModel/changeSelectedTree',
            selectedTree: value
        });
    }

    // 树选择器节点
    renderTreeSelectNodes(data: OrgTree[]): any{
        return data.map((item: OrgTree) => {
            return (
                <TreeSelect.TreeNode title={item.orgName} key={item.id} value={item.id + ''} dataRef={item} className={item.isHide?'hidden':''}>
                    {item.childList? this.renderTreeSelectNodes(item.childList): null}
                </TreeSelect.TreeNode>
            );
        });
    }

    render() {
        const {loadContent} = this.props.OrgContentModel;
        return (
            <div className="card-container">
                <Tabs>
                    <Tabs.TabPane tab="部门信息" key="1">
                        <Spin spinning={loadContent > 0}>
                            {
                                this.renderOrgDetail()
                            }
                        </Spin>

                    </Tabs.TabPane>
                </Tabs>
            </div>
        )
    }
}

function serializeProps({ OrgPageModel, OrgContentModel }: {OrgPageModel: OrgPageModelInterface, OrgContentModel: OrgContentInterface}) {
    return {OrgPageModel, OrgContentModel}
}
export default connect(serializeProps)(OrgcontentComponent)