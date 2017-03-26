import React from 'react';
import {
    Button,
    Container,
    Item,
    Label,
    Menu,
    Segment
} from 'semantic-ui-react';

const LoggedInHeader = React.createClass({
    propTypes: {
        path: React.PropTypes.string
    },
    render() {
        const { path } = this.props;
        return (
            <Segment inverted={ true } >
                <Container>
                    <Menu size="large" inverted={ true } secondary={ true }>
                        <Item as="a" content="Dashboard" className={ path=="dashboard" ? "active" : null } />
                        <Item as="a" content="Projects" className={ path=="projects" ? "active" : null } />
                        <Item as="a" content="Scripts" className={ path=="scripts" ? "active" : null } />
                        <Item as="a" content="Characters" className={ path=="characters" ? "active" : null } />
                        <Item content={ <Button as="a" inverted={ true } onClick={ () => { window.location.href = "/logout"} } >Logout</Button> } className="right aligned" />
                    </Menu>
                </Container>
            </Segment>
        )
    }
})

export default LoggedInHeader;
