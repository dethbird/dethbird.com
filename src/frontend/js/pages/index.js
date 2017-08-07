import React, { Component } from 'react';
import { render } from 'react-dom';
import { 
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';;
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Devices from 'material-ui/svg-icons/device/devices';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import store from 'store/store';

// External
import Projects from 'components/pages/projects';
import Login from 'components/pages/login';

// Google Analytics
ReactGA.initialize('UA-98286537-1', {
    titleCase: false,
    gaOptions: {
        userId: securityContext.id
    }
});

const history = createBrowserHistory();

if (lastRequestUri !== '/favicon.ico') {
    history.push(lastRequestUri);
}

function requireAuth(securityContext, WrappedComponent) {
    return class extends Component {
        componentWillMount() {
            if (securityContext.id === 0) {
                document.location = '/login';
            }
        }
        render() {
            if (securityContext.id === 0) {
                return null;
            } else {
                return <WrappedComponent { ... this.props } />
            }
        }
    }
};

const logPageView = () => {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
}

const MenuLogged = (props) => (
    <IconMenu
        {...props}
        iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
        <MenuItem primaryText="Projects" onTouchTap={() => { history.push('/projects') }} />
        <MenuItem primaryText="Logout" onTouchTap={()=>{ document.location='/logout'}}/>
    </IconMenu>
);

MenuLogged.muiName = 'MenuLogged';

render((
    <MuiThemeProvider>
        <Provider store={ store }>
            <Router history={ history } onUpdate={ logPageView }>
                <div>
                    <AppBar
                        title={securityContext.username ? securityContext.username : 'storystation // clients'}
                        iconElementRight={ securityContext.id !== 0 ? <MenuLogged /> : null }
                    />
                    <br />
                    <Route path="/login" component={ Login } props={{ securityContext }} />
                    <Route exact path="/projects" component={requireAuth(securityContext, Projects)} props={{ securityContext }} />
                    <Route exact path="/" component={requireAuth(securityContext, Projects)} props={{ securityContext }} />
                </div>
            </Router>
        </Provider>
    </MuiThemeProvider>
), document.getElementById('mount'));
