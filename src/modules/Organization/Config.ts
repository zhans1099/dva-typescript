import {ColProps} from "antd/lib/grid";

interface formItemLayoutProps {
    labelCol: ColProps,
    wrapperCol: ColProps
}

export const formItemLayout: formItemLayoutProps = <formItemLayoutProps>{
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

export const submitFormLayout: formItemLayoutProps = <formItemLayoutProps>{
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
    },
};