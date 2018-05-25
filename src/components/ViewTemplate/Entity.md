---
title: 模板配置参数数目
---

示例数据。

````ts
{
      attrName: string
      attrDesc: string
      attrType: string
      request?: boolean
      disabled? :boolean
      "regexp"?: [{
        code: "{d[1]}",
        msg: "部门不能为空"
      }, {
        code: "{d[50]}",
        msg: "部门过长"
      }],
      "attrValueList": [
        {
          "code": "PB",
          "desc": "PB"
        },
        {
          "code": "NB",
          "desc": "NB"
        },
        {
          "code": "EP",
          "desc": "设备"
        }
      ]
    }
````


参数说明

| 参数      | 说明  |  默认值 |
|----------|-------|-------|
| attrName | 字段名 | 必填 |
| attrDesc | 描述 | 必填 |
| attrType | 类型 | 必填 |
| regexp | 正则校验 |  |
| request | 是否必填 | false |
| disabled | 不可编辑 | false |
| attrValueList| 下拉选项 |


attrType说明

| 值      | 说明  | 
|----------|-------|
| radio | radio选择 |
| select | 下拉选择 |
| date | 日期 |
| time | 时间 |
| datetime | 日期时间 |
| float| 含有小数点的数字 |
| integer| 整数 |
| string | 字符串 |
| print | 纯展示 |
| OWO.xxxx | 自定义组件 xxx 为组件名 |