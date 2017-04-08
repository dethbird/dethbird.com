import React from 'react';
import {
    Button,
    Card,
    Header,
    Grid
} from 'semantic-ui-react';


const SceneItem = React.createClass({
    propTypes: {
        scene: React.PropTypes.object.isRequired
    },
    render() {
        const { scene } = this.props;

        return (
            <Card fluid>
                <Card.Content>
                    <Header>{ scene.level_text + ' ' + scene.text }</Header>
                </Card.Content>
            </Card>
        )
    }
})

export default SceneItem;
