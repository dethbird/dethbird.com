import React from 'react';
import { browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {indigo700, indigo800, indigoA700 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import {fade} from 'material-ui/utils/colorManipulator';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import AppHeader from './layout/app-header';

injectTapEventPlugin();

const palette = {
    baseColor: '#2F2137',
    baseButtonColor: '#F2F2F2',
    primaryColor: '#0449A3',
    secondaryColor: '#A3038C'
}

const muiTheme = getMuiTheme({
    fontFamily: 'Hind Vadodara',
    // appBar: {
    //     color: palette.baseColor
    // },
    // floatingActionButton: {
    //     color: palette.baseButtonColor,
    //     primaryColor: palette.primaryColor,
    //     secondaryColor: palette.secondaryColor
    // },
    // flatButton: {
    //     color: palette.baseButtonColor,
    //     primaryColor: palette.primaryColor,
    //     secondaryColor: palette.secondaryColor
    // },
    // floatingActionButton: {
    //     color: palette.primaryColor,
    //     secondaryColor: palette.secondaryColor
    // },
    // raisedButton: {
    //     color: palette.baseButtonColor,
    //     primaryColor: palette.primaryColor,
    //     secondaryColor: palette.secondaryColor
    // },
    // ripple: {
    //     color: 'rgba(0,0,0,0.25)'
    // }
});

const App = React.createClass({

    render: function() {

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="app">
                    <div className="app-header">
                        <AppHeader securityContext={ securityContext }/>
                    </div>
                    <div className="app-body">
                        {this.props.children}
                    </div>
                    <div className="app-footer">footer</div>
                </div>
            </MuiThemeProvider>
        );
    }
})

module.exports.App = App
