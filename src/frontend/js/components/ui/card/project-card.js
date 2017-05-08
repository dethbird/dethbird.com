import React from 'react';
import { browserHistory } from 'react-router';
import {
    Card,
    Grid,
    Image,
    Label,
    List
} from 'semantic-ui-react';

import { collateScriptCharactersWithCharacters } from 'utility/fountain-parser';

const ProjectCard = React.createClass({
    propTypes: {
        project: React.PropTypes.object.isRequired
    },
    characterCount() {
        const { project } = this.props;
        if (project.stories.length == 0)
            return 0;

        let characters = [];
        for (const i in project.stories) {
            const extracted = collateScriptCharactersWithCharacters(project.stories[i].script, []);
            characters = { ... characters, ... extracted.not_found };
            characters = { ... characters, ... extracted.existing };
        }
        return Object.keys(characters).length;
    },
    renderGenreLabels() {
        const { project } = this.props;
        if (project.subgenres.length==0)
            return null;

        const nodes = project.subgenres.map(function(subgenre, i){
            return (
                <List.Item key={ i } >
                    <List.Content>
                        <Label color='yellow' size='small'>
                            { subgenre.genre.name }
                            <Label.Detail>{ subgenre.name }</Label.Detail>
                        </Label>
                    </List.Content>
                </List.Item>

            );
        });
        return nodes;
    },
    render() {
        const { characterCount, renderGenreLabels } = this;
        const { project } = this.props;

        return (
            <Card onClick={ (e) => { browserHistory.push(`/project/${project.id}/edit`)} } >
                <Image shape="rounded" src={ project.avatar_image_url || 'https://c1.staticflickr.com/3/2843/34030429372_0fce46646f_b.jpg' } />
                <Card.Content>
                    <Card.Header>{ project.name }</Card.Header>
                    <List>
                        { renderGenreLabels() }
                    </List>
                </Card.Content>
                <Card.Content>
                    <Grid>
                        <Grid.Column width={ 8 } floated='left'>
                            { project.stories.length } Stories
                        </Grid.Column>
                        <Grid.Column width={ 8 } floated='right' className='right aligned'>
                            { characterCount() } Characters
                        </Grid.Column>
                    </Grid>
                </Card.Content>
            </Card>
        );
    }
});

export default ProjectCard;
