import React from 'react';
import * as _ from 'underscore';
import {
    Button,
    Label,
    List
} from 'semantic-ui-react';

const ProjectSubgenreInput = React.createClass({
    propTypes: {
        subgenres: React.PropTypes.array
    },
    renderGenreLabels() {
        const { subgenres } = this.props;
        if (subgenres.length==0)
            return null;

        const nodes = subgenres.map(function(subgenre, i){
            return (
                <List.Item key={ i } >
                    <List.Content>
                        <Label color='teal'>
                            { subgenre.genre.name }:
                            <Label.Detail>{ subgenre.name }</Label.Detail>
                        </Label>
                    </List.Content>
                </List.Item>

            );
        });
        nodes.push(
            <List.Item key={ nodes.length } >
                <List.Content>
                    <Button icon='add' size='mini'/>
                </List.Content>
            </List.Item>
        );
        return nodes;
    },
    render() {
        const { renderGenreLabels } = this;
        const { subgenres } = this.props;
        return (
            <List horizontal>
                { renderGenreLabels() }
            </List>
        );
    }
})

export default ProjectSubgenreInput;
