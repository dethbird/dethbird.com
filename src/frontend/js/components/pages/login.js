import React, { Component } from 'react';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Devices from 'material-ui/svg-icons/device/devices';

import Container from 'components/layout/container';

class Login extends Component {
    componentWillMount() {
        console.log('login');
    }
    render() {
        return (
            <Container>
                <Card>
                    <CardTitle title="Login, Honcho" />
                    <CardText>
                        <TextField type='email' floatingLabelText='Email' name='email' fullWidth/>
                        <br />
                        <TextField type='password' floatingLabelText='Password' name='password' fullWidth/>
                    </CardText>
                    <CardActions>
                        <FlatButton icon={<Devices /> } label='Login' labelPosition='before' primary />
                    </CardActions>
                </Card>
            </Container>
        )
    }
}
export default Login;
