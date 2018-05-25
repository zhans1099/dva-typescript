import {Action} from "redux";
import {Location} from "history";

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

export interface PageUtil {
    pageNo: number,
    pageSize: number
}

export interface SysConfig {
    user: UserInfo,
    menu: SysMenu[],
    auth: string[],
    enum: Map<string, SysEnum[]>
}

export interface SysEnum {
    code: number,
    desc: string
}

export interface SysKeyVelue {
    key: string,
    value: any
}

export interface SysCrumb {
    title?: string,
    href?: string,
}

export interface RouterModel {
    defTitle: string,
    url: string,
    component: any,
    authority: string[]
}

export interface effectsAction {
    select: Function,
    call: Function,
    put: <A extends Action>(action: A) => any
}

export interface DVAPageProp {
    dispatch: Function;
    location: Location;
}