import {effectsAction} from "lib/SysModel";
import {OrgEntity, newOrgEntity, OrgUser, OrgContentInterface} from '../interface/OrgContentInterface';
import {PaginationProps} from "antd/lib/pagination/Pagination";

export default {
    namespace: 'OrgContentModel',
    state: {
        visible: false,
        listRequest: {
            pageSize: 20,
            pageNo: 1,
            orgId: 0
        },
        pagination: {
            current: 1,
            total: 0,
            pageSize: 20
        },
        loadContent: 0,
        loadChild: 0,
        baseData: {},
        content: newOrgEntity(),
        relativeContent: newOrgEntity(),
        data: new Array<OrgUser>(),
        selectedTree: '',
    },
    reducers: {
        // 设置 listRequest
        setOrgId(state: OrgContentInterface, {listRequest}: {listRequest: any}) {
            return {
                ...state,
                listRequest
            }
        },

        // 设置 visible
        setVisible(state: OrgContentInterface, {visible}: {visible: boolean}) {
            return {
                ...state,
                visible
            }
        },

        // 设置 部门信息&HR部门信息
        setOrgDetail(state: OrgContentInterface, {content, baseData, loadContent, relativeContent, selectedTree}: {content: OrgEntity, baseData: object, loadContent: number, relativeContent: OrgEntity, selectedTree: string}) {
            return {
                ...state,
                content,
                baseData,
                loadContent,
                relativeContent,
                selectedTree
            }
        },

        // 设置 是否加载部门信息&HR部门信息
        setLoadContent(state: OrgContentInterface, {loadContent}: {loadContent: number}) {
            return {
                ...state,
                loadContent
            }
        },

        // 设置 关联用户
        setUserList(state: OrgContentInterface, {data, pagination, loadChild}: {data: Array<OrgUser>, pagination: PaginationProps, loadChild?: number}) {
            return {
                ...state,
                data,
                pagination,
                loadChild: loadChild || 0
            }
        },

        // 设置 loadChild
        setLoadChild(state: OrgContentInterface, {loadChild}: {loadChild: number}) {
            return {
                ...state,
                loadChild
            }
        },

        // 设置 selectedTree
        setSelectedTree(state: OrgContentInterface, {selectedTree}: {selectedTree: string}) {
            return {
                ...state,
                selectedTree
            }
        },
    },
    effects: {
        // 修改 listRequest
        *changeOrg ({ orgId }: { orgId: number }, { select, call, put }: effectsAction) {
            const {listRequest} = yield select((state: any) => state.OrgContentModel);
            const copyListRequest = Object.assign({}, listRequest);
            copyListRequest.orgId = orgId;
            yield put({
                type: 'setOrgId',
                listRequest: copyListRequest,
            });
        },

        // 修改 visible
        *changeVisible ({ visible }: { visible: boolean }, { select, call, put }: effectsAction) {
            yield put({
                type: 'setVisible',
                visible,
            });
        },

        // 修改 loadChild
        *changeLoadChild ({ loadChild }: { loadChild: number }, { select, call, put }: effectsAction) {
            yield put({
                type: 'setLoadChild',
                loadChild,
            });
        },

        // 修改 选中树
        *changeSelectedTree ({ selectedTree }: { selectedTree: string }, { select, call, put }: effectsAction) {
            yield put({
                type: 'setSelectedTree',
                selectedTree
            });
        },

        // 关闭弹窗
        *closeMedal({ isReload }: { isReload?: boolean }, { select, call, put }: effectsAction) {
            yield put({
                type: 'setVisible',
                visible: false,
            });
        },
    },
    subscriptions: {
        setup: function () {
        }
    },
};
