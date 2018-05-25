import * as React from 'react';
import { Row, Dropdown, Menu, Icon, Spin, Tree, Tooltip, Button, Input, message} from 'antd';
import {GetDim, GetOrgtree} from 'service/service';
import EditTreeNode from "./EditTreeNodeModal";
import {isArray, isUndefined} from "util";
import {OrgType, OrgTree, OrgTreeModelInterface} from '../interface/OrgTreeInterface';
import {OrgPageModelInterface} from '../interface/OrgPageInterface';
import {connect} from 'dva';
import {DVAPageProp} from "components/src/lib/SysModel";

interface OrgTreeState {
    orgTypeList: OrgType[],
    sltOrgType: OrgType,
    autoExpandParent: boolean,
    loadingTreeFirst: boolean,
    changeList: boolean,
    expandedKeys: string[],
}
interface OrgTreeProps extends DVAPageProp {
    OrgTreeModel: OrgTreeModelInterface;
    OrgPageModel: OrgPageModelInterface;
};

class OrgtreeComponent extends React.PureComponent<OrgTreeProps, OrgTreeState> {
    constructor(props: OrgTreeProps) {
        super(props);
        this.state = {
            orgTypeList: new Array<OrgType>(),
            sltOrgType: {
                dimName: '加载中...',
                isDisabled: 1,
                id: 1
            },
            autoExpandParent: true,
            expandedKeys: new Array<string>(),
            loadingTreeFirst: true,
            changeList: false
        }
    }

    componentDidMount() {
        GetDim().then((json: OrgType[])=> {
            const orgTypeList: OrgType[] = json;
            if (orgTypeList && orgTypeList.length > 0) {
                this.setState({orgTypeList, sltOrgType: orgTypeList[0]});
                this.initLoadData(orgTypeList[0])
            }
            this.props.dispatch({
                type: 'OrgPageModel/changeCanEditTree',
                canEditTree: orgTypeList[0].isDisabled == 0
            });
        })
    }

    // 获取树
    initLoadData(orgType: OrgType) {
        GetOrgtree(orgType.id).then((json: OrgTree[]) => {
            json = json || new Array<OrgTree>()
            this.setState({
                loadingTreeFirst: false
            });
            this.props.dispatch({
                type: 'OrgTreeModel/changeTreeData',
                treeData: json
            });
        });
        this.props.dispatch({
            type: 'OrgPageModel/getExpendItem',
            orgType
        });
    }
    // 加载子节点
    onLoadData(treeNode: any) {
        const {sltOrgType} = this.state
        return new Promise((resolve) => {
            if (treeNode.props.children) {
                resolve();
                return;
            }
            GetOrgtree(sltOrgType.id, treeNode.props.eventKey).then((json: OrgTree[]) => {
                treeNode.props.dataRef.childList = json || new Array<OrgTree>();
                this.props.dispatch({
                    type: 'OrgTreeModel/changeTreeData',
                    treeData: new Array(this.props.OrgTreeModel.treeData),
                });
                resolve();
            })
        });
    }

    onSelect = (keys: string[], {node} : {node: any}): void => {
        this.props.dispatch({
            type: 'OrgPageModel/changeOrg',
            orgId: Number(keys[0])
        });
    }

