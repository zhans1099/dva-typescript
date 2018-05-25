/**
 * 序列化url参数
 * @param  {object | array} obj 需要序列化的对象
 * @param  {string} prefix 拼接时是否需要将key全转为小写
 * @return {string} 序列化的参数
 *
 * eg. 1. key1=val1&key2=val2&...
 *     2. key[0]=1&key[1]=2&key[3][e]=a&key[3][d]=t
 */

import {isArray, isObject} from "util";

export function serialize(obj: object, prefix?: string): string {
    const arr: string[] = [];

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const val = obj[key];
            const newKey = prefix ? prefix + '[' + key + ']' : key;

            if (isArray(val) || isObject(val)) {
                arr.push(serialize(val, newKey));
            } else {
                arr.push(`${encodeURIComponent(newKey)}=${encodeURIComponent(val)}`);
            }
        }
    }

    return arr.join('&');
}

export function parseURL(url: string): any {
    if (document) {
        const a: any = document.createElement('a');
        a.href = url;
        return {
            href: url,
            protocol: a.protocol,
            host: a.host,
            hostname: a.hostname,
            port: a.port,
            search: a.search,
            hash: a.hash,
            pathname: a.pathname
        };
    }
}

export function getQueryList(url: string): object {
    const search = parseURL(url).search;
    const result = search.match(new RegExp('[?&][^?&]+=?[^?&]*', 'g'));
    if (result === null) {
        return [];
    }
    const retObj = {};
    let name;
    let qs;
    for (let i = 0; i < result.length; i++) {
        result[i] = result[i].substring(1);
        qs = result[i].split('=');
        name = qs[0];
        if (retObj[name] !== undefined) {
            qs.length > 1 && retObj[name].push(qs[1]);
        } else {
            retObj[name] = qs.length > 1 ? [qs[1]] : [];
        }
    }
    return retObj;
}

export function getQueryString(name: string, url: string, ignore: any) {
    const qsList = getQueryList(url);
    const ig = !!ignore;
    if (ig) {
        const queryName = name.toLowerCase();
        let arr: any[] = [];
        let n;
        for (n in qsList) {
            if (n.toLowerCase() === queryName) {
                arr = arr.concat(qsList[n]);
            }
        }
        return arr;
    } else {
        return qsList[name];
    }
}

export function setQueryString(query: any, url: string, ignore: any, needtidy: any) {
    const qsList = getQueryList(url);
    const hasQS = (name: any, list: any, ig: any) => {
        if (ig) {
            let s;
            for (s in list) {
                if (s.toLowerCase() === name.toLowerCase()) {
                    return true;
                }
            }
            return false;
        } else {
            return list[name] !== undefined;
        }
    };
    let name;
    for (name in query) {
        if (hasQS(name, qsList, ignore)) {
            if (ignore) {
                let qname;
                for (qname in qsList) {
                    if (qname.toLowerCase() === name.toLowerCase()) {
                        if (query[name] !== null) {
                            qsList[qname] = qsList[qname].concat(query[name] instanceof Array ? query[name] : [query[name]]);
                        } else {
                            delete qsList[qname];
                        }
                    }
                }
            } else if (query[name] !== null) {
                qsList[name] = qsList[name].concat(query[name] instanceof Array ? query[name] : [query[name]]);
            } else {
                delete qsList[name];
            }
        } else if (query[name] !== null) {
            qsList[name] = query[name] instanceof Array ? query[name] : [query[name]];
        }
    }
    const qs = [];
    let qv;
    for (name in qsList) {
        if (!!needtidy) {
            if (qsList[name].length > 0) {
                qv = qsList[name].pop();
                qv !== null && qs.push(name + '=' + qv);
            } else {
                qs.push(name);
            }
        } else if (qsList[name].length > 0) {
            if (qsList[name].indexOf(null) < 0) {
                for (let i = 0; i < qsList[name].length; i++) {
                    qv = qsList[name][i];
                    qs.push(name + '=' + qv);
                }
            }
        } else {
            qs.push(name);
        }
    }
    return '?' + qs.join('&');
}
