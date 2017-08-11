import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import Paper from 'material-ui/Paper';
import TimeAgo from 'react-timeago';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ContentSend from 'material-ui/svg-icons/content/send';

import FormWrapper from 'components/form/form-wrapper';


class PanelCommentInline extends Component {
    render() {
        const { comment } = this.props;
        console.log(comment);
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
                    <FormWrapper onSubmit={()=>{}}>
                        <Card>
                            <CardText>
                                <h5>New Comment</h5>
                                <TextField
                                    type='text'
                                    floatingLabelText='Comment'
                                    name='comment'
                                    id='comment'
                                    fullWidth
                                    hintText="Here's what I think ..."
                                />
                            </CardText>
                            <CardActions style={{ textAlign: 'right' }}>
                                <FlatButton icon={<ContentSend />} label='Add' labelPosition='before' primary onClick={()=>{}} type='submit' />
                            </CardActions>
                        </Card>
                    </FormWrapper>
            )
        }
    }
};

export default PanelCommentInline;
