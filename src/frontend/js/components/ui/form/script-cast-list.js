import React from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Container,
    Image,
    Item,
    Icon
} from 'semantic-ui-react';

import { UI_STATE } from 'constants/ui-state';
import { charactersGet } from 'actions/character';

import { collateScriptCharactersWithCharacters } from 'utility/fountain-parser';

const ScriptCastList = React.createClass({
    propTypes: {
        script: React.PropTypes.string.isRequired
    },
    getInitialState() {
        return {
            models: []
        }
    },
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(charactersGet());
    },
    renderCharacters(chars) {
        const renderButton = (existing) => {
            if(existing) {
                return <Button icon="edit" size="mini" basic></Button>
            } else {
                return <Button icon="add" size="mini" basic color="green"></Button>
            }
        }
        const nodes = chars.map(function(char, i){
            return (
                <Item key={ i }>{renderButton(char.existing)} <Image src={ char.existing ? char.existing.avatar_image_url : 'https://myspace.com/common/images/user.png' } avatar spaced /> { char.name }</Item>
            )
        });
        return nodes;
    },
    render() {
        const { renderCharacters } = this;
        const { models, ui_state, errors, script } = this.props;

        if(!script)
            return null;

        // cross check script characters with saved characters
        const collated = collateScriptCharactersWithCharacters(script, models);
        console.log(collated);
        return (
            <Container text={ true }>
                <Item.Group>
                    { renderCharacters(collated.existing) }
                    { renderCharacters(collated.not_found) }
                </Item.Group>
            </Container>
        )
    }
})

const mapStateToProps = (state) => {
    const { ui_state, errors, models } = state.charactersReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        models
    }
}

export default connect(mapStateToProps)(ScriptCastList);
