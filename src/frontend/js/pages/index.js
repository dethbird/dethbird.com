import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';

import App from 'components/app';

// External
import Activate from 'components/pages/activate';
import Index from 'components/pages/index';
import Contact from 'components/pages/contact';
import Newsfeed from 'components/pages/newsfeed';
import PrivateBeta from 'components/pages/private-beta';
import PrivateBetaApply from 'components/pages/private-beta-apply';
import Verify from 'components/pages/verify';
import Product from 'components/pages/product';

// Admin
import AdminUsers from 'components/pages/admin-users';
import AdminUserEdit from 'components/pages/admin-user-edit';

// Internal
import Dashboard from 'components/pages/dashboard';
import CharacterEdit from 'components/pages/character-edit';
import Characters from 'components/pages/characters';
import ProjectEdit from 'components/pages/project-edit';
import Project from 'components/pages/project';
import Projects from 'components/pages/projects';
import StoryEdit from 'components/pages/story-edit';
import StoryEditDemo from 'components/pages/story-edit-demo';
import StoryPlay from 'components/pages/story-play';
import StoryPlayDemo from 'components/pages/story-play-demo';
import Stories from 'components/pages/stories';
import store from 'store/store';

// Google Analytics
ReactGA.initialize('UA-98286537-1', {
    titleCase: false,
    gaOptions: {
        userId: securityContext.id
    }
});

if (lastRequestUri !== '/favicon.ico') {
    browserHistory.replace(lastRequestUri);
}

const NoMatch = React.createClass({
    render() {
        return (
            <div>Whachhu talkin about?</div>
        );
    }
});

const requireAuth = (nextState, replace, callback) => {
    if (securityContext.application_user === 1) {
        replace('/');
    }
    return callback();
};

const requireAdmin = (nextState, replace, callback) => {
    if (securityContext.admin_user !== 1) {
        replace('/');
    }
    return callback();
};

const logPageView = () => {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
}

render((
    <Provider store={ store }>
        <Router history={browserHistory} onUpdate={ logPageView }>
            <Route path="/" component={ App } props={ { securityContext } }>
                <IndexRoute component={ Index } props={ { securityContext } } />

                /** admin */
                <Route path="admin/users" component={ AdminUsers } props={ { securityContext } } onEnter={ requireAdmin } />
                <Route path="admin/user/:id/edit" component={ AdminUserEdit } props={ { securityContext } } onEnter={ requireAdmin } />

                /** external */
                <Route path="activate" component={ Activate } props={ { securityContext, activationUser } } />
                <Route path="contact" component={ Contact } props={ { securityContext } }/>
                <Route path="newsfeed" component={ Newsfeed } props={ { securityContext } }/>
                <Route path="private-beta/apply" component={ PrivateBetaApply } props={ { securityContext } }/>
                <Route path="private-beta" component={ PrivateBeta } props={ { securityContext } }/>
                <Route path="product" component={ Product } props={ { securityContext } }/>
                <Route path="product/demo/storyplayer" component={ StoryPlayDemo } props={ { securityContext } }/>
                <Route path="product/demo/storyeditor" component={ StoryEditDemo } props={ { securityContext } }/>
                <Route path="verify" component={ Verify } props={ { securityContext, verifyUser } } />

                /** internal */
                <Route path="projects" component={ Projects } props={ { securityContext } }  onEnter={ requireAuth }/>
                <Route path="project/create" component={ ProjectEdit } props={ { securityContext } }  onEnter={ requireAuth }/>
                <Route path="project/:id/edit" component={ ProjectEdit } props={ { securityContext } }  onEnter={ requireAuth }/>
                <Route path="project/:id" component={ Project } props={ { securityContext } }  onEnter={ requireAuth }/>
                <Route path="dashboard" component={ Dashboard } props={ { securityContext } } onEnter={ requireAuth }/>
                <Route path="characters" component={ Characters } props={ { securityContext } }  onEnter={ requireAuth }/>
                <Route path="character/create" component={ CharacterEdit } props={ { securityContext } }  onEnter={ requireAuth }/>
                <Route path="character/:id/edit" component={ CharacterEdit } props={ { securityContext } }  onEnter={ requireAuth }/>
                <Route path="stories" component={ Stories } props={ { securityContext } }  onEnter={ requireAuth }/>
                <Route path="story/create" component={ StoryEdit } props={ { securityContext } }  onEnter={ requireAuth }/>
                <Route path="story/create/project/:projectId" component={ StoryEdit } props={ { securityContext } }  onEnter={ requireAuth }/>
                <Route path="story/:id/edit" component={ StoryEdit } props={ { securityContext } }  onEnter={ requireAuth }/>
                <Route path="story/:id/play" component={ StoryPlay } props={ { securityContext } }  onEnter={ requireAuth }/>

                <Route path="*" component={ Index } props={ { securityContext } } />
            </Route>
        </Router>
    </Provider>
), document.getElementById('mount'));
