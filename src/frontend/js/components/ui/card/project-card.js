import React from 'react';
import { browserHistory } from 'react-router';
import {
    Card,
    Grid,
    Icon,
    Image,
    Label,
    List
} from 'semantic-ui-react';
import moment from 'moment';

import {
    tokenizeScript,
    collateScriptCharacterTokensWithCharacters
} from 'utility/script-utils';

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
            const tokens = tokenizeScript(project.stories[i].script);
            const extracted = collateScriptCharacterTokensWithCharacters(tokens.characters, []);
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
                        <Label color='violet' size='small'>
                            { subgenre.genre.name }:
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
            <Card onClick={ (e) => { browserHistory.push(`/project/${project.id}`)} } >
                <Image shape="rounded" src={ project.header_image_url || 'https://c1.staticflickr.com/3/2843/34030429372_0fce46646f_b.jpg' } />
                <Card.Content>
                    <Card.Header>{ project.name }</Card.Header>
                    <List>
                        { renderGenreLabels() }
                    </List>
                </Card.Content>
                <Card.Content extra>
                    <Grid>
                        <Grid.Column width={ 8 } floated='left'>
                            <Label>Stories:
                                <Label.Detail>{ project.stories.length } </Label.Detail>
                            </Label>
                        </Grid.Column>
                        <Grid.Column width={ 8 } floated='right' className='right aligned'>
                            <Label>
                                Characters:
                                <Label.Detail>{ characterCount() } </Label.Detail>
                            </Label>
                        </Grid.Column>
                    </Grid>
                </Card.Content>
                <Card.Content extra>
                    <List divided size='small' relaxed>
                        <List.Item>
                            <Icon name='add to calendar' />{ moment(project.date_created).format("MMM Do YY, h:mm a") }
                        </List.Item>
                        <List.Item>
                            <Icon name='calendar' />{ moment(project.date_updated).format("MMM Do YY, h:mm a") }
                        </List.Item>
                    </List>
                </Card.Content>
            </Card>
        );
    }
});

export default ProjectCard;
