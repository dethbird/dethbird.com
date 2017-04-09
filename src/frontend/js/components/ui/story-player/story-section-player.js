import React from 'react';
import {
    Container
} from 'semantic-ui-react';


const StorySectionPlayer = React.createClass({
    propTypes: {
        story: React.PropTypes.object.isRequired,
        selectedItem: React.PropTypes.object.isRequired
    },
    render() {
        const { story, selectedItem } = this.props;
        // console.log(story);
        // console.log(selectedItem);
        return (
            <Container>Farts</Container>
        )
    }
})

export default StorySectionPlayer;
