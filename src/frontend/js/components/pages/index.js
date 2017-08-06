import React, { Component } from 'react';
import { FlatButton } from 'material-ui/FlatButton';


class Index extends Component {
    componentWillMount() {
        console.log('index');
    }
    render() {
        return (
            <div>
                <FlatButton icon='bookmark' label='Bookmark' />
            </div>
        );
    }
}

export default Index;
