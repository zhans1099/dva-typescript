import * as React from 'react';
import { Row, Col, Card } from 'antd';

import PageHeader from 'components/PageHeader/index';
import OrgtreeComponent from './components/Orgtree'
import Orgcontent from './components/OrgContent'
import './OrgPage.less';
import {connect} from 'dva';
import {OrgPageModelInterface} from "./interface/OrgPageInterface";
import {DVAPageProp} from "components/src/lib/SysModel";

interface OrgState {}
interface OrgProps extends DVAPageProp{
    OrgPageModel?: OrgPageModelInterface;
};

@connect(({ OrgPageModel }: {OrgPageModel: OrgPageModelInterface}) => {return {OrgPageModel}})
export default class Organization extends React.PureComponent<OrgProps, OrgState> {
    constructor(props: OrgProps) {
        super(props);
    }

    render() {
        const {dispatch, location}= this.props;
        return (
            <PageHeader
                title="组织机构管理"
            >
                <Row gutter={16}>
                    <Col className="gutter-row" span={6}>
                        <Card>
                            <OrgtreeComponent dispatch={dispatch} location={location}/>
                        </Card>
                    </Col>
                    <Col className="gutter-row" span={18}>
                        <Card>
                            <Orgcontent dispatch={dispatch} location={location}/>
                        </Card>
                    </Col>
                </Row>
            </PageHeader>
        );
    }
}
