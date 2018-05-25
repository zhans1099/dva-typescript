import * as React from 'react';

import '../../App.css';
import { Input } from 'antd';
import PageHeader from 'components/PageHeader/index';

const logo = require('../../logo.svg');

class App extends React.Component {
    render() {
        console.info('this is 😆😆😆 index2', Date.now(), this.props)
        return (
            <PageHeader
                title="测试的"
                content="这是常见的测试情况。"
            >
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Welcome to React 22</h1>
                    </header>
                    <p className="App-intro">
                        To get started, edit <code> this is 2</code> and save to reload.
                    </p>
                    <Input placeholder="Basic usage2" /><Input placeholder="Basic usage1" /><Input placeholder="Basic usage1" />
                </div>
            </PageHeader>
        );
    }
}

export default App;
