import React from 'react';
import {
    Button,
    Container,
    Header,
    Image,
    Menu,
    Segment
} from 'semantic-ui-react';

import ExternalMainMenu from 'components/ui/menu/external-main-menu';

const ExternalHeader = React.createClass({
    propTypes: {
        path: React.PropTypes.string,
        onClickLogin: React.PropTypes.func.isRequired,
        securityContext: React.PropTypes.object.isRequired
    },
    render() {
        const { path, onClickLogin } = this.props;

        return (
            <Segment inverted={ true } className="external-header">
                <Container>
                    <ExternalMainMenu onClickLogin={ onClickLogin } path={ path } securityContext={ securityContext } />
                </Container>
            </Segment>
        )
    }
})

export default ExternalHeader;
