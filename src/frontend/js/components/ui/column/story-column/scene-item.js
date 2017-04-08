import React from 'react';
import {
    Card
} from 'semantic-ui-react';


const SceneItem = React.createClass({
    propTypes: {
        scene: React.PropTypes.object.isRequired
    },
    render() {
        const { scene } = this.props;

        return (
            <Card fluid>
                <Card.Content header={ scene.level_text + ' ' + scene.text } />
            </Card>
        )
    }
})

export default SceneItem;
