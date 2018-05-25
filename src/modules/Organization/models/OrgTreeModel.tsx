import {effectsAction} from "lib/SysModel";
import {OrgTree, OrgTreeModelInterface} from '../interface/OrgTreeInterface';

export default {
    namespace: 'OrgTreeModel',
    state: {
        treeData: new Array<OrgTree>(),
        pName: '',
        visible: false,
        treeNode: {
            dimId: -1,
            id: -1,
            pid: -1,
            orgName: '',
            nodeLevel: 2,
            orgLevel: 1,
            showOrder: 100,
        }
    },
    reducers: {
        // 设置 pName
        setPname(state: OrgTreeModelInterface, {pName}: {pName: string}) {
            return {
                ...state,
                pName
            }
        },

        // 设置 visible
        setVisible(state: OrgTreeModelInterface, {visible}: {visible: boolean}) {
            return {
                ...state,
                visible
            }
        },

        // 设置 treeNode
        setTreeNode(state: OrgTreeModelInterface, {treeNode}: {treeNode: OrgTree}) {
            return {
                ...state,
                treeNode
            }
        },

        // 设置 treeData
        setTreeData(state: OrgTreeModelInterface, {treeData}: {treeData: Array<OrgTree>}) {
            return {
                ...state,
                treeData
            }
        }
    },
    effects: {
        // 修改 pName
        *changePname({pName}: {pName: string}, { select, call, put }: effectsAction) {
            yield put({
                type: 'setPname',
                pName,
            });
        },

        // 修改 visible
        *changeVisible({visible}: {visible: boolean}, { select, call, put }: effectsAction) {
            yield put({
                type: 'setVisible',
                visible,
            });
        },

        // 修改 treeNode
        *changeTreeNode({treeNode}: {treeNode: OrgTree}, { select, call, put }: effectsAction) {
            yield put({
                type: 'setTreeNode',
                treeNode,
            });
        },

        // 修改 treeData
        *changeTreeData({treeData}: {treeData: Array<OrgTree>}, { select, call, put }: effectsAction) {
            yield put({
                type: 'setTreeData',
                treeData,
            });
        },

        // 关闭弹窗
        *closeMedal({tree}: {tree: OrgTree}, { select, call, put }: effectsAction): any {
            function findTreeNode(id: number, nodeList: OrgTree[]): OrgTree | null{
                let node: OrgTree | null = null;
                for (const item of nodeList) {
                    if (item.id == id) {
                        return item;
                    } else {
                        if (item.childList && item.childList.length > 0) {
                            node = findTreeNode(id, item.childList)
                            if (node) return node;
                        }
                    }
                }

                return node
            }

            let visible = false;
            const {treeData} = yield select((state: any) => state.OrgTreeModel);
            if (tree) {
                const treeNode: OrgTree | null = findTreeNode(tree.id, treeData);
                const assignProps: string[] = ['pid', 'orgName', 'orgCode', 'nodeLevel', 'orgLevel', 'showOrder', 'cityCode'];
                if (treeNode) { // 修改
                    tree.childList = treeNode.childList;
                    assignProps.forEach((key: string) => {
                        treeNode[key] = tree[key];
                    });
                } else { // 新增
                    if (tree.pid < 1) {
                        tree.childList = new Array<OrgTree>()
                        treeData.push(tree);
                    } else {
                        const pTreeNode: OrgTree | null = findTreeNode(tree.pid, treeData);
                        if (pTreeNode) {
                            if (!pTreeNode.childList) pTreeNode.childList = new Array<OrgTree>();
                            pTreeNode.childList.push(tree);
                        }
                    }
                }
            }
            yield put({
                type: 'setTreeData',
                treeData
            });
            yield put({
                type: 'setVisible',
                visible
            });
        }
    },
    subscriptions: {
        setup: function () {
        }
    },
};
