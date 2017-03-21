import React from 'react';
import { browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';


import AppHeader from './layout/app-header';

const App = React.createClass({

    propTypes: {
        securityContext: React.PropTypes.object
    },

    render: function() {
        const { securityContext } = this.props;

        console.log(securityContext);

        return (
            <div className="app">
                <div className="app-header">
                    <AppHeader securityContext={ securityContext }/>
                </div>
                <div className="app-body">
                    {this.props.children}
                </div>
                <div className="app-footer">footer</div>
            </div>
        );
    }
})

export default App;
