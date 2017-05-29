import React from 'react';
import { browserHistory } from 'react-router';
import {
    Card,
    Grid,
    Header,
    Icon,
    Image,
    Label,
    List
} from 'semantic-ui-react';
import moment from 'moment';

import { convertTokensToStory, tokenizeScript, millisecondsToDuration } from 'utility/script-utils';
// import { getScriptStats } from 'utility/fountain-parser';

const StoryCard = React.createClass({
    propTypes: {
        story: React.PropTypes.object.isRequired
    },
    renderCharacters(characters) {
        if (!characters)
            return null;
        const nodes = characters.map(function(character,i){
            return (
                <List.Item key={ i }>
                    <List.Content>
                        <Label size='small' basic color='teal'>{ character.name }</Label>
                    </List.Content>
                </List.Item>
            )
        });
        return (
            <List horizontal>
                { nodes }
            </List>
        )
    },
    render() {
        const { renderCharacters } = this;
        const { story } = this.props;
        // const stats = getScriptStats(story.script);
        const tokens = tokenizeScript(story.script);
        const model = convertTokensToStory(tokens);
        return (
            <Card onClick={ (e) => { browserHistory.push(`/story/${story.id}/edit`)} } >
                <Card.Content className="center aligned">
                    <Header as="h3">{ story.name }</Header>
                </Card.Content>
                <Card.Content>
                    <Header as="h4">Characters</Header>
                    { renderCharacters(tokens.characters) }
                </Card.Content>
                <Card.Content extra>
                    <Grid>
                        <Grid.Column width={ 5 }>
                            { model.stats.acts } Acts
                        </Grid.Column>
                        <Grid.Column width={ 5 } textAlign='center'>
                            { model.stats.panels } Panels
                        </Grid.Column>
                        <Grid.Column width={ 6 } textAlign='right'>
                            <Icon name="time" />{ millisecondsToDuration(model.duration_in_milliseconds) }
                        </Grid.Column>
                    </Grid>
                </Card.Content>
                <Card.Content extra>
                    <List divided size='small' relaxed>
                        <List.Item>
                            <Icon name='add to calendar' />{ moment(story.date_created).format("MMM Do YY, h:mm a") }
                        </List.Item>
                        <List.Item>
                            <Icon name='calendar' />{ moment(story.date_updated).format("MMM Do YY, h:mm a") }
                        </List.Item>
                    </List>
                </Card.Content>
            </Card>
        );
    }
});

export default StoryCard;
