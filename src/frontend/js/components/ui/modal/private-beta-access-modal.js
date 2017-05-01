import React from 'react';
import {
    Button,
    Modal
} from 'semantic-ui-react';

const PrivateBetaAccessModal = React.createClass({
    propTypes: {
        modalVisible: React.PropTypes.bool,
        toggleModalVisible: React.PropTypes.func.isRequired
    },
    render() {
        const { modalVisible, toggleModalVisible } = this.props;
        return (
            <Modal dimmer='blurring' open={modalVisible} onClose={ toggleModalVisible }>
                <Modal.Header>Application for Private Beta Access</Modal.Header>
                <Modal.Content>
                    Form
                </Modal.Content>
                <Modal.Actions>
                    <Button as="a" onClick={ toggleModalVisible }>Cancel</Button>
                    <Button as="a" positive icon='checkmark' labelPosition='right' content="Add to project" onClick={()=>{}} disabled={ false }/>
                </Modal.Actions>
            </Modal>
        )
    }
})

export default PrivateBetaAccessModal;
