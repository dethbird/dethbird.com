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
        securityContext: React.PropTypes.object.isRequired,
        subheader: React.PropTypes.string
    },
    renderSubheader() {
        const { subheader } = this.props;
        if (!subheader)
            return null;

        return (
            <Container textAlign="center" text>
                <Header as="h3" className='display-header'>{ subheader }</Header>
            </Container>
        )
    },
    render() {
        const { renderSubheader } = this;
        const { path, onClickLogin } = this.props;

        return (
            <Segment inverted={ true } className="external-header">
                <Container>
                    <ExternalMainMenu onClickLogin={ onClickLogin } path={ path } securityContext={ securityContext } />
                </Container>
                { renderSubheader() }
            </Segment>
        )
    }
})

export default ExternalHeader;
