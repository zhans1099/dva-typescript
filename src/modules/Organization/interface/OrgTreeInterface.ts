export interface OrgType {
    dimName: string,
    isDisabled: number,
    id: number
}

export interface OrgTree {
    dimId: number,
    id: number,
    pid: number,        // 一级菜单 父节点id 为 -1
    orgName: string,    // 机构名称
    orgCode?: string,   // 机构编码-后端生成
    nodeLevel: number,  // 节点层级-前端生成
    orgLevel: number | '',   // 机构层级-1 一级机构 2 二级机构  一级机构的子机构可以是一级或者二级机构 二级机构的子机构只能是二级机构 '' 时为新建时选择
    showOrder: number,  // 排序
    cityCode?: string,  // 城市code 后端生成
    isHide?: boolean,   // 是否展示节点 前端辅助数据
    childList?: OrgTree[]
}

export interface OrgTreeModelInterface {
    treeData: OrgTree[],
    pName: string,
    visible: boolean,
    treeNode: OrgTree
}