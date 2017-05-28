import React from 'react';
import {
    Card,
    Header,
    Container,
    Segment
} from 'semantic-ui-react';

import ScriptToken from 'components/ui/script/script-token';

const SelectedItem = React.createClass({
    propTypes: {
        selectedItem: React.PropTypes.object.isRequired
    },
    render() {
        const { selectedItem } = this.props;

        const scriptNodes = selectedItem.tokens.map(function(token, i){
            return (
                <ScriptToken
                    token={ token }
                    characters={ [] }
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

export default SelectedItem;
