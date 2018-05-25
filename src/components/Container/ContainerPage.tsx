import * as React from 'react';
import { Layout, LocaleProvider } from 'antd';
import BreadView from './components/BreadView';
import MenuView from './components/MenuView';
import SheetView from './components/SheetView'

import zhCN from 'antd/lib/locale-provider/zh_CN';
import * as moment from 'moment';
import 'moment/locale/zh-cn';
import {connect} from "dva";
import {Sheet} from "./interface/ContainerInterface";
import sheetUtil from "./util/SheetUtil";
import {SheetModelState} from "./models/SheetModel";
moment.locale('zh-cn');

interface ContainerState {

}
interface ContainerProps {
    dispatch: any;
    location: any;
    SheetModel: SheetModelState;
    children: React.ReactNode
};

class Container extends React.Component<ContainerProps, ContainerState> {
    constructor(props: any){
        super(props)
    }

    syncSheets(sheets: Sheet[]) {
        this.props.dispatch({
            type: 'SheetModel/SET_SHEETS',
            payload: {
                sheets: sheets
            }
        });
    }
    componentWillMount() {
        sheetUtil.initialization(this.props.dispatch,() => {})
    }

    render() {
        const sheets: Sheet[] = this.props.SheetModel.sheets;
        return (
            <LocaleProvider locale={zhCN}>
                <Layout style={{ minHeight: '100vh' }}>
                    <MenuView/>
                    <Layout>
                        <BreadView />
                        <SheetView />
                        <Layout.Content style={{ margin: '24px 24px 0px', height: '100%' }}>
                            {sheets.map((sheet: Sheet) => (<div style={sheet.active ? {display: 'block'} : {display: 'none'}} key={`${sheet.code}_path`}>{
                                sheet.component
                            }</div>))}
                        </Layout.Content>

                    </Layout>
                </Layout>
            </LocaleProvider>
        );
    }
}

function serializeProps({ SheetModel }: {SheetModel: SheetModelState}) {
    return {SheetModel}
}
export default connect(serializeProps)(Container)