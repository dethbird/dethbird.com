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
    CharacterBreadcrumb
} from "./character/character-breadcrumb"
import {
    UI_STATE_INITIALIZING,
    UI_STATE_COMPLETE,
} from '../../constants/ui-state';

import UiState from '../ui/ui-state'

import { getCharacter } from  '../../actions/character'

const Character = React.createClass({
    componentWillMount() {
        const { dispatch } = this.props;
        const { projectId, characterId } = this.props.params;
        dispatch(getCharacter(projectId, characterId));
    },
    render() {
        const { ui_state, character } = this.props;
        if (!character)
            return <UiState state={ ui_state } />
        return this.renderBody();
    },
    renderBody() {

        const { ui_state, project, character } = this.props;
        const { projectId, characterId } = this.props.params;

        let src = null;
        if (character.revisions.length)
            src = character.revisions[0].content;

        var characterRevisionNodes = character.revisions.map(function(revision) {
            return (
                <Card
                    key={ revision.id }
                    className="col-lg-3"
                >

                    <CardMedia
                        className="text-align-center"
                        onTouchTap={ () => browserHistory.push(
                            '/project/' + projectId + '/character/' + characterId + '/revision/' + revision.id) }
                    >
                        <Image src={ revision.content } />
                    </CardMedia>
                    <CardText>{ revision.description }</CardText>
                </Card>
            );
        });

        return (
            <div>
                <CharacterBreadcrumb { ...this.props } />

                <UiState state={ ui_state } />

                <HeaderPage title={ character.name }>
                    <HeaderPageButton
                        onTouchTap={() => browserHistory.push('/project/' + projectId + '/character/' + characterId + '/edit')}
                        title="Edit"
                    />
                </HeaderPage>

                <Image src={ src } />
                <br />

                <Card className='card-display'>
                    <CardText>
                        <Description source={ character.description }></Description>
                    </CardText>
                </Card>

                <Section title="Revisions" count={ character.revisions.length }>
                    <SectionButton
                        onTouchTap={() => browserHistory.push('/project/' + projectId + '/character/' + characterId + '/revision/add')}
                        title="Add"
                    />
                </Section>

                <div>
                    { characterRevisionNodes }
                </div>
            </div>
        );
    }
})

const mapStateToProps = (state) => {
    const { ui_state, project, character } = state.character;
    return {
        ui_state: ui_state ? ui_state : UI_STATE_INITIALIZING,
        project,
        character
    }
}

export default connect(mapStateToProps)(Character);
