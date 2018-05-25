import * as React from 'react';
import { Layout, Icon, Menu, Dropdown, Avatar, Spin } from 'antd';

import "./Bread.less"
import {UserInfo} from "lib/SysModel";
import {getCookieUser} from "lib/Cookie";
const logo = 'http://intra-img.oss-cn-shanghai.aliyuncs.com/15240201561981001486956.png?x-oss-process=image/resize,h_100';

export default class Bread extends React.PureComponent {
    render() {
        const user: UserInfo = getCookieUser();
        const menu = (
            <Menu className="menu" selectedKeys={[]}>
                <Menu.Item key="logout">
                    <Icon type="logout" />退出登录
                </Menu.Item>
            </Menu>
        );
        return (
            <Layout.Header>
                <div className="bread-body">
                    <div className="bread-title">
                        <div className="menu">
                            <div className="right">
                                {user.realName ? (
                                    <Dropdown overlay={menu}>
                                  <span className="action account">
                                    <Avatar size="small" className="avatar" src={logo} />
                                    <span className="name">{user.realName}({user.userName})</span>
                                  </span>
                                    </Dropdown>
                                ) : (
                                    <Spin size="small" style={{ marginLeft: 8 }} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </Layout.Header>
        );
    }
}
