import React, { Component } from 'react';
import { render } from 'react-dom';
import { 
    Router,
    Route
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
import { Provider } from 'react-redux';

/** Material UI */
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { grey500, grey800 } from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import store from 'store/store';

// External
import Index from 'components/pages/index';
import Projects from 'components/pages/projects';
import ProjectStoryboard from 'components/pages/project-storyboard';
import Login from 'components/pages/login';

import NavigationHeader from 'components/navigation/header';

if (lastRequestUri !== '/favicon.ico') {
    history.replace(lastRequestUri);
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
                return <WrappedComponent securityContext={ securityContext } { ...this.props } />
            }
        }
    }
};

const palette = {
    baseColor: '#3E43C9',
    baseButtonColor: '#F2F2F2',
    primaryColor: '#15A599',
    secondaryColor: '#A3038C'
}

const muiTheme = getMuiTheme({
    appBar: {
        color: palette.baseColor,
        textColor: '#FFFFFF'
    },
    floatingActionButton: {
        color: palette.baseButtonColor,
        primaryColor: palette.primaryColor,
        secondaryColor: palette.secondaryColor
    },
    flatButton: {
        color: palette.baseButtonColor,
        primaryColor: palette.primaryColor,
        secondaryColor: palette.secondaryColor
    },
    floatingActionButton: {
        color: palette.primaryColor,
        secondaryColor: palette.secondaryColor
    }, 
    svgIcon: {
        color: grey500
    },
    raisedButton: {
        color: palette.baseButtonColor,
        primaryColor: palette.primaryColor,
        secondaryColor: palette.secondaryColor
    }
});

render((
    <Router history={ history }>
        <MuiThemeProvider muiTheme={muiTheme}>
            <Provider store={ store }>
                    <div>
                        <NavigationHeader securityContext={securityContext} />
                        <Route path="/login" component={ Login } props={{ securityContext }} />
                        <Route exact path="/projects" component={requireAuth(securityContext, Projects)} props={{ securityContext }} />
                        <Route exact path="/project/:projectId/storyboard/:storyboardId" component={requireAuth(securityContext, ProjectStoryboard)} props={{ securityContext }} />
                        <Route exact path="/" component={requireAuth(securityContext, Index)} props={{ securityContext }} />
                    </div>
            </Provider>
        </MuiThemeProvider>
    </Router>
), document.getElementById('mount'));
