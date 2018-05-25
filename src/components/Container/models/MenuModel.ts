
import {effectsAction} from "lib/SysModel";

export interface MenuModelState {
    selectedKeys: string,
}

export default {
    namespace: 'MenuModel',
    state: {
        selectedKeys: ''
    },
    reducers: {
        setSelectedKeys(state: MenuModelState, {payload}: {payload: any}) {
            const {selectedKeys} = payload;
            return {
                ...state,
                selectedKeys
            }
        },
    },
    effects: {
        *SET_SELECTKEYS ({ payload }: { payload: any }, { select, call, put }: effectsAction) {
            const selectedKeys: string[] = payload.selectedKeys;
            yield put({
                type: 'setSelectedKeys',
                payload: {
                    selectedKeys
                },
            });
        },
    },
    subscriptions: {
        setup: function () {
        }
    },
};
