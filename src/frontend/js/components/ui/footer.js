import React from 'react';
import {
    Container,
    Grid,
    Header,
    List,
    Segment
} from 'semantic-ui-react';

const Footer = React.createClass({
    render() {
        return (
            <Segment inverted={ true } className="footer">
                <Container>
                    <Grid stackable={ true } divided={ true } stretched={ true }>
                        <Grid.Column largeScreen={ 3 }>
                            <Header as="h4" inverted={ true }>About</Header>
                            <List inverted={ true } link={ true}>
                                <List.Item as="a">Sitemap</List.Item>
                                <List.Item as="a">Contact Us</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column largeScreen={ 3 }>
                            <Header as="h4" inverted={ true }>Services</Header>
                            <List inverted={ true } link={ true}>
                                <List.Item as="a">Sitemap</List.Item>
                                <List.Item as="a">Contact Us</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column largeScreen={ 7 }>
                            <Header as="h4" inverted={ true }>Footer Header</Header>
                            <List inverted={ true } link={ true}>
                                <List.Item as="a">Sitemap</List.Item>
                                <List.Item as="a">Contact Us</List.Item>
                            </List>
                        </Grid.Column>
                    </Grid>
                </Container>
            </Segment>
        )
    }
})

export default Footer;
