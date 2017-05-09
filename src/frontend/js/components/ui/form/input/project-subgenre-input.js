import React from 'react';
import ReactGA from 'react-ga';
import * as _ from 'underscore';
import {
    Button,
    Container,
    Label,
    List,
    Modal
} from 'semantic-ui-react';

const ProjectSubgenreInput = React.createClass({
    getInitialState() {
        return {
            modalVisible: false
        }
    },
    propTypes: {
        subgenres: React.PropTypes.array
    },
    toggleModalVisible(e) {
        e.preventDefault();
        if (!this.state.modalVisible===true) {
            ReactGA.modalview('/project-subgenre-input-modal');
        }
        this.setState({
            ... this.state,
            modalVisible: !this.state.modalVisible
        });
    },
    renderGenreLabels() {
        const { toggleModalVisible } = this;
        const { subgenres } = this.props;
        if (subgenres.length==0)
            return null;

        const nodes = subgenres.map(function(subgenre, i){
            return (
                <List.Item key={ i } >
                    <List.Content>
                        <Label color='teal' size='large'>
                            { subgenre.genre.name }:
                            <Label.Detail>{ subgenre.name }</Label.Detail>
                        </Label>
                    </List.Content>
                </List.Item>

            );
        });
        nodes.push(
            <List.Item key={ nodes.length } >
                <List.Content>
                    <Button icon='add' size='mini' onClick={ toggleModalVisible }/>
                </List.Content>
            </List.Item>
        );
        return nodes;
    },
    render() {
        const { renderGenreLabels, toggleModalVisible } = this;
        const { subgenres } = this.props;
        const { modalVisible } = this.state;
        return (
            <Container className='project-subgenre-input'>
                <List horizontal>
                    { renderGenreLabels() }
                </List>
                <Modal open={ modalVisible } dimmer='blurring' onClose={ toggleModalVisible } >
                    <Modal.Content>
                        Farts
                    </Modal.Content>
                </Modal>
            </Container>
        );
    }
})

export default ProjectSubgenreInput;
