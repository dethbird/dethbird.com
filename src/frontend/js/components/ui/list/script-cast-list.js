import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import {
    Button,
    Container,
    Image,
    Item,
    Icon,
    Loader
} from 'semantic-ui-react';

import { UI_STATE } from 'constants/ui-state';
import { charactersGet, charactersGetDemo, charactersPostOne, charactersPostOneDemo } from 'actions/character';

// import { collateScriptCharactersWithCharacters } from 'utility/fountain-parser';
import { collateScriptCharacterTokensWithCharacters } from 'utility/script-utils';

const ScriptCastList = React.createClass({
    propTypes: {
        scriptCharacters: React.PropTypes.array.isRequired,
        demo: React.PropTypes.bool,
        displayMode: React.PropTypes.bool
    },
    getInitialState() {
        return {
            models: []
        }
    },
    componentWillMount() {
        const { demo, dispatch } = this.props;
        if(demo===true){
            dispatch(charactersGetDemo());
        } else {
            dispatch(charactersGet());
        }
    },
    handleClickCreateCharacter(e, payload){
        const { demo, dispatch, models } = this.props;
        if (demo===true) {
            dispatch(charactersPostOneDemo(models, payload));
        } else {
            dispatch(charactersPostOne(payload));
        }
    },
    renderCharacters(chars) {
        const { handleClickCreateCharacter } = this;
        const { displayMode } = this.props;
        const renderButton = (name, existing) => {
            if (displayMode===true)
                return null;

            if(existing) {
                return <Button as="a" icon="edit" size="mini" basic onClick={()=>{ browserHistory.push(`/character/${existing.id}/edit`) }}></Button>
            } else {
                return <Button as="a" icon="add" size="mini" basic color="green" onClick={ (e)=>{ handleClickCreateCharacter(e, { name })} }></Button>
            }
        }
        const nodes = chars.map(function(char, i){
            return (
                <Item key={ i }>{renderButton(char.name, char.existing)} <Image src={ char.existing ? (char.existing.avatar_image_url ? char.existing.avatar_image_url : 'https://myspace.com/common/images/user.png')  : 'https://myspace.com/common/images/user.png' } avatar spaced /> { char.name }</Item>
            )
        });
        return nodes;
    },
    render() {
        const { renderCharacters } = this;
        const { models, ui_state, errors, scriptCharacters } = this.props;
        // console.log(scriptCharacters);

        if ( scriptCharacters.length < 1)
            return <Loader active />;

        // cross check script characters with saved characters
        // const collated = collateScriptCharactersWithCharacters(script, models);
        const collated = collateScriptCharacterTokensWithCharacters(scriptCharacters, models);
        return (
            <Container text={ true } className='script-cast-list'>
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
