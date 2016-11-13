import React from 'react'
import ReactMarkdown from 'react-markdown'
import Modal from 'react-modal'
import { browserHistory, Link } from 'react-router'
import TimeAgo from 'react-timeago'
import { connect } from 'react-redux'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';

import { cardHeaderStyle } from '../../constants/styles'
import { CardClickable } from "../ui/card-clickable"
import { CardActionsButton } from "../ui/card-actions-button"
import { CardBlock } from "../ui/card-block"
import { Count } from "../ui/count"
import { Description } from "../ui/description"
import { Fountain } from "../ui/fountain"
import { HeaderPage } from "../ui/header-page"
import { HeaderPageButton } from "../ui/header-page-button"
import { Image } from "../ui/image"
import { Section } from "../ui/section"
import { SectionButton } from "../ui/section-button"
import {
    ConceptArtBreadcrumb
} from "./concept_art/concept_art-breadcrumb"
import {
    UI_STATE_INITIALIZING,
    UI_STATE_COMPLETE,
} from '../../constants/ui-state';

import UiState from '../ui/ui-state'

import { getConceptArt } from  '../../actions/concept_art'

const ConceptArt = React.createClass({
    componentWillMount() {
        const { dispatch } = this.props;
        const { projectId, conceptArtId } = this.props.params;
        dispatch(getConceptArt(projectId, conceptArtId));
    },
    render() {
        const { ui_state, concept_art } = this.props;
        if (!concept_art)
            return <UiState state={ ui_state } />
        return this.renderBody();
    },
    renderBody() {

        const { ui_state, project, concept_art } = this.props;
        const { projectId, conceptArtId } = this.props.params;

        let src = null;
        if (concept_art.revisions.length)
            src = concept_art.revisions[0].content;

        var concept_artRevisionNodes = concept_art.revisions.map(function(revision) {
            return (
                <Card
                    key={ revision.id }
                    className="content-secondary"
                >
                    <CardMedia className="text-align-center">
                        <Image src={ revision.content } />
                    </CardMedia>
                    <CardText>{ revision.description }</CardText>
                    <CardActions className="text-align-right">
                        <CardActionsButton
                            title="Edit"
                            onTouchTap={() => browserHistory.push('/project/' + projectId + '/concept_art/' + conceptArtId + '/revision/' + revision.id)}
                        />
                    </CardActions>
                </Card>
            );
        });

        return (
            <div>
                <ConceptArtBreadcrumb { ...this.props } />

                <UiState state={ ui_state } />

                <HeaderPage title={ concept_art.name } className='content-primary'>
                    <HeaderPageButton
                        onTouchTap={() => browserHistory.push('/project/' + projectId + '/concept_art/' + conceptArtId + '/edit')}
                        title="Edit"
                    />
                </HeaderPage>

                <Image src={ src } />
                <br />

                <Card className='content-primary'>
                    <CardText>
                        <Description source={ concept_art.description }></Description>
                    </CardText>
                </Card>

                <Section title="Revisions" count={ concept_art.revisions.length } className='content-primary'>
                    <SectionButton
                        onTouchTap={() => browserHistory.push('/project/' + projectId + '/concept_art/' + conceptArtId + '/revision/add')}
                        title="Add"
                    />
                </Section>

                <div className='content-primary'>
                    { concept_artRevisionNodes }
                </div>
            </div>
        );
    }
})

const mapStateToProps = (state) => {
    const { ui_state, project, concept_art } = state.conceptArt;
    return {
        ui_state: ui_state ? ui_state : UI_STATE_INITIALIZING,
        project,
        concept_art
    }
}

export default connect(mapStateToProps)(ConceptArt);
