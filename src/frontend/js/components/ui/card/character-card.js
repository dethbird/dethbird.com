import React from 'react';
import { browserHistory } from 'react-router';
import {
    Card,
    Icon,
    Image,
    List
} from 'semantic-ui-react';
import moment from 'moment';

const CharacterCard = React.createClass({
    propTypes: {
        character: React.PropTypes.object.isRequired
    },
    render() {
        const { character } = this.props;
        return (
            <Card onClick={ (e) => { browserHistory.push(`/character/${character.id}/edit`)} } >
                <Card.Content className="center aligned">
                    <Image shape="circular" spaced={ true } centered={ true } src={ character.avatar_image_url || 'https://myspace.com/common/images/user.png' } />
                    <Card.Header>{ character.name }</Card.Header>
                    <Card.Meta>{ [character.age, character.gender ].filter(function (val) {return val;}).join(', ') }</Card.Meta>
                    <Card.Description>{ [character.occupation, character.location ].filter(function (val) {return val;}).join(', ') }</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <List divided size='small' relaxed>
                        <List.Item>
                            <Icon name='add to calendar' />{ moment(character.date_created).format("MMM Do YY, h:mm a") }
                        </List.Item>
                        <List.Item>
                            <Icon name='calendar' />{ moment(character.date_updated).format("MMM Do YY, h:mm a") }
                        </List.Item>
                    </List>
                </Card.Content>
            </Card>
        );
    }
});

export default CharacterCard;
