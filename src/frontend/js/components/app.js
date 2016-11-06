import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {indigo700, indigo800, indigoA700 } from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import {fade} from 'material-ui/utils/colorManipulator';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
    fontFamily: 'Hind Vadodara',
    palette: {
        primary1Color: '#304FAD',
        primary2Color: '#31469E',
        accent1Color: '#4A7CE0',
        pickerHeaderColor: '#304FAD',
    },
});

const App = React.createClass({

    render: function() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <AppBar title="StoryStation" />
                    <Paper zDepth={1} className="container-fluid" style={ { textAlign: 'center', padding: '15px' } }>
                        {this.props.children}
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    }
})

module.exports.App = App
