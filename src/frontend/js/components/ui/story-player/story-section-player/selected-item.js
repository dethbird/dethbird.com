import React from 'react';
import { connect } from 'react-redux';
import {
    Card,
    Header,
    Container,
    Loader,
    Segment
} from 'semantic-ui-react';

import { UI_STATE } from 'constants/ui-state';
import { charactersGet } from 'actions/character';

import ScriptToken from 'components/ui/script/script-token';

const SelectedItem = React.createClass({
    propTypes: {
        selectedItem: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return {
            characters: undefined
        }
    },
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(charactersGet());
    },
    render() {
        const { selectedItem, characters } = this.props;

        if(!characters)
            return <Loader active />

        const scriptNodes = selectedItem.tokens.map(function(token, i){
            return (
                <ScriptToken
                    token={ token }
                    characters={ characters }
                    currentLine={ 0 }
                    onFindActiveToken={ ()=>{} }
                    type='script'
                    key={ i }
                    onClickToken={ ()=>{} }
                    hideImage={ true }
                />
            )
        });

        return (
            <Container text>
                <Card fluid className="fountain-container">
                    <Card.Content className='fountain'>
                        { scriptNodes }
                    </Card.Content>
                </Card>
            </Container>
        )
    }
})

const mapStateToProps = (state) => {
    const { ui_state, errors, models } = state.charactersReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        characters: models
    }
}

export default connect(mapStateToProps)(SelectedItem);
