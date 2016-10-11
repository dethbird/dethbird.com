import React from 'react'
import {
    SortableItems,
    SortableItem
} from 'react-sortable-component'
import { browserHistory } from 'react-router'
import Textarea from 'react-textarea-autosize'

import { Alert } from "../ui/alert"
import { Card } from "../ui/card"
import { SectionHeader } from "../ui/section-header"
import { CardClickable } from "../ui/card-clickable"
import { CardBlock } from "../ui/card-block"
import { Description } from "../ui/description"
import { FountainFull } from "../ui/fountain-full"
import {
    ScriptBreadcrumb
} from "./script/script-breadcrumb"
import { Spinner } from "../ui/spinner"


const ScriptEdit = React.createClass({
    componentDidMount() {
        $.ajax({
            url: '/api/project_script/' + this.props.params.scriptId,
            dataType: 'json',
            cache: false,
            beforeSend: function() {
                this.setState({
                    formState: 'info',
                    formMessage: 'Working.',
                    script: {}
                })
            }.bind(this),
            success: function(data) {

                const submitUrl = '/api/project_script/'
                    + this.props.params.scriptId;
                const submitMethod = 'PUT';

                this.setState({
                    script: data,
                    formState: null,
                    formMessage: null,
                    submitUrl: submitUrl,
                    submitMethod: submitMethod
                });
            }.bind(this),
            error: function(xhr, status, err) {

                const submitUrl = '/api/project_script'
                const submitMethod = 'POST'
                this.setState({
                    script: {},
                    formState: null,
                    formMessage: null,
                    submitUrl: submitUrl,
                    submitMethod: submitMethod
                });
            }.bind(this)
        });
    },
    handleFieldChange(event) {
        let script = this.state.script;
        let changedFields = this.state.changedFields || {};

        script[event.target.id] = event.target.value
        changedFields[event.target.id] = event.target.value

        this.setState({
            script: script,
            changedFields: changedFields
        })
    },
    handleClickCancel(event) {
        event.preventDefault()
        browserHistory.push(
            '/project/' + this.props.params.projectId
            + '/script/' + this.props.params.scriptId
        )
    },
    handleClickSubmit(event) {
        event.preventDefault()
        var that = this
        $.ajax({
            data: that.state.changedFields,
            dataType: 'json',
            cache: false,
            method: this.state.submitMethod,
            url: this.state.submitUrl,
            success: function(data) {
                this.setState({
                    formState: 'success',
                    formMessage: 'Success.',
                    submitUrl:'/api/project_script/'
                        + data.id,
                    submitMethod: 'PUT',
                    script: data
                })
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({
                    formState: 'danger',
                    formMessage: 'Error: ' + xhr.responseText
                })
            }.bind(this)
        });
    },
    render() {
        let that = this
        if (this.state){

            return (
                <div>
                    <ScriptBreadcrumb { ...this.state }></ScriptBreadcrumb>
                    <Alert
                        status={ this.state.formState }
                        message={ this.state.formMessage }
                    />
                    <form>

                        <SectionHeader>name:</SectionHeader>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Name"
                                value={ this.state.script.name || '' }
                                onChange= { this.handleFieldChange }
                            />
                        </div>

                        <SectionHeader>description:</SectionHeader>
                        <div className="form-group">
                            <Textarea
                                className="form-control"
                                id="description"
                                minRows={3}
                                maxRows={6}
                                value={ this.state.script.description || '' }
                                onChange= { this.handleFieldChange }
                            />
                            <br />
                            <Card>
                                <CardBlock>
                                    <Description source={ this.state.script.description } />
                                </CardBlock>
                            </Card>
                        </div>


                        <SectionHeader>script:</SectionHeader>
                        <div className="form-group">
                            <Textarea
                                className="form-control"
                                id="script"
                                minRows={3}
                                style={ {maxHeight: 640} }
                                value={ this.state.script.script || '' }
                                onChange= { this.handleFieldChange }
                            />
                            <br />
                            <Card>
                                <CardBlock>
                                    <FountainFull source={ this.state.script.script } />
                                </CardBlock>
                            </Card>
                        </div>

                        <div className="form-group text-align-center">
                            <button
                                className="btn btn-secondary"
                                onClick={ that.handleClickCancel }
                            >Cancel</button>
                            <button
                                className="btn btn-success"
                                onClick={ that.handleClickSubmit }
                                disabled={ !that.state.changedFields }
                            >Save</button>
                        </div>
                    </form>
                </div>
            );
        }
        return (
            <Spinner />
        )
    }
})

module.exports.ScriptEdit = ScriptEdit
