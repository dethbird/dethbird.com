import React from 'react'
import classNames from 'classnames'
import { browserHistory, Link } from 'react-router'

import { Card } from "../../ui/card"
import { CardClickable } from "../../ui/card-clickable"
import { CardBlock } from "../../ui/card-block"
import { Count } from "../../ui/count"
import { ImagePanelRevision } from "../../ui/image-panel-revision"
import { SectionHeader } from "../../ui/section-header"


const ProjectStoryboards = React.createClass({
    getInitialState: function() {
        return {
            showContent: false
        };
    },
    propTypes: {
      project: React.PropTypes.object.isRequired
    },
    handleClickList() {
        const showContent = !this.state.showContent;
        this.setState({
            showContent
        });
    },
    render: function() {
        let storyboardNodes;
        let showButtonClassName = classNames(['btn', 'btn-secondary']);
        let showButtonCopy = 'Show';

        if (this.state.showContent) {
            showButtonClassName = classNames([showButtonClassName, 'active'])
            showButtonCopy = 'Hide';
            storyboardNodes = this.props.project.storyboards.map(function(storyboard){
                const src = storyboard.content;
                return (
                    <Card className="col-xs-3" key={ storyboard.id }>
                        <strong>{ storyboard.name }</strong>
                        <ImagePanelRevision src={ src } />
                        <br />
                        <br />
                    </Card>
                );
            });
        }

        return (
            <section className="clearfix well">
                <div className="pull-left">
                    <SectionHeader><Count count={ this.props.project.storyboards.length } />  Storyboards</SectionHeader>
                </div>
                <ul className="nav nav-pills pull-right">
                    <li className="nav-item">
                        <button
                            onClick={ this.handleClickList }
                            className={ showButtonClassName }
                        >{ showButtonCopy }</button>
                    </li>
                    <li className="nav-item">
                        <Link
                            to={ '/project/' + this.props.project.id + '/storyboards' }
                            className='btn btn-secondary'
                        >View</Link>
                    </li>
                </ul>
                <div className="clearfix">
                    { storyboardNodes }
                </div>
            </section>
        );
    }
})

module.exports.ProjectStoryboards = ProjectStoryboards
