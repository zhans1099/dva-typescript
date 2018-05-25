import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
import {DVAPageProp, SysMenu} from '../../../lib/SysModel';
import { Link } from "react-router-dom";

import './Menu.less'
import {GetMenuList} from "../service/service";
import {ResponseModel} from "../../../lib/http";
import {connect} from "dva";
import {AddSheetByUrl} from "../util/SheetUtil";
import menuUtil from "../util/MenuUtil";
import {MenuModelState} from "../models/MenuModel";
import {Sheet} from "../interface/ContainerInterface";

const SYS_LOGO = './1510837663306143472281.png';

interface SysMenuProps extends DVAPageProp{
    MenuModel: MenuModelState;
};

interface SysMenuState {
    collapsed: boolean,
    titleOpacity: number,
    menu: SysMenu[]
}

class OMenu extends React.PureComponent<SysMenuProps, SysMenuState> {
    constructor(props: SysMenuProps) {
        super(props);
        this.state = {
            collapsed: false,
            titleOpacity: 1,
            menu: []
        }
    }

    componentDidMount() {
        const {pathname} = location;
        GetMenuList().then((menuList: SysMenu[]) => {
            this.setState({
                menu: menuList,
            })
            menuUtil.initialization(menuList);
            this.setSelectKeys(pathname);
        }).catch((e: ResponseModel<string>) => {
            console.info(`菜单获取失败: ${e.msg}`)
        })
    }

    onCollapse(collapsed: boolean) {
        this.setState({ collapsed });
        if (!collapsed) {
            setTimeout(() => {
                this.setState({ titleOpacity: 1 });
            }, 200)
        } else {
            this.setState({ titleOpacity: 0 });
        }
    };
    clickMenu({ key }: {key: string}) {
        key && this.setSelectKeys(key)
    };
    setSelectKeys(key: string) {
        this.props.dispatch({
            type: 'MenuModel/SET_SELECTKEYS',
            payload: {selectedKeys: key}
        });
        const sheetList: Sheet[] = AddSheetByUrl(key);
        this.props.dispatch({
            type: 'SheetModel/SET_SHEETS',
            payload: {sheets: sheetList}
        });
    }
    renderMenu(menu: SysMenu) {
        const icon = menu.icon || 'appstore';
        if (menu.childsMenu && menu.childsMenu.length > 0) {
            return (
                <SubMenu
                    key={menu.code}
                    title={<span><Icon type={icon} /><span>{menu.name}</span></span>}
                >
                    {
                        menu.childsMenu && menu.childsMenu.map((item: SysMenu) => {
                            return (
                                menu.type === 2? null :
                                    <Menu.Item key={item.actionUrl}><Link to={item.actionUrl}>{item.name}</Link></Menu.Item>
                            )
                        })
                    }
                </SubMenu>
            )
        } else {
            return (
                menu.type === 2? null :
                    <Menu.Item key={menu.actionUrl}>
                        <Icon type={icon} />
                        <span><Link to={menu.actionUrl}>{menu.name}</Link></span>
                    </Menu.Item>
            )
        }

    };

    render() {
        const { menu, titleOpacity, collapsed } = this.state;
        const {selectedKeys} = this.props.MenuModel;
        return (
            <Layout.Sider
                collapsible
                collapsed={collapsed}
                onCollapse={this.onCollapse}
            >
                <div className="logo" >
                    <img src={SYS_LOGO} className="sys-logo" alt="logo" />
                    <span style={{opacity : titleOpacity}}>管理系统</span>
                </div>
                <Menu theme="dark" selectedKeys={[selectedKeys]} mode="inline" onClick={(e) => {
                    this.clickMenu(e)
                }}>
                    {
                        menu.map((item: SysMenu) => this.renderMenu(item))
                    }
                </Menu>
            </Layout.Sider>
        );
    }
}

function serializeProps({ MenuModel }: {MenuModel: MenuModelState}) {
    return {MenuModel}
}
export default connect(serializeProps)(OMenu)