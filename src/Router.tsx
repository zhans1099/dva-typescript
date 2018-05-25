import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Container from './components/Container/ContainerPage'

export default () => {
    return (
        <Router>
            <Route path="/app" component={Container} />

        </Router>
    );
}
