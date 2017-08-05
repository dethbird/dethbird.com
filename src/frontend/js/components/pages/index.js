import React, { Component } from 'react';
import { Button } from 'react-toolbox';


class Index extends Component {
    componentWillMount() {
        console.log('index');
    }
    render() {
        return (
            <div>
                <Button icon='bookmark' label='Bookmark' />
            </div>
        );
    }
}

export default Index;
