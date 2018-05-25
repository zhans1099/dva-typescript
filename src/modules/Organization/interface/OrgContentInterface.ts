import {PageUtil, SysKeyVelue} from "lib/SysModel";
import {OrgTree} from './OrgTreeInterface';

export interface OrgEntity {
    id: number,
    orgCode: string,    //机构编码
    shortName: string,  //机构简称
    orgName: string,    //机构名称
    cityCode: string,   //城市编码
    orgLevel: number,   //机构等级，1：一级机构，2：二级机构
    leader: any[],        //部门负责人
    extAttr?: object,
    relation?: OrgTree
}

export interface HRrelativeReq {
    sourceId: number,
    targetId: number
}

export function newOrgEntity() {
    return {
        id: -1,
        orgCode: '',    //机构编码
        shortName: '',  //机构简称
        orgName: '',    //机构名称
        cityCode: '',   //城市编码
        orgLevel: 0,   //机构等级，1：一级机构，2：二级机构
        leader: [],        //部门负责人
        extAttr: {}
    }
}

export interface OrgUser {
    id: number,
    loginId: string,        //SSO账号
    lastName: string,       //真实姓名
    jobTitles: string,      //职务
    mobile: string,         //手机号码
    email: string,          //邮箱
    departmentName: string, //二级部门名称
    departmentId: number,   //二级部门ID
    subcompanyId: number,   //一级部门ID
    subcompanyName: string, //一级部门名称
    dimId: number,          //维度id
    orgId: number,          //机构id
    userLevel: number,      //用户级别:1-部门领导,2-员工
}

export interface OrgUserListRequst extends PageUtil {
    id?: number,
    loginId?: string,
    lastName?: string,
    dimId?: number;
    orgId: number;
}

export interface SaveAttrResponse {
    orgId: number,
    dimId: number,
    extAttr: SysKeyVelue[]
}

export interface OrgContentInterface {
    visible: boolean,
    listRequest: {
        pageSize: number,
        pageNo: number,
        orgId: number
    },
    pagination: {
        current: number,
        total: number,
        pageSize: number
    },
    loadContent: number,
    loadChild: number,
    baseData: {},
    content: OrgEntity,
    relativeContent: OrgEntity,
    data: Array<OrgUser>,
    selectedTree: '',
}