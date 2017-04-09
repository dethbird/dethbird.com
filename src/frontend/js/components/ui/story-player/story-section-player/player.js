import React from 'react';
import {
    Button,
    Container,
    Grid,
    Icon,
    Segment
} from 'semantic-ui-react';

const Player = React.createClass({
    propTypes: {
        panels: React.PropTypes.array.isRequired
    },
    render() {
        const { panels } = this.props;
        if (panels.length==0) {
            return (
                <Container fluid>
                    <Segment color="red">
                        Your selection contains no Panels.
                    </Segment>
                </Container>
            );
        }
        return (
            <Segment.Group as={ Container } text>
                <Segment inverted  className="player">
                </Segment>
                <Segment>
                    <Grid>
                        <Grid.Column width={ 4 }><span>{ panels.length } panel(s)</span></Grid.Column>
                        <Grid.Column width={ 8 } textAlign="center">bar</Grid.Column>
                        <Grid.Column width={ 4 } textAlign="right">time</Grid.Column>
                    </Grid>
                </Segment>
                <Segment textAlign='center'>
                    <Button as="a"><Icon name="pause" /> Pause</Button>
                    <Button as="a" color="teal"><Icon name="play" /> Play</Button>
                </Segment>
            </Segment.Group>
        )
    }
})

export default Player;
