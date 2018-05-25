import {UserInfo} from "./SysModel";

export const getCookie = (sKey: string): string => {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || ''
}

export const setCookie = (sKey: string, sValue: string, vEnd?: any, sPath?: string, sDomain?: string, bSecure?: string) => {
    if (/^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
        switch (vEnd.constructor) {
            case Number:
                sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                break;
            case String:
                sExpires = "; expires=" + vEnd;
                break;
            case Date:
                sExpires = "; expires=" + vEnd.toUTCString();
                break;
        }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
}

export const removeCookie = (sKey: string, sPath?: string, sDomain?: string):boolean => {
    if (!getCookie(sKey).length) return false;
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
    return true;
}

export const getCookieUser = (): UserInfo =>{
    const user: UserInfo = {
        email: 'shizhan.dong@owitho.com',
        phone: '18616614554',
        ssoId: 123,
        userId: 'shizhan.dong',
        userName: 'shizhan.dong',
        realName: '董诗瞻'
    }
    /**
     * email: string,
     phone: string
     ssoId: number,
     userId: string,
     userName: string
     realName: string
     *
     * */
    // const user: UserInfo = <UserInfo> (JSON.parse(getCookie('user')))
    return user;
}