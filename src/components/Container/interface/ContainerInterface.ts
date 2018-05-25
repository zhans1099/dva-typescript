import * as React from 'react';

export interface containerState {
    user: UserInfo,
    menu: SysMenu[],
    auth: string[],
    enum: Map<string, SysEnum[]>,
    sheetList: Sheet[],
    activeKey: string
}

export interface UserInfo {
    email: string,
    phone: string
    ssoId: number,
    userId: string,
    userName: string
    realName: string
}

export interface SysMenu {
    id: number,
    systemId: number,
    type: number, //1 菜单 2操作
    code: string,
    name: string,
    actionUrl: string,
    parentId: number,
    sort: number,
    memo?: string,
    treePath?: string,
    icon?: string,
    childsMenu: SysMenu[],
}

export interface SysEnum {
    code: number,
    desc: string
}

export interface SysCrumb {
    title?: string,
    href?: string,
}

export interface Sheet {
    code: string, // 唯一标识 使用用路由
    name: string, // 标签名称
    component: React.ReactNode | null, // 展示节点
    closable: boolean, // 是否可删除
    active: boolean, // 是否选中
    modifyTime?: number, // 更新时间
}