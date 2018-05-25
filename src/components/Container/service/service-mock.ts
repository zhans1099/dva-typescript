import {SysMenu} from "../interface/ContainerInterface";

export function GetMenuList(): Promise<SysMenu[]>{
    const menuList: SysMenu[] = [
        {
            'id': 96,
            'systemId': 1,
            'type': 1,
            'code': 'menuItemTree',
            'name': '菜单组1',
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
                    'name': '创建根节点',
                    'memo': "",
                    'actionUrl': '/app/organization2',
                    'parentId': 96,
                    'treePath': '-96-100',
                    'sort': 0,
                    'childsMenu': new Array<SysMenu>()
                },
                {
                    'id': 102,
                    'systemId': 1,
                    'type': 2,
                    'code': 'index_page',
                    'name': '首页',
                    'memo': "",
                    'actionUrl': '/app/index1',
                    'parentId': 96,
                    'treePath': '-96-102',
                    'sort': 0,
                    'childsMenu': new Array<SysMenu>()
                },
                {
                    'id': 101,
                    'systemId': 1,
                    'type': 2,
                    'code': 'menuItemTree_update_node',
                    'name': '修改节点',
                    'memo': "",
                    'actionUrl': '/app/index21',
                    'parentId': 96,
                    'treePath': '-96-101',
                    'sort': 0,
                    'childsMenu': new Array<SysMenu>()
                }
            ]
        },
        {
            'id': 97,
            'systemId': 1,
            'type': 1,
            'code': 'menuItemTree1',
            'name': '菜单组2',
            'memo': "",
            'actionUrl': '',
            'parentId': 0,
            'treePath': '-96',
            'sort': 5,
            'childsMenu': [
                {
                    'id': 1100,
                    'systemId': 1,
                    'type': 1,
                    'code': 'menuItemTree_addRoot1',
                    'name': '创建根节点',
                    'memo': "",
                    'actionUrl': '/app/index21',
                    'parentId': 97,
                    'treePath': '-96-100',
                    'sort': 0,
                    'childsMenu': new Array<SysMenu>()
                },
                {
                    'id': 1102,
                    'systemId': 1,
                    'type': 2,
                    'code': 'menuItemTree_deleteNode1',
                    'name': '删除节点',
                    'memo': "",
                    'actionUrl': '/app/index11',
                    'parentId': 97,
                    'treePath': '-96-102',
                    'sort': 0,
                    'childsMenu': new Array<SysMenu>()
                },
                {
                    'id': 1101,
                    'systemId': 1,
                    'type': 2,
                    'code': 'menuItemTree_update_node1',
                    'name': '修改节点',
                    'memo': "",
                    'actionUrl': '/app/index12',
                    'parentId': 97,
                    'treePath': '-96-101',
                    'sort': 0,
                    'childsMenu': new Array<SysMenu>()
                }
            ]
        },
    ]
    return new Promise((resolve) => {
        setTimeout(()=> {
            resolve(menuList)
        }, 1000)
    })
}