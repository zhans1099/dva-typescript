
import {SysMenu} from "../interface/ContainerInterface";

class Entity {
    private menuList: SysMenu[]
    private authList: string[]
    private menuMap: Map<string, SysMenu>

    constructor() {
        this.menuList = [];
        this.authList = [];
        this.menuMap = new Map<string, SysMenu>();
    }

    public initialization(menuList: SysMenu[]): void {
        this.menuList = menuList;
        this.addAuth(menuList)
    };
    private addAuth(menuList: SysMenu[]) {
        menuList.forEach((menu: SysMenu) => {
            this.authList.push(menu.code);
            this.menuMap.set(menu.actionUrl, menu);
            if (menu.childsMenu && menu.childsMenu.length > 0) {
                this.addAuth(menu.childsMenu);
            }
        })
    }
    public findMenuByUrl(url: string): SysMenu | undefined {
        return this.menuMap.get(url)
    }
    public getMenuList() {
        return this.menuList;
    }
    public hasAuth(key: string) {
        return this.authList.indexOf(key) > -1;
    }
}

const menuUtil = new Entity();

export default menuUtil;