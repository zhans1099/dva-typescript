import {ViewHTMLNode} from "components/ViewTemplate/Entity";

export interface OrgPageModelInterface {
    orgId: number,
    expendConfig: {
        nodes: Array<ViewHTMLNode>
    },
    orgType: {
        dimName: string,
        isDisabled: number,
        id: number
    },
    canEditTree: boolean
}