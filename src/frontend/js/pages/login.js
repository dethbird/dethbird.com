import React from 'react'
import { render } from 'react-dom'
import { IndexRoute, Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

import store from '../store/store';
import { App } from '../components/app'
import Login from '../components/pages/login'


const NoMatch = React.createClass({
  render() {
    return (
      <div>Whachhu talkin about</div>
    )
  }
})

render((
    <Provider store={ store }>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Login}/>
                <Route path="login" component={Login}/>
                <Route path="*" component={Login}/>
            </Route>
        </Router>
    </Provider>
), document.getElementById('mount'))
