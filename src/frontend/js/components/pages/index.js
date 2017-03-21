import React from 'react';

import Button from 'components/ui/button';
import Container from 'components/ui/container';
import ItemLink from 'components/ui/item-link';
import ItemContainer from 'components/ui/item-container';
import Menu from 'components/ui/menu';
import SegmentVertical from 'components/ui/segment-vertical';
import Segments from 'components/ui/segments';

const Index = React.createClass({
    render() {
        const { securityContext } = this.props.route.props;
        return (
            <Segments>
                <SegmentVertical className={ ['inverted', 'masthead'] }>
                    <Container>
                        <Menu className={ ['large', 'secondary', 'inverted', 'pointing'] }>
                            <ItemLink className="active">One</ItemLink>
                            <ItemLink>Two</ItemLink>
                            <ItemContainer>
                                <Button className="inverted">Login</Button>
                                <Button className="inverted">Signup</Button>
                            </ItemContainer>
                        </Menu>
                    </Container>
                </SegmentVertical>
                <SegmentVertical>index</SegmentVertical>
                <SegmentVertical className="inverted">index</SegmentVertical>
            </Segments>
        )
    }
})

export default Index;
