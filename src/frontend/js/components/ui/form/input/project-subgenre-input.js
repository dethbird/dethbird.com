import React from 'react';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
import * as _ from 'underscore';
import {
    Button,
    Container,
    Header,
    Label,
    List,
    Modal
} from 'semantic-ui-react';

import { UI_STATE } from 'constants/ui-state';
import { genresGet } from 'actions/genre';

const ProjectSubgenreInput = React.createClass({
    getInitialState() {
        return {
            modalVisible: false
        }
    },
    propTypes: {
        subgenres: React.PropTypes.array
    },
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(genresGet());
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
    renderGenres() {
        const { renderSubgenres } = this;
        const { models } = this.props;
        if (!models)
            return null;

        const nodes = models.map(function(genre,i){
            return (
                <List.Item key={ i } >
                    <List.Content>
                        <Header as="h3">{ genre.name }</Header>
                        <List horizontal>
                            { renderSubgenres(genre.subgenres) }
                        </List>
                    </List.Content>
                </List.Item>
            )
        });

        return nodes;
    },
    renderSubgenres(subgenres) {
        if (!subgenres)
            return null;

        const nodes = subgenres.map(function(subgenre,i){
            return (
                <List.Item key={ i } >
                    <List.Content>
                        <Button size='small'>
                            { subgenre.name }
                        </Button>
                    </List.Content>
                </List.Item>
            )
        });

        return nodes;
    },
    render() {
        const { renderGenreLabels, renderGenres, toggleModalVisible } = this;
        const { subgenres } = this.props;
        const { modalVisible } = this.state;
        return (
            <Container className='project-subgenre-input'>
                <List horizontal>
                    { renderGenreLabels() }
                </List>
                <Modal open={ modalVisible } dimmer='blurring' onClose={ toggleModalVisible } size='small'>
                    <Modal.Content>
                        <List divided>
                            { renderGenres() }
                        </List>
                    </Modal.Content>
                </Modal>
            </Container>
        );
    }
})

const mapStateToProps = (state) => {
    const { ui_state, errors, models } = state.genresReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        models
    }
}

export default connect(mapStateToProps)(ProjectSubgenreInput);
