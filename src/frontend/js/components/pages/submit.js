import React from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';

import ContentArticleCard from '../layout/card/content-article-card';
import Description from '../ui/description';
import InputDescription from '../ui/form/input-description';
import InputText from '../ui/form/input-text';

import UiState from '../ui/ui-state';
import {
    FORM_MODE_ADD,
    FORM_MODE_EDIT
} from '../../constants/form';
import {
    UI_STATE_INITIALIZING,
    UI_STATE_COMPLETE,
} from '../../constants/ui-state';

import {
    postContentArticle,
    putContentArticle,
    resetContentArticle
} from  '../../actions/content-article';


const Submit = React.createClass({
    getInitialState() {
        return {
            changedFields: {
                xApiKey: null,
                url: null,
                notes: null
            }
        }
    },
    componentWillReceiveProps(nextProps) {
        const { article } = this.props;
        if( article==undefined && nextProps.article){
            this.setState({
                changedFields: {
                    xApiKey: nextProps.article.xApiKey,
                    url: nextProps.article.url,
                    notes: nextProps.article.notes
                }
            });
        }
    },
    handleFieldChange(event) {
        const { dispatch, article, form_mode } = this.props;
        const { changedFields } = this.state;
        let newChangedFields = changedFields;
        newChangedFields[event.target.id] = event.target.value;
        this.setState( {
            changedFields: newChangedFields
        });
        dispatch(resetContentArticle( article, form_mode ));
    },
    handleClickSubmit(event) {
        event.preventDefault();
        const { dispatch, form_mode, article } = this.props;
        const { changedFields } = this.state;

        if(form_mode == FORM_MODE_ADD)
            dispatch(postContentArticle(changedFields));

        if(form_mode == FORM_MODE_EDIT)
            dispatch(putContentArticle(article, changedFields));
    },
    render() {
        const { article } = this.props;
        const { changedFields } = this.state;

        if(!article){
            return (
                <div className="box container">
                    <form className="is-clearfix">
                        <InputText
                            label="X-Api-Key"
                            id="xApiKey"
                            value={ changedFields.xApiKey || '' }
                            onChange= { this.handleFieldChange }
                        />
                        <InputText
                            label="URL"
                            id="url"
                            value={ changedFields.url || '' }
                            onChange= { this.handleFieldChange }
                        />
                        <div className="is-pulled-right">
                            <a
                                className="button is-primary"
                                onClick={ this.handleClickSubmit }
                            >Submit</a>
                        </div>
                    </form>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <ContentArticleCard article={ article } />
                    <br />
                    <div className="box">
                        <form className="is-clearfix">
                            <InputDescription
                                label="Notes (markdown)"
                                id="notes"
                                value={ changedFields.notes || '' }
                                onChange= { this.handleFieldChange }
                            />
                            <div className="box">
                                <Description source={ changedFields.notes || '' } />
                            </div>
                            <div className="is-pulled-right">
                                <a
                                    className="button is-primary"
                                    onClick={ this.handleClickSubmit }
                                >Save</a>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
    }
})

const mapStateToProps = (state) => {

    const { ui_state, form_mode, article } = state.contentArticle;
    return {
        ui_state: ui_state ? ui_state : UI_STATE_INITIALIZING,
        form_mode: form_mode ? form_mode : FORM_MODE_ADD,
        article
    }
}

export default connect(mapStateToProps)(Submit);
