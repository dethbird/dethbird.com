import React from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames';

import ContentArticleCard from '../layout/card/content-article-card';
import Description from '../ui/description';
import InputDescription from '../ui/form/input-description';
import InputText from '../ui/form/input-text';
import UiState from '../ui/ui-state'

import {
    FORM_MODE_ADD,
    FORM_MODE_EDIT
} from '../../constants/form';
import {
    UI_STATE_INITIALIZING,
    UI_STATE_REQUESTING,
    UI_STATE_COMPLETE,
} from '../../constants/ui-state';
import {
    getContentArticle,
    postContentArticle,
    putContentArticle,
    resetContentArticle
} from  '../../actions/content-article';


const ContentArticleEdit = React.createClass({
    getInitialState() {
        return {
            changedFields: {}
        }
    },
    componentWillReceiveProps(nextProps) {
        const { article } = this.props;
        if( article==undefined && nextProps.article){
            this.setState({
                changedFields: {
                    notes: nextProps.article.notes
                }
            });
        }
    },
    componentWillMount() {
        const { dispatch } = this.props;
        const { articleId } = this.props.params;
        dispatch(getContentArticle(articleId));
    },
    handleFieldChange(event) {
        const { dispatch, form_mode, article } = this.props;
        const { changedFields } = this.state;
        let newChangedFields = changedFields;

        newChangedFields[event.target.id] = event.target.value;
        this.setState( {
            changedFields: newChangedFields
        });
        dispatch(resetContentArticle( { ... article, ... changedFields }, form_mode ));
    },
    handleClickCancel(event) {
        event.preventDefault();
        browserHistory.push('/');
    },
    handleClickSubmit(event) {
        event.preventDefault();
        const { dispatch, form_mode, article } = this.props;
        const { changedFields } = this.state;
        if (form_mode == FORM_MODE_EDIT)
            dispatch(putContentArticle( article, changedFields ));

        if (form_mode == FORM_MODE_ADD)
            dispatch(postContentArticle( changedFields ));
    },
    render() {
        const { changedFields } = this.state;
        const { ui_state, form_mode, errors, article } = this.props;

        if(form_mode !== FORM_MODE_EDIT){
            return (
                <div className="box container">
                    <form className="is-clearfix">
                        <InputText
                            label="URL"
                            id="url"
                            value={ changedFields.url || '' }
                            onChange= { this.handleFieldChange }
                        />
                        <div className="is-pulled-right">
                            <a
                                className={ classNames(['button is-primary', ui_state==UI_STATE_REQUESTING ? 'is-loading' : null])}
                                onClick={ this.handleClickSubmit }
                            >Submit</a>
                        </div>
                    </form>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <ContentArticleCard article={ article } securityContext={ securityContext }/>
                    <br />
                    <div className="box">
                        <form className="is-clearfix">
                            <InputDescription
                                label="Notes (markdown)"
                                id="notes"
                                value={ changedFields.notes || '' }
                                onChange= { this.handleFieldChange }
                            />
                            <div className="is-pulled-right">
                                <a
                                    className={ classNames(['button is-primary', ui_state==UI_STATE_REQUESTING ? 'is-loading' : null])}
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

    const { ui_state, article, form_mode } = state.contentArticle;
    return {
        ui_state: ui_state ? ui_state : UI_STATE_INITIALIZING,
        form_mode,
        article
    }
}

export default connect(mapStateToProps)(ContentArticleEdit);
