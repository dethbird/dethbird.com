import React from 'react'
import { browserHistory, Link } from 'react-router'

import { CardClickable } from '../ui/card-clickable'
import { CardBlock } from '../ui/card-block'
import { Description } from '../ui/description'
import {
    ProjectCharactersBreadcrumb
} from './project-characters/project-characters-breadcrumb'
import { Spinner } from '../ui/spinner'


const ProjectCharacters = React.createClass({
    componentDidMount() {
        $.ajax({
            url: '/api/project/' + this.props.params.projectId,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({project: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleClick(project_id, character_id) {
        browserHistory.push(
            '/project/' + project_id + '/character/' + character_id);
    },
    render() {
        if (this.state) {
            var that = this;
            var characterNodes = this.state.project.characters.map(function(character) {
                let src;
                if (character.revisions.length) {
                    src = character.revisions[0].content;
                }
                return (
                    <CardClickable
                        className="col-lg-6"
                        key={ character.id }
                        onClick={
                            that.handleClick.bind(
                                that,
                                that.state.project.id,
                                character.id
                            )
                        }
                    >
                        <h3 className="card-header">{ character.name }</h3>
                        <div className="text-align-center">
                            <img className="card-img-top" src={ src } />
                        </div>
                        <CardBlock>
                            <div>
                                <Description source={ character.description }></Description>
                                <span>{ character.revisions.length } revision(s)</span>
                            </div>
                        </CardBlock>
                    </CardClickable>
                );
            });
            return (
                <div>
                    <ProjectCharactersBreadcrumb project={ this.state.project } />

                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link
                                className="nav-link btn btn-info"
                                to={
                                    '/project/' + this.state.project.id + '/characters/edit'
                                }>Reorder</Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link btn btn-success"
                                to={
                                    '/project/' + this.state.project.id + '/character/add'
                                }>Add</Link>
                        </li>
                    </ul>
                    <br />

                    <div className="projectCharactersList">
                        { characterNodes }
                    </div>
                </div>
            )
        }
        return (
            <Spinner />
        )
    }
})

module.exports.ProjectCharacters = ProjectCharacters
