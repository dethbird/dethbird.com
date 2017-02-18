import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import App from '../components/app';
import Index from '../components/pages/index';
import store from '../store/store';

const NoMatch = React.createClass({
    render() {
        return (
            <div>Whachhu talkin about</div>
        );
    }
});

if (requestUri !== '/favicon.ico') {
    browserHistory.push(requestUri);
}

render((
    <Provider store={ store }>
        <Router history={browserHistory}>
            <Route path="/" component={ App }>
                <IndexRoute component={ Index } />
                <Route path="/index" component={ Index } />
                <Route path="*" component={ Index } />
            </Route>
        </Router>
    </Provider>
), document.getElementById('mount'));
