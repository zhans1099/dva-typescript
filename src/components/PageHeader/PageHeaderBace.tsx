import * as React from 'react';
import { Breadcrumb, Tabs } from 'antd';
import {getBreadcrumb, urlToList, getSysBreadcrumb} from './util/util';
import {SysCrumb} from "../../lib/SysModel";
import * as classNames from 'classnames';
import './index.less';

interface PageHeaderProps {
    title: string,
    logo: string,
    action: string,
    content: string,
    extraContent: any,
    tabList: any,
    className: string,
    tabActiveKey: string,
    tabDefaultActiveKey: string,
    tabBarExtraContent: any,
    hideCrumb: any,
    onTabChange: (key :string)=>{},
    routes: any,
    params: any,
    location: any,
    breadcrumbNameMap: Map<string, SysCrumb>,
    breadcrumbList: SysCrumb[],
    breadcrumbSeparator: any,
    linkElement: any,
}


export default class PageHeader extends React.PureComponent<PageHeaderProps> {
    // static contextTypes = {
    //     routes: PropTypes.array,
    //     params: PropTypes.object,
    //     location: PropTypes.object,
    //     breadcrumbNameMap: PropTypes.object,
    // };
    onChange(key: string): void {
        if (this.props.onTabChange) {
            this.props.onTabChange(key);
        }
    }
    getBreadcrumbProps() {
        return {
            routes: this.props.routes,
            params: this.props.params,
            routerLocation: this.props.location,
            breadcrumbNameMap: this.props.breadcrumbNameMap,
        };
    }

    // Generated according to props
    conversionFromProps() {
        const { breadcrumbList, breadcrumbSeparator, linkElement = 'a' } = this.props;
        return (
            <Breadcrumb className="breadcrumb" separator={breadcrumbSeparator}>
                {breadcrumbList.map((item: SysCrumb) => (
                    <Breadcrumb.Item key={item.title}>
                        {item.href
                            ? React.createElement(
                                linkElement,
                                {
                                    [linkElement === 'a' ? 'href' : 'to']: item.href,
                                },
                                item.title
                            )
                            : item.title}
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
        );
    }


    conversionFromLocation(routerLocation: any, breadcrumbNameMap: Map<string, SysCrumb>) {
        const { breadcrumbSeparator, linkElement = 'a' } = this.props;
        // Convert the url to an array
        const pathSnippets = urlToList(routerLocation.pathname);
        // Loop data mosaic routing
        const extraBreadcrumbItems = pathSnippets.map((url: string, index: number) => {
            const currentBreadcrumb = getBreadcrumb(breadcrumbNameMap, url);
            const isLinkable = index !== pathSnippets.length - 1 && currentBreadcrumb.component;
            return currentBreadcrumb.name && !currentBreadcrumb.hideInBreadcrumb ? (
                <Breadcrumb.Item key={url}>
                    {React.createElement(
                        isLinkable ? linkElement : 'span',
                        { [linkElement === 'a' ? 'href' : 'to']: url },
                        currentBreadcrumb.name
                    )}
                </Breadcrumb.Item>
            ) : null;
        });
        // Add home breadcrumbs to your head
        extraBreadcrumbItems.unshift(
            <Breadcrumb.Item key="home">
                {React.createElement(
                    linkElement,
                    {
                        [linkElement === 'a' ? 'href' : 'to']: '/',
                    },
                    '首页'
                )}
            </Breadcrumb.Item>
        );
        return (
            <Breadcrumb className="breadcrumb" separator={breadcrumbSeparator}>
                {extraBreadcrumbItems}
            </Breadcrumb>
        );
    };

    conversionFromLocation2() {
        const crumList: SysCrumb[] = getSysBreadcrumb();
        return (
            <Breadcrumb className="breadcrumb">
                {
                    crumList.map((crum: SysCrumb) => {
                        return (
                            <Breadcrumb.Item key={crum.href}>{crum.title}</Breadcrumb.Item>
                        )
                    })
                }
            </Breadcrumb>
        );
    };
    /**
     * 将参数转化为面包屑
     * Convert parameters into breadcrumbs
     */
    conversionBreadcrumbList = () => {
        const { hideCrumb, breadcrumbList, breadcrumbSeparator } = this.props;
        if (hideCrumb) return;
        const { routes, params, routerLocation, breadcrumbNameMap } = this.getBreadcrumbProps();
        if (breadcrumbList && breadcrumbList.length) {
            return this.conversionFromProps();
        }
        // 如果传入 routes 和 params 属性
        // If pass routes and params attributes
        if (routes && params) {
            return (
                <Breadcrumb
                    className="breadcrumb"
                    routes={routes.filter((route: any) => route.breadcrumbName)}
                    params={params}
                    itemRender={this.itemRender}
                    separator={breadcrumbSeparator}
                />
            );
        }
        // 根据 location 生成 面包屑
        // Generate breadcrumbs based on location
        if (routerLocation && routerLocation.pathname) {
            return this.conversionFromLocation(routerLocation, breadcrumbNameMap);
        }
        return this.conversionFromLocation2();
    };
    // 渲染Breadcrumb 子节点
    // Render the Breadcrumb child node
    itemRender(route: any, params: any, routes: any, paths: any) {
        const { linkElement = 'a' } = this.props;
        const last = routes.indexOf(route) === routes.length - 1;
        return last || !route.component ? (
            <span>{route.breadcrumbName}</span>
        ) : (
            React.createElement(
                linkElement,
                {
                    href: paths.join('/') || '/',
                    to: paths.join('/') || '/',
                },
                route.breadcrumbName
            )
        );
    };

    render() {
        const {
            title,
            logo,
            action,
            content,
            extraContent,
            tabList,
            className,
            tabActiveKey,
            tabDefaultActiveKey,
            tabBarExtraContent,
        } = this.props;
        const clsString = classNames('pageHeader', className);
        const breadcrumb = this.conversionBreadcrumbList();
        const activeKeyProps: any = {};
        if (tabDefaultActiveKey !== undefined) {
            activeKeyProps.defaultActiveKey = tabDefaultActiveKey;
        }
        if (tabActiveKey !== undefined) {
            activeKeyProps.activeKey = tabActiveKey;
        }

        return (
            <div className={clsString}>
                {breadcrumb}
                <div className="detail">
                    {logo && <div className="logo">{logo}</div>}
                    <div className="main">
                        <div className="row">
                            {title && <h1 className="title">{title}</h1>}
                            {action && <div className="action">{action}</div>}
                        </div>
                        <div className="row">
                            {content && <div className="content">{content}</div>}
                            {extraContent && <div className="extraContent">{extraContent}</div>}
                        </div>
                    </div>
                </div>
                {tabList &&
                tabList.length && (
                    <Tabs
                        className="tabs"
                        {...activeKeyProps}
                        onChange={this.onChange}
                        tabBarExtraContent={tabBarExtraContent}
                    >
                        {tabList.map((item: any) => <Tabs.TabPane tab={item.tab} key={item.key} />)}
                    </Tabs>
                )}
            </div>
        );
    }
}
