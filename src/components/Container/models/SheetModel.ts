
import {Sheet} from "../interface/ContainerInterface";
import {effectsAction} from "lib/SysModel";

export interface SheetModelState {
    sheets: Sheet[]
}

export default {
    namespace: 'SheetModel',
    state: <SheetModelState>{
        sheets: []
    },
    reducers: {
        setSheets(state: SheetModelState, {payload}: {payload: any}) {
            const {sheets} = payload;
            return {
                ...state,
                sheets
            }
        },
    },
    effects: {
        *SET_SHEETS ({ payload }: { payload: any }, { select, call, put }: effectsAction) {
            const sheets: Sheet[] = payload.sheets;
            yield put({
                type: 'setSheets',
                payload: {
                    sheets
                },
            });
        },
    },
    subscriptions: {
        setup: function () {
        }
    },
};
