import * as React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from './PageHeaderBace';

export default (args: any) => {
    const { children, wrapperClassName, top, ...restProps } = args;
    // children.setTitle = (title: string): void => {
    //     console.info()
    // }
    return (
        <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
            {top}
            <PageHeader key="pageheader" {...restProps} linkElement={Link} />
            {children ? <div style={{margin: '24px 24px 0'}}>{children}</div> : null}
        </div>
    )
};
