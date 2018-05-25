import * as React from 'react';
import { Input } from 'antd';

import '../../App.css';
import PageHeader from "../../components/PageHeader/index";

const logo = require('../../logo.svg');

class App extends React.Component {
    componentWillMount() {
        console.warn('index0 componentWillMount')
    }
    componentWillUpdate() {
        console.warn('index0 componentWillUpdate')
    }
    render() {
        console.info('this is 🙄🙄🙄 index 0', Date.now(), this.props)
        return (
            <PageHeader
                title="高级表单"
                content="高级表单常见于一次性输入和提交大批量数据的场景。"
            >
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Welcome to React 2</h1>
                    </header>
                    <p className="App-intro">
                        To get started, edit <code> this is 0</code> and save to reload.
                    </p>
                    <Input placeholder="Basic usage0" />
                </div>
            </PageHeader>
        );
    }
}

export default App;
