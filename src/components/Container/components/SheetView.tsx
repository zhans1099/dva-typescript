import * as React from 'react';
import { Tabs } from 'antd';
import './Sheet.less'
import {Sheet} from "../interface/ContainerInterface";
import {connect} from "dva";
import {DVAPageProp} from "lib/SysModel";
import {SheetModelState} from "../models/SheetModel";
import {CloseSheet, OpenSheet} from "../util/SheetUtil";

interface SysSheetProps extends DVAPageProp{
    SheetModel: SheetModelState;

};

interface SysSheetState {
}

class SheetView extends React.PureComponent<SysSheetProps, SysSheetState> {
    constructor(props: SysSheetProps) {
        super(props)
    }
    clickTab(key: string) {
        const {pathname} = location;
        const {dispatch} = this.props;
        if (pathname !== key) {
            dispatch({
                type: 'MenuModel/SET_SELECTKEYS',
                payload: {selectedKeys: key}
            });
            OpenSheet(key)
        }

    };
    onEdit(targetKey: string, action: string) {
        if (action === 'remove') {
            CloseSheet(targetKey);
        }
    }
    render() {
        const sheetList: Sheet[] = this.props.SheetModel.sheets;
        const { pathname } = window.location;
        return (
            <div className="card-container card-sheet">
                {
                    sheetList.length ? (
                        <Tabs type="editable-card"
                              activeKey={pathname}
                              onTabClick={(e: string) => {this.clickTab(e)}}
                              onEdit={(k: string, a: string) => {this.onEdit(k, a)}}
                              hideAdd={true}>
                            {
                                sheetList.map((sheet: Sheet) => {
                                    return (
                                        <Tabs.TabPane tab={sheet.name} key={sheet.code} closable={sheet.closable}>
                                            {this.props.children}
                                        </Tabs.TabPane>
                                    )
                                })
                            }
                        </Tabs>
                    ): (
                        <div></div>
                    )
                }

            </div>
        );
    }
}

function serializeProps({ SheetModel }: {SheetModel: SheetModelState}) {
    return {SheetModel}
}
export default connect(serializeProps)(SheetView)