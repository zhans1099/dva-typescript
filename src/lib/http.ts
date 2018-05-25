
import 'whatwg-fetch';
import {
    serialize,
} from 'lib/url';

const BODY_TYPE = {
    FORM_DATA: 'multipart/form-data',
    URL_SEARCH_PARAMS: 'application/x-www-form-urlencoded;charset=UTF-8',
    PLAIN: 'text/plain;charset=UTF-8',
    JSON: 'application/json',
};

export interface ResponseModel<T> {
    code: number,
    data: T,
    msg: string
}

export interface RequestModel {

}

const HTTP = {
    DEFAULT_PARAMS: {
        method: 'GET',
        contentType: BODY_TYPE.JSON,
        credentials: 'include',
    },

    request: (options: any) => {
        return HTTP._fetch(options);
    },

    get: (url: string, options?: any) => {
        const reqData: any = {
            method: 'GET',
            url: url,
            data: options
        }
        return HTTP._fetch(reqData);
    },

    post: (url: string, options?: any) => {
        const reqData: any = {
            method: 'POST',
            url: url,
            data: options
        }
        return HTTP._fetch(reqData);
    },

    _fetch: (options: any) => {
        const opt = HTTP.genRequestParams(options);
        return new Promise((resolve, reject) => {
            fetch(opt.url, opt.params)
                .then(function(response: any) {
                    const json = response.json();

                    if (response.ok) {
                        json.then((item: any) => {
                            if (item.code && item.code != 200) {
                                reject(item)
                            } else {
                                resolve(item.data);
                            }
                        })
                        // return json;
                    } else {
                        return json.then((err: any) => { throw err });
                    }
                }).catch(function(error) {
                reject(error);
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });
        })

    },

    genRequestParams(options: any) {
        const opt = Object.assign({}, HTTP.DEFAULT_PARAMS, options);

        const headers = HTTP.genHeader(opt);
        const method = opt.method.toUpperCase();

        let url = opt.url || '';
        let body;

        if (method === 'GET') {
            url = HTTP.genQueryString(url, opt.data);
        }

        if (method === 'POST') {
            body = HTTP.genBody(opt);
        }

        return {
            url: url,
            params: {
                method: method,
                mode: opt.mode,
                headers: headers,
                credentials: opt.credentials || 'include',
                body: body,
            },
        };
    },

    genHeader(options: any) {
        const headers = new Headers({
            'Content-Type': options.contentType,
        });

        // if (options.xxx) {
        //     headers.append('xxx', xx);
        // }

        return headers;
    },

    genQueryString(url: string, data: object) {
        if (!data) {
            return url;
        }

        const index = url.indexOf('?');

        return url + (index !== -1 ? '&' : '?') + serialize(data);//TODO:暂简单处理
    },

    genBody(obj: any) {
        const { data, contentType } = obj;
        // json format
        if (contentType === BODY_TYPE.JSON) {

            return (typeof data === 'string') ? data : JSON.stringify(data || {});
        }

        if (contentType === BODY_TYPE.URL_SEARCH_PARAMS) {
            return serialize(data);
        }

        // 其他类型直接返回
        // TODO: 后面加上其他类型的处理
        return data;
    },
};

export default HTTP;
