import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import {
    Button,
    Card,
    Container,
    Header,
    Image,
    Label,
    List,
    Loader,
    Segment
} from 'semantic-ui-react';

import { UI_STATE } from 'constants/ui-state';
import { projectGet } from 'actions/project';


const ProjectDetail = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired
    },
    componentWillMount() {
        const { dispatch } = this.props;
        const { id } = this.props;
        dispatch(projectGet(id));
    },
    renderGenreLabels() {
        const { model } = this.props;
        if (model.subgenres.length==0)
            return null;

        const nodes = model.subgenres.map(function(subgenre, i){
            return (
                <List.Item key={ i } >
                    <List.Content>
                        <Label color='teal'>
                            { subgenre.genre.name }:
                            <Label.Detail>{ subgenre.name }</Label.Detail>
                        </Label>
                    </List.Content>
                </List.Item>

            );
        });
        return nodes;
    },
    renderTags(){
        const { model } = this.props;
        const tags = model.tags ? JSON.parse(model.tags) : []
        if (tags.length==0)
            return null;

        const nodes = tags.map(function(tag, i){
            return (
                <List.Item key={ i } >
                    <List.Content>
                        <Label color="teal" tag={ true }>{ tag }</Label>
                    </List.Content>
                </List.Item>
            );
        });
        return nodes;
    },
    renderStoryCards(){
        const { model } = this.props;
        if (model.stories.length==0)
            return null;

        const nodes = model.stories.map(function(story, i){
            return (
                <Card key={ i } >
                    <Card.Content>
                        <Header as="h3">{ story.name }</Header>
                        <Card.Description>
                            { story.description }
                        </Card.Description>
                    </Card.Content>
                </Card>
            );
        });
        return nodes;
    },
    render() {
        const { renderGenreLabels, renderTags, renderStoryCards } = this;
        const { id, ui_state, errors, model } = this.props;

        if (!model)
            return <Loader />;

        return (
            <div>
                <Container text>
                    <Button as="a" onClick={ ()=>{ browserHistory.push(`/project/${model.id}/edit`)} } content="Edit"/>
                </Container>
                <Container text textAlign="center">
                    <Header as="h1">{ model.name }</Header>
                    <Image shape="rounded" centered spaced size="large" src={ model.header_image_url || 'https://c1.staticflickr.com/3/2843/34030429372_0fce46646f_b.jpg' } />
                    <Segment as={Container} text textAlign="left">
                        { model.description }
                    </Segment>
                </Container>
                <br />
                <Container text textAlign="center">
                    <List horizontal>
                        { renderGenreLabels() }
                    </List>
                </Container>
                <br />
                <Container text textAlign="center">
                    <List horizontal>
                        { renderTags() }
                    </List>
                </Container>
                <br />
                <Container text textAlign="center">
                    { model.format }
                </Container>
                <br />
                <Container text textAlign="left">
                    <Header as="h3">Stories</Header>
                </Container>
                <br />
                <Container text>
                    <Card.Group itemsPerRow={ 3 }>
                        { renderStoryCards() }
                    </Card.Group>
                </Container>
            </div>
        )
    }
})

const mapStateToProps = (state) => {
    const { ui_state, errors, model } = state.projectReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        model
    }
}

export default connect(mapStateToProps)(ProjectDetail);
