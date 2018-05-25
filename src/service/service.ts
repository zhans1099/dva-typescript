import { SysConfig } from 'lib/SysModel';
import {isUndefined} from "util";

export function GetSysOption(option: String[]): any{
    const res: object = {
        // user: {
        //     email: 'shizhan.dong@owitho.com',
        //     phone: '18616614554',
        //     ssoId: 123,
        //     userId: 'shizhan.dong',
        //     userName: '董诗瞻'
        // },
        menu: [
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
                'createBy': 1622,
                'createTime': '2018-02-03 00:00:00.0',
                'updateBy': null,
                'updateTime': null,
                'sort': 5,
                'childsMenu': [
                    {
                        'id': 100,
                        'systemId': 1,
                        'type': 1,
                        'code': 'menuItemTree_addRoot',
                        'name': '创建根节点',
                        'memo': "",
                        'actionUrl': '/app/organization',
                        'parentId': 96,
                        'treePath': '-96-100',
                        'createBy': 3591,
                        'createTime': '2018-04-10 00:00:00.0',
                        'updateBy': null,
                        'updateTime': null,
                        'sort': 0,
                        'childsMenu': null
                    },
                    {
                        'id': 102,
                        'systemId': 1,
                        'type': 2,
                        'code': 'menuItemTree_deleteNode',
                        'name': '删除节点',
                        'memo': "",
                        'actionUrl': '/app/index1',
                        'parentId': 96,
                        'treePath': '-96-102',
                        'createBy': 1622,
                        'createTime': '2018-02-26 00:00:00.0',
                        'updateBy': null,
                        'updateTime': null,
                        'sort': 0,
                        'childsMenu': null
                    },
                    {
                        'id': 101,
                        'systemId': 1,
                        'type': 2,
                        'code': 'menuItemTree_update_node',
                        'name': '修改节点',
                        'memo': "",
                        'actionUrl': '/app/index2',
                        'parentId': 96,
                        'treePath': '-96-101',
                        'createBy': 1622,
                        'createTime': '2018-02-26 00:00:00.0',
                        'updateBy': null,
                        'updateTime': null,
                        'sort': 0,
                        'childsMenu': null
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
                'createBy': 1622,
                'createTime': '2018-02-03 00:00:00.0',
                'updateBy': null,
                'updateTime': null,
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
                        'createBy': 3591,
                        'createTime': '2018-04-10 00:00:00.0',
                        'updateBy': null,
                        'updateTime': null,
                        'sort': 0,
                        'childsMenu': null
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
                        'createBy': 1622,
                        'createTime': '2018-02-26 00:00:00.0',
                        'updateBy': null,
                        'updateTime': null,
                        'sort': 0,
                        'childsMenu': null
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
                        'createBy': 1622,
                        'createTime': '2018-02-26 00:00:00.0',
                        'updateBy': null,
                        'updateTime': null,
                        'sort': 0,
                        'childsMenu': null
                    }
                ]
            },

        ],
        // enum: {
        //     test: [{code: 1, desc: '11'}, {code: 11, desc: '111'}],
        //     test2: [{code: 2, desc: '22'}, {code: 22, desc: '222'}]
        // }
    }
    const config: SysConfig = <SysConfig> res;
    return new Promise((resolve) => {
        setTimeout(()=> {
            resolve(config)
        }, 1000)
    })
}

export function GetMenuTree(option: String[]): any{
    const res: object = [
        {
            'id': 1,
            'name': '一部',
            'projectGroup': 1,
            'department': 'group1',
            'pid': 0,
            'parents': null,
            'grade': null,
            'status': null,
            'createTime': null,
            'subItem': [
                {
                    'id': 7,
                    'name': '一组',
                    'projectGroup': 1,
                    'department': 'group11',
                    'pid': 1,
                    'parents': null,
                    'grade': 1,
                    'status': 1,
                    'createTime': null,
                    'subItem': [ ]
                }
            ]
        },
        {
            'id': 2,
            'name': '二部',
            'projectGroup': 1,
            'department': 'group2',
            'pid': 0,
            'parents': null,
            'grade': null,
            'status': null,
            'createTime': null,
            'subItem': [ ]
        },
        {
            'id': 3,
            'name': '三部',
            'projectGroup': 1,
            'department': 'group3',
            'pid': 0,
            'parents': null,
            'grade': null,
            'status': null,
            'createTime': null,
            'subItem': [ ]
        }
    ]
    const config: SysConfig = <SysConfig> res;
    return new Promise((resolve) => {
        setTimeout(()=> {
            resolve(config)
        }, 1000)
    })
}

export function GetEnum(...keys: string[]): any {
    const mockData: Map<string, object> = new Map<string, object>();

    mockData.set('ORG_TYPE', [{
        dimName: '这是一个很长长长长长长的名字',
        isDisabled: 1,
        id: 1
    }, {
        dimName: '编辑穿着',
        isDisabled: 0,
        id: 2
    }, {
        dimName: 'hahaha',
        isDisabled: 0,
        id: 3
    }])

    const redata: Map<string, object> = new Map<string, object>();
    return new Promise((resolve) => {
        setTimeout(()=> {
            for(const key of keys) {
                redata.set(key, mockData.get(key) || {})
            }
            resolve(redata)
        }, 12000);
    })
}

export function GetOrgtree(parenId?: number, dimId?: number): any {
    if (isUndefined(parenId)) parenId = 1;
    let id = parenId * 10;
    const mockData: any = []
    if (id < 10000) {
        for (let i = 0 ; i < 5; i++) {
            id ++
            mockData.push({
                id: id,
                pid: parenId,
                orgName: `部门-${id}`,
                orgCode: `code-${id}`,
                nodeLevel: i,
                childList: null
            })
        }
    }

    return new Promise((resolve) => {
        setTimeout(()=> {
            resolve(mockData)
        }, 1000);
    })
}

export function GetDim(): any {
    // return HTTP.post('/ajax/dimList')
    const redata: any = [{
        dimName: '这是一个很长长长长长长长长长长长长长长长长长长的名字',
        isDisabled: 1,
        id: 1
    }, {
        dimName: '编辑穿着',
        isDisabled: 0,
        id: 2
    }, {
        dimName: 'hahaha',
        isDisabled: 0,
        id: 3
    }];
    return new Promise((resolve) => {
        setTimeout(()=> {
            resolve(redata)
        }, 1000);
    })
}