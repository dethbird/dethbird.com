import React from 'react';
import {
    Button,
    Container,
    Segment
} from 'semantic-ui-react';

const Player = React.createClass({
    propTypes: {
        panels: React.PropTypes.array.isRequired
    },
    render() {
        const { panels } = this.props;
        return (
            <Segment inverted className="player">
                <Container text textAlign='center'>{ panels.length } panel(s) selected!</Container>
                <Container text textAlign='center'><Button as="a" primary>Play</Button></Container>
            </Segment>
        )
    }
})

export default Player;
