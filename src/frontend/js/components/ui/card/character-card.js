import React from 'react';
import { browserHistory } from 'react-router';
import {
    Card,
    Image
} from 'semantic-ui-react';

const CharacterCard = React.createClass({
    propTypes: {
        character: React.PropTypes.object.isRequired
    },
    render() {
        const { character } = this.props;
        return (
            <Card onClick={ (e) => { browserHistory.push(`/character/${character.id}/edit`)} } >
                <Card.Content className="center aligned">
                    <Image shape="circular" centered={ true } src={ character.avatar_image_url || 'https://myspace.com/common/images/user.png' } />
                    <Card.Header>{ character.name }</Card.Header>
                </Card.Content>
                <Card.Content>
                    <Card.Meta>{ [character.age, character.occupation, character.location ].filter(function (val) {return val;}).join(', ') }</Card.Meta>
                </Card.Content>
            </Card>
        );
    }
});

export default CharacterCard;
