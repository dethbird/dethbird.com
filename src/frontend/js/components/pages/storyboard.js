import React from 'react'
import ReactMarkdown from 'react-markdown'
import Modal from 'react-modal'
import { browserHistory, Link } from 'react-router'
import TimeAgo from 'react-timeago'
import { connect } from 'react-redux'

import {CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';

import { cardHeaderStyle } from '../../constants/styles'
import { Card } from "../ui/card"
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
    StoryboardBreadcrumb
} from "./storyboard/storyboard-breadcrumb"

import {
    UI_STATE_INITIALIZING,
    UI_STATE_COMPLETE,
} from '../../constants/ui-state';

import UiState from '../ui/ui-state'

import { getStoryboard } from  '../../actions/storyboard'


const Storyboard = React.createClass({
    componentWillMount() {
        const { dispatch } = this.props;
        const { projectId, storyboardId } = this.props.params;
        dispatch(getStoryboard(projectId, storyboardId));
    },
    render() {
        const { ui_state, storyboard } = this.props;
        if (!storyboard)
            return <UiState state={ ui_state } />
        return this.renderBody();
    },
    renderBody() {

        const { ui_state, project, storyboard } = this.props;
        const { projectId, storyboardId } = this.props.params;

        var storyboardPanelNodes = storyboard.panels.map(function(panel, i) {

            let src = null;
            if (panel.revisions.length > 0)
                src = panel.revisions[0].content
            return (
                <Card
                    key={ panel.id }
                    className="content-secondary"
                >
                    <CardTitle
                        title={ `Panel ${ i + 1 }` }
                        titleStyle={ cardHeaderStyle }
                    />
                    <div onClick={ () => browserHistory.push(
                        '/project/' + projectId + '/storyboard/' + storyboardId + '/panel/' + panel.id) }
                    >
                        <Image src={ src } />
                    </div>
                    <CardMedia>
                        <Fountain source={ panel.script} />
                        <List>
                            <ListItem>
                                <Count count={ panel.revisions.length } /> Revisions
                            </ListItem>
                            <ListItem>
                                <Count count={ panel.comments.length } /> Comments
                            </ListItem>
                        </List>
                    </CardMedia>

                    <CardActions className="text-align-right">
                        <CardActionsButton
                            title="View"
                            onTouchTap={() => browserHistory.push('/project/' + projectId + '/storyboard/' + storyboardId + '/panel/' + panel.id )}
                        />
                        <CardActionsButton
                            title="Edit"
                            onTouchTap={() => browserHistory.push('/project/' + projectId + '/storyboard/' + storyboardId + '/panel/' + panel.id + '/edit')}
                        />
                    </CardActions>
                </Card>
            );
        });

        return (
            <div>
                <StoryboardBreadcrumb { ...this.props }/>

                <UiState state={ ui_state } />

                <HeaderPage title={ storyboard.name } className='content-primary'>
                    <HeaderPageButton
                        onTouchTap={() => browserHistory.push('/project/' + projectId + '/storyboard/' + storyboardId + '/edit')}
                        title="Edit"
                    />
                </HeaderPage>

                <Card className="content-primary">
                    <CardText>
                        <Description source={ storyboard.description } />
                    </CardText>
                </Card>

                <Section title="Panels" count={ storyboard.panels.length } className='content-primary'>
                    <SectionButton
                        onTouchTap={() => browserHistory.push('/project/' + projectId + '/storyboard/' + storyboardId + '/panel/add')}
                        title="Add"
                    />
                </Section>

                <div className="content-primary">
                    { storyboardPanelNodes }
                </div>
            </div>
        );

    }
})

const mapStateToProps = (state) => {
    const { ui_state, project, storyboard } = state.storyboard;
    return {
        ui_state: ui_state ? ui_state : UI_STATE_INITIALIZING,
        project,
        storyboard
    }
}

export default connect(mapStateToProps)(Storyboard);
