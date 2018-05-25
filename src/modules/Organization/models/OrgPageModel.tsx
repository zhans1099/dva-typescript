import {ViewHTMLNode} from "components/ViewTemplate/Entity";
import {effectsAction} from "lib/SysModel";
import {OrgType} from '../interface/OrgTreeInterface';
import {OrgPageModelInterface} from '../interface/OrgPageInterface';
export default {
    namespace: 'OrgPageModel',
    state: {
        orgId: 0,
        expendConfig: {
            nodes: new Array<ViewHTMLNode>()
        },
        orgType: {
            dimName: '加载中...',
            isDisabled: 1,
            id: -1
        },
        canEditTree: false
    },
    reducers: {
        // 设置 orgId
        setOrgId(state: OrgPageModelInterface, {orgId}: {orgId: number}) {
            return {
                ...state,
                orgId
            }
        },

        // 设置 拓展信息
        setAttrConfig(state: OrgPageModelInterface, {expendConfig, orgType}: {expendConfig: any, orgType: OrgType}) {
            return {
                ...state,
                expendConfig,
                orgType,
                orgId: 0
            }
        },

        // 修改 canEditTree
        setCanEditTree(state: OrgPageModelInterface, {canEditTree}: {canEditTree: boolean}) {
            return {
                ...state,
                canEditTree
            }
        }
    },
    effects: {
        // 修改 orgId
        *changeOrg ({ orgId }: { orgId: number }, { select, call, put }: effectsAction) {
            yield put({
                type: 'setOrgId',
                orgId,
            });
        },

        // 修改 canEditTree
        *changeCanEditTree ({ canEditTree }: { canEditTree: boolean }, { select, call, put }: effectsAction) {
            yield put({
                type: 'setCanEditTree',
                canEditTree,
            });
        },
    },
    subscriptions: {
        setup: function () {
        }
    },
};
