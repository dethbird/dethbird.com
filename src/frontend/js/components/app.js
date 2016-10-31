import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {blue700, blue800, pink600} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: blue700,
        primary2Color: blue800,
        accent1Color: pink600,
        pickerHeaderColor: blue800,
    },
});

const App = React.createClass({

    render: function() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <AppBar title="StoryStation" />
                    <Paper zDepth={1} className="container" style={ { textAlign: 'center', padding: '15px' } }>
                        {this.props.children}
                    </Paper>
                </div>
            </MuiThemeProvider>
        );
    }
})

module.exports.App = App
