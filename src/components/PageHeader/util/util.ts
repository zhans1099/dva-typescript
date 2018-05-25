import * as pathToRegexp from 'path-to-regexp';
import {SysCrumb, SysMenu} from "../../../lib/SysModel";
import menuUtil from "components/Container/util/MenuUtil";

export const getBreadcrumb = (breadcrumbNameMap: Map<string, SysCrumb>, url: string): any => {
    let breadcrumb: SysCrumb = breadcrumbNameMap[url];
    if (!breadcrumb) {
        Object.keys(breadcrumbNameMap).forEach(item => {
            if (pathToRegexp(item).test(url)) {
                breadcrumb = breadcrumbNameMap[item];
            }
        });
    }
    return breadcrumb || <SysCrumb>{};
}

export const urlToList = (url:string): string[] => {
    const urllist = url.split('/').filter(i => i);
    return urllist.map((urlItem, index) => {
        return `/${urllist.slice(0, index + 1).join('/')}`;
    });
}

export const getSysBreadcrumb = (menuList: SysMenu[] = menuUtil.getMenuList()): SysCrumb[] => {
    let list = <SysCrumb[]>[];
    if (menuList.length < 1) return list;
    for (const menu of menuList) {
        list = <SysCrumb[]>[]
        if (menu.type !== 1) {
            continue;
        }
        const pathRegexp: RegExp = pathToRegexp(menu.actionUrl);
        if (pathRegexp.test(location.pathname)) {
            list.push(<SysCrumb>{
                title: menu.name,
                href: menu.actionUrl
            })
            return list;
        }
        if (menu.childsMenu && menu.childsMenu.length > 0) {
            list = getSysBreadcrumb(menu.childsMenu);
            if (list.length > 0){
                list.unshift(<SysCrumb>{
                    title: menu.name,
                    href: menu.actionUrl
                })
                break;
            }
        }
    }

    return list;
}