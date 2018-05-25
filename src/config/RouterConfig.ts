import Index from 'modules/Test/App2';
import Index2 from 'modules/Test/App22';
import Index1 from 'modules/Test/App21';
import OrgPage from 'modules/Organization/OrgPage';

import {RouterModel} from "../lib/SysModel";

/**
 * 1 所有路由均是app开头
 * 2 在使用包含配置时
 *      如果权限不一致 原则上要禁止使用
 *      例如 已经有模糊配置 /app/:id 时 不能再使用 /app/index2 后端权限过滤的时候没那么细致
 *      如果权限一致 则可以使用
 *
 * */
export const getRouteList = (): RouterModel[] => {
    return <RouterModel[]>[{
        defTitle: '首页0',
        url: '/app/index',
        component: Index,
        authority: []
    }, {
        defTitle: '首页1',
        url: '/app/index1',
        component: Index1,
        authority: []
    }, {
        defTitle: '首页2',
        url: '/app/index21',
        component: Index2,
        authority: []
    }, {
        defTitle: '机构0',
        url: '/app/organization',
        component: OrgPage,
        authority: []
    }, {
        defTitle: '机构1',
        url: '/app/organization2',
        component: OrgPage,
        authority: []
    }];
}

export const NotFindComponent = Index;