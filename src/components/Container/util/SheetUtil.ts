import * as React from 'react';
import {isUndefined} from 'util';
import {RouterModel, SysMenu} from 'lib/SysModel'
import {DEFAULT_INDEX_URL, DEFAULT_INDEX_NAME, MAX_SHEET_NUM} from "config/config"
import {Sheet} from "../interface/ContainerInterface";
import * as pathToRegexp from 'path-to-regexp';
import {getRouteList, NotFindComponent} from "config/RouterConfig";
import {createElement} from "react";
import menuUtil from "./MenuUtil";
import {routerRedux} from "dva/router";

const catchMap = new Map<string, React.ReactNode>()

const INDEX_PAGE = DEFAULT_INDEX_URL
const INDEX_PAGE_NAME = DEFAULT_INDEX_NAME
const MAX_SHEET_LENGTH = MAX_SHEET_NUM;

class Entity {
    private sheetList: Sheet[];
    public isSync: boolean  //true 为同步状态 false是非同步状态
    public dispatch: Function
    constructor() {
        this.sheetList = [];
        this.isSync = true
        this.dispatch = () => {};
    }

    public syncSheet() {
        this.dispatch({
            type: 'SheetModel/SET_SHEETS',
            payload: {
                sheets: this.sheetList
            }
        })
    }
    public initialization(dispatch:Function, callback: Function): void {
        this.addSheet(<Sheet>{
            code: INDEX_PAGE, // 唯一标识 使用用路由
            name: INDEX_PAGE_NAME, // 标签名称
            component: null, // 展示节点
            closable: false, // 是否可删除
            active: true, // 是否选中
            modifyTime: Date.now(), // 更新时间
        })
        const { pathname } = window.location;
        if (pathname !=INDEX_PAGE) {
            AddSheetByUrl(pathname);
        }
        this.dispatch = dispatch;
        this.syncSheet();
        callback(this.sheetList)
    };
    public getRouterModel(pathname: string): RouterModel | undefined{
        const pathRegexp: RegExp = pathToRegexp(pathname);
        return getRouteList().find((item: RouterModel) => {
            return pathRegexp.test(item.url);
        })
    }
    private getComponent(pathname: string): React.ReactNode {
        let component = catchMap.get(pathname);
        if (!component) {
            const comModel: RouterModel | undefined = this.getRouterModel(pathname);
            if (comModel) {
                component = createElement(comModel.component, {
                    key: pathname
                });
                catchMap.set(pathname, component)
            } else {
                //TODO: can not find component, well goto 404
                component = NotFindComponent
            }
        }
        return component;
    }
    public addSheet(sheet:Sheet):string {
        sheet.modifyTime = Date.now();
        let sheet2: (Sheet | undefined) = this.sheetList.find((s: Sheet) => {
            return sheet.code === s.code
        })
        if (!isUndefined(sheet2)) {
            // sheet2 = Object.assign(sheet2, sheet);
        } else {
            sheet.component = this.getComponent(sheet.code)
            if (sheet.code === INDEX_PAGE) {
                sheet.closable = false;
                this.sheetList.unshift(sheet);
            } else {
                this.sheetList.push(sheet);
            }
            if (this.sheetList.length > MAX_SHEET_LENGTH) {
                this.sheetList.splice(1, 1)
            }
        }
        for (const item of this.sheetList) {
            item.active = item.code == sheet.code;
        }

        this.isSync = false
        return sheet.code;
    }

    public findMenuByUrl(url: string, list: SysMenu[] = menuUtil.getMenuList()): SysMenu | undefined {
        let menu: SysMenu | undefined = undefined;
        for (const menu2 of list) {
            if (menu2.actionUrl === url) {
                menu = menu2;
                break;
            }
            menu = this.findMenuByUrl(url, menu2.childsMenu);
            if (!isUndefined(menu)) break;
        }
        return menu;
    }

    public menu2Sheet(menu: SysMenu): Sheet {
        return <Sheet> {
            code: menu.actionUrl, // 唯一标识 使用用路由
            name: menu.name, // 标签名称
            component: null, // 展示节点
            closable: true, // 是否可删除
            active: true, // 是否选中
        }
    }

    public deleteSheet(code: string):string {
        if (code === INDEX_PAGE) return INDEX_PAGE;
        let i: number = this.sheetList.findIndex((sheet: Sheet) => {
            return sheet.code === code
        });
        if (i > 0) {
            this.sheetList.splice(i, 1)
            code = this.sheetList[i-1].code
        }
        for (let item of this.sheetList) {
            item.active = item.code == code;
        }
        this.isSync = false
        return code;
    }
    public getSheetList() {
        return this.sheetList;
    }
}

const sheetUtil = new Entity();

export default sheetUtil;

export function AddSheetByUrl(url: string): Sheet[] {
    const menu: SysMenu| undefined = menuUtil.findMenuByUrl(url);
    if (menu) {
        const sheet: Sheet = sheetUtil.menu2Sheet(menu);
        if (sheet) {
            sheetUtil.addSheet(sheet)
        }
    }
    return sheetUtil.getSheetList()
}

/**
 * url 为打开的url
 * title 为打开的后设置的标签名 如果没有传 title 取值顺序：传入->菜单->路由配置->'新页签'
 * */
export function OpenSheet(url: string, title?: string) {
    let sheet = <Sheet> {
        code: url, // 唯一标识 使用用路由
        name: title || '', // 标签名称
        component: null, // 展示节点
        closable: true, // 是否可删除
        active: true, // 是否选中
    }
    const menu: SysMenu| undefined = menuUtil.findMenuByUrl(url);
    if (menu) {
        sheet = sheetUtil.menu2Sheet(menu);
        sheet.name = title || menu.name;
    }
    if (!sheet.name) {
        const comModel: RouterModel | undefined = sheetUtil.getRouterModel(url);
        sheet.name = comModel ? comModel.defTitle : '新页签';
    }
    sheetUtil.addSheet(sheet);
    sheetUtil.dispatch(routerRedux.push(url));
    sheetUtil.syncSheet()
}

export function CloseSheet(url: string) {
    const code = sheetUtil.deleteSheet(url);
    if (code != url) {
        OpenSheet(code)
    }
}