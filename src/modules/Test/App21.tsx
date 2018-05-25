import * as React from 'react';

import '../../App.css';
import { Input } from 'antd';

const logo = require('../../logo.svg');

class App extends React.Component {
    componentWillMount() {
        console.warn('index1 componentWillMount')
    }
    componentWillUpdate() {
        console.warn('index1 componentWillUpdate')
    }
    render() {
        console.info('this is 😆😆😆 index1', Date.now(), this.props)
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React 21</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code> this is 1</code> and save to reload.
                </p>
                <Input placeholder="Basic usage1" /><Input placeholder="Basic usage1" />
            </div>
        );
    }
}

export default App;
