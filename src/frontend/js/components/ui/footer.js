import React from 'react';
import {
    Segment
} from 'semantic-ui-react';

const Footer = React.createClass({
    render() {
        const { onClickLogin } = this.props;

        return (
            <Segment inverted={ true }>Footer</Segment>
        )
    }
})

export default Footer;
