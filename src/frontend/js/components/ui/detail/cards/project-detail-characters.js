import React from 'react';
import { connect } from 'react-redux';
import {
    Card,
    Container,
    Image
} from 'semantic-ui-react';

import CharacterCard from 'components/ui/card/character-card';
import { UI_STATE } from 'constants/ui-state';
import { charactersGet } from 'actions/character';

import {
    collateProjectScriptCharactersWithCharacters
} from 'utility/fountain-parser';

const ProjectDetailCharacters = React.createClass({
    propTypes: {
        project: React.PropTypes.object.isRequired
    },
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(charactersGet());
    },
    renderCharacterCardNotFound(character, i) {
        return (
            <Card key={ i }>
                <Card.Content className="center aligned">
                    <Image shape="circular" spaced={ true } centered={ true } src={ 'https://myspace.com/common/images/user.png' } />
                    <Card.Header>{ character.name }</Card.Header>
                </Card.Content>
            </Card>
        );
    },
    renderCharacterCardExisting(character, i) {
        return (
            <Card key={ i }>
                <Card.Content className="center aligned">
                    <Image shape="circular" spaced={ true } centered={ true } src={ character.existing.avatar_image_url ? character.existing.avatar_image_url : 'https://myspace.com/common/images/user.png' } />
                    <Card.Header>{ character.name }</Card.Header>
                    <Card.Meta>{ [character.existing.age, character.existing.gender ].filter(function (val) {return val;}).join(', ') }</Card.Meta>
                    <Card.Description>{ [character.existing.occupation, character.existing.location ].filter(function (val) {return val;}).join(', ') }</Card.Description>
                </Card.Content>
            </Card>
        );
    },
    render() {
        const { renderCharacterCardExisting, renderCharacterCardNotFound } = this;
        const { project, models } = this.props;
        if (!models)
            return false;
        const characters = collateProjectScriptCharactersWithCharacters(
            project,
            models
        );
        console.log(characters);
        const existingNodes = characters.existing.map(function(character, i){
            return (
                renderCharacterCardExisting(character, i)
            );
        });
        const notFoundNodes = characters.not_found.map(function(character, i){
            return (
                renderCharacterCardNotFound(character, i)
            );
        });

        return (
            <div>
                <Container>
                    <Card.Group itemsPerRow={ 4 } >
                        { existingNodes }
                    </Card.Group>
                </Container>
                <Container>
                    <Card.Group itemsPerRow={ 4 } >
                        { notFoundNodes }
                    </Card.Group>
                </Container>
            </div>
        );
    }
});

const mapStateToProps = (state) => {
    const { ui_state, errors, models } = state.charactersReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        models
    }
}

export default connect(mapStateToProps)(ProjectDetailCharacters);