    // 展开/收起子节点
    onExpand(expandedKeys: string[]){
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    // 选择树类目
    handleMenuClick({ key } : any) {
        if (isUndefined(key)) return;
        let orgType: OrgType = this.state.orgTypeList.find((item: OrgType) => {
            return item.id == key;
        }) || {
            dimName: '未知',
            isDisabled: 1,
            id: key
        };
        this.setState({sltOrgType: orgType, loadingTreeFirst: true});
        this.props.dispatch({
            type: 'OrgPageModel/changeCanEditTree',
            canEditTree: !isUndefined(orgType) && (orgType.isDisabled == 0)
        });
        this.initLoadData(orgType)
    }

    // 搜索树
    onSearchChange(e: any) {
        const value: string = e.target.value;
        const treeData = this.props.OrgTreeModel.treeData;
        this.setState({
            expandedKeys: []
        });
        this.setTreeNodeHide(treeData, value);
        this.setState({
            autoExpandParent: true,
            expandedKeys: [...this.state.expandedKeys]
        });
    }

    findTreeNode(id: number, nodeList: OrgTree[]): OrgTree | null{
        let node: OrgTree | null = null;
        for (const item of nodeList) {
            if (item.id == id) {
                return item;
            } else {
                if (item.childList && item.childList.length > 0) {
                    node = this.findTreeNode(id, item.childList)
                    if (node) return node;
                }
            }
        }

        return node
    }

    // 设置搜索树的展示和隐藏
    setTreeNodeHide(treeData: OrgTree[], key: string): boolean {
        let isShow = false;
        if (key.length > 0) {
            for (const tree of treeData) {
                if (tree.childList && tree.childList.length > 0) {
                    tree.isHide = !(this.setTreeNodeHide(tree.childList, key) || tree.orgName.toLowerCase().indexOf(key.trim().toLowerCase()) > -1);
                    if (!tree.isHide) {
                        const expandedKeys = this.state.expandedKeys;
                        expandedKeys.push('' + tree.id);
                        this.setState({
                            expandedKeys
                        });
                    }
                } else {
                    tree.isHide = tree.orgName.toLowerCase().indexOf(key.trim().toLowerCase()) < 0;
                }
                isShow = isShow || !tree.isHide;
            }
        } else {
            for (const tree of treeData) {
                if (tree.childList && tree.childList.length > 0) {
                    this.setTreeNodeHide(tree.childList, key);
                }
                tree.isHide = false;
            }

            isShow = true;
        }
        return isShow;
    }

    //操作树节点 add 时 tree 为 父节点 edit 和 del时为当前节点
    actionTree(e: any, type: string, tree?: OrgTree) {
        e.preventDefault();
        let {sltOrgType} = this.state;
        let {treeData} = this.props.OrgTreeModel;
        let visible = true;
        switch (type) {
            case 'add':
                this.props.dispatch({
                    type: 'OrgTreeModel/changePname',
                    pName: tree ? tree.orgName : ''
                });
                this.props.dispatch({
                    type: 'OrgTreeModel/changeVisible',
                    visible
                });
                this.props.dispatch({
                    type: 'OrgTreeModel/changeTreeNode',
                    treeNode: {
                        dimId: sltOrgType.id,
                        id: -1,
                        pid: tree? tree.id: 0,
                        orgName: '',
                        nodeLevel: (tree? tree.nodeLevel: 0) +1,
                        orgLevel: (tree && tree.orgLevel == 2 ? 2 : ''),
                        showOrder: 100,
                    }
                });
                break;
            case 'edit':
                if (isUndefined(tree)) return;
                const pTree: OrgTree | null = this.findTreeNode(tree.pid, treeData);
                this.props.dispatch({
                    type: 'OrgTreeModel/changePname',
                    pName: pTree ? pTree.orgName : ''
                });
                this.props.dispatch({
                    type: 'OrgTreeModel/changeVisible',
                    visible: true
                });
                this.props.dispatch({
                    type: 'OrgTreeModel/changeTreeNode',
                    treeNode: tree
                });
                break;
            case 'delete':
                if (!tree) {
                    break;
                }
                message.success('删除成功!');
                break;
            default:
                break;
        }
    }

    moveChild(tree: OrgTree): string {
        let treeData = this.props.OrgTreeModel.treeData;
        let childList: OrgTree[] = treeData;
        if (tree.pid > 0) {
            const pTreeNode: OrgTree | null = this.findTreeNode(tree.pid, treeData);
            if (!pTreeNode) {
                return `找不到父节点!：${tree}`;
            }
            childList = pTreeNode && isArray(pTreeNode.childList) ? pTreeNode.childList : new Array<OrgTree>();
        }
        const index = childList.findIndex((item: OrgTree) => {
            return item.id == tree.id;
        })
        if (index < 0) {
            return `找到的父节点没有子节点:${tree}`
        }
        childList.splice(index, 1);
        return ''
    }

    onDragEnter = (info: any) => {

    }
    onDrop = (info: any) => {
    }

    // 操作按钮
    renderTreeEdit(item: OrgTree) {
        return (
            <div>
                <Button type="primary" shape="circle" icon="plus" size="small" onClick={(e: any) => this.actionTree(e, 'add', item) } ghost style={{ color: '#fff', borderColor: '#fff'}}/>
                <Button type="primary" shape="circle" icon="edit" size="small" onClick={(e: any) => this.actionTree(e, 'edit', item) } ghost style={{ color: '#fff', borderColor: '#fff', margin:'0 5px'}}/>
                <Button type="primary" shape="circle" icon="delete" size="small" onClick={(e: any) => this.actionTree(e, 'delete', item) } ghost style={{ color: '#fff', borderColor: '#fff'}}/>
            </div>
        )
    }
    // 操作弹层
    renderTreeTitle(item: OrgTree) {
        return (
            this.props.OrgPageModel.canEditTree ?
            <Tooltip title={this.renderTreeEdit(item)} placement="right">{item.orgName}</Tooltip> : item.orgName
        )
    }

    // 树节点
    renderTreeNodes(data: OrgTree[]): any{
        return data.map((item: OrgTree) => {
            return (
                <Tree.TreeNode title={this.renderTreeTitle(item)} key={item.id} dataRef={item} className={item.isHide?'hidden':''}>
                    {item.childList? this.renderTreeNodes(item.childList): null}
                </Tree.TreeNode>
            );
        });
    }

    //
    renderTree() {
        const { autoExpandParent, expandedKeys, loadingTreeFirst } = this.state;
        const treeData = this.props.OrgTreeModel.treeData;

        return (
            <div>
                <Input.Search style={{ marginTop: 10, height: 32 }} placeholder="请输入关键字" onChange={(e: any) => this.onSearchChange(e)} />
                {
                    !loadingTreeFirst?<Tree
                        loadData={(e: any) => this.onLoadData(e)}
                        autoExpandParent={autoExpandParent}
                        onExpand={(e: any) => this.onExpand(e)}
                        onSelect={this.onSelect}
                        expandedKeys={expandedKeys}
                        draggable
                        onDragEnter={this.onDragEnter}
                        onDrop={this.onDrop}>

                        {this.renderTreeNodes(treeData)}
                    </Tree>:<Spin />
                }
            </div>
        )
    }

    renderHeader() {
        const {orgTypeList} = this.state
        return (
            <Menu onClick={(e: any) => {this.handleMenuClick(e)}}>
                {
                    orgTypeList.map((item: OrgType) => {
                        return (<Menu.Item key={item.id}>{item.dimName}</Menu.Item>)
                    })
                }
            </Menu>
        )
    }

    render() {
        const {dispatch, location}= this.props;
        const {canEditTree}= this.props.OrgPageModel;
        const {sltOrgType} = this.state;
        return (
            <div>
                <Row>
                    <Dropdown overlay={this.renderHeader()} trigger={['click']}>
                        <a className="ant-dropdown-link" href="#">
                            {sltOrgType.dimName} <Icon type="down" />
                        </a>
                    </Dropdown>
                </Row>
                <Row style={{ marginTop: 10}}>
                    {
                        canEditTree ? <Button type="primary" onClick={(e: any) => this.actionTree(e, 'add') }>创建一级菜单</Button>: null
                    }
                    <EditTreeNode dispatch={dispatch} location={location}/>
                </Row>
                <Row style={{ marginTop: 10}}>
                    {this.renderTree()}
                </Row>

            </div>
        );
    }
}

function serializeProps({ OrgTreeModel, OrgPageModel }: {OrgTreeModel: OrgTreeModelInterface, OrgPageModel: OrgPageModelInterface}) {
    return {OrgTreeModel, OrgPageModel}
}
export default connect(serializeProps)(OrgtreeComponent)