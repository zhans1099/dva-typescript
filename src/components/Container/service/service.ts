import {SysMenu} from "../interface/ContainerInterface";

export function GetMenuList(): Promise<SysMenu[]>{
/**
 *
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
 * */
    const menuList: SysMenu[] = [{
        'id': 96,
        'systemId': 1,
        'type': 1,
        'code': 'menuItemTree',
        'name': '组织机构管理',
        'memo': "",
        'actionUrl': '',
        'parentId': 0,
        'treePath': '-96',
        'sort': 5,
        'childsMenu': [
            {
                'id': 100,
                'systemId': 1,
                'type': 1,
                'code': 'menuItemTree_addRoot',
                'name': '组织机构管理',
                'memo': '',
                'actionUrl': '/app/organization',
                'parentId': 96,
                'treePath': '-96-100',
                'sort': 0,
                'childsMenu': new Array<SysMenu>()
            }
        ]
    }]
    return new Promise((resolve) => {
        resolve(menuList)
    })
}