import React from 'react';
import {
    Container,
    Header,
    Segment,
} from 'semantic-ui-react';


const CharacterEdit = React.createClass({
    render() {
        const { securityContext } = this.props.route.props;

        return (
            <Container className="main-content">
                Content
            </Container>
        );
    }
})

export default CharacterEdit;
