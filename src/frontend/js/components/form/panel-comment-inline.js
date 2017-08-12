import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import Paper from 'material-ui/Paper';
import TimeAgo from 'react-timeago';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ContentSend from 'material-ui/svg-icons/content/send';

import FormWrapper from 'components/form/form-wrapper';

import { UI_STATE } from 'constants/ui-state';
import commentPostSchema from 'validation_schema/comment-post.json';
import * as jsonSchema from 'utility/json-schema';
import { commentPost } from 'actions/comment';


class PanelCommentInline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changedFields: jsonSchema.initialFields(commentPostSchema)
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.onClickSubmit = this.onClickSubmit.bind(this);
    }
    handleFieldChange(e, elementId) {
        const { changedFields } = this.state;
        changedFields[e.currentTarget.id] = e.currentTarget.value;
        this.setState({
            ...changedFields
        });
    }
    onClickSubmit(e) {
        e.preventDefault();
        const { dispatch, panelId, uuid } = this.props;
        const { changedFields } = this.state;
        dispatch(commentPost({ ... changedFields, entity_id: panelId}, uuid));
    }
    render() {
        const { comment, errors } = this.props;
        const { changedFields } = this.state;
        if (comment) {
            return (

                <Paper zDepth={1} style={{ padding: 15 }}>
                    <ReactMarkdown source={comment.comment || ''} />
                    <div style={{ textAlign: 'right' }} className="username">{comment.user.username}</div>
                    <div style={{ textAlign: 'right' }} className="timestamp"><TimeAgo date={comment.date_added} /></div>
                </Paper>
            );
        } else {
            return (
                <FormWrapper onSubmit={this.onClickSubmit} >
                    <Card>
                        <CardText>
                            <h5>New Comment</h5>
                            <TextField
                                type='text'
                                floatingLabelText='Comment'
                                name='comment'
                                id='comment'
                                fullWidth
                                value={changedFields.comment || ''}
                                onChange={this.handleFieldChange}
                                hintText="Here's what I think ..."
                                errorText={jsonSchema.getErrorMessageForProperty('comment', errors)}
                            />
                        </CardText>
                        <CardActions style={{ textAlign: 'right' }}>
                            <FlatButton icon={<ContentSend />} label='Add' labelPosition='before' primary onClick={this.onClickSubmit} type='submit' />
                        </CardActions>
                    </Card>
                </FormWrapper>
            )
        }
    }
};

const mapStateToProps = (state, ownProps) => {
    const { ui_state, model, errors, uuid } = state.commentReducer;
    if (ownProps.uuid == uuid) {
        return {
            ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
            errors,
            comment: model
        }
    }
    return ownProps;
}

export default connect(mapStateToProps)(PanelCommentInline);