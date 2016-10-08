import React from 'react'
import classNames from 'classnames'
import { browserHistory, Link } from 'react-router'

import { Card } from "../../ui/card"
import { CardClickable } from "../../ui/card-clickable"
import { CardBlock } from "../../ui/card-block"
import { Count } from "../../ui/count"
import { ImagePanelRevision } from "../../ui/image-panel-revision"
import { SectionHeader } from "../../ui/section-header"


const ProjectCharacters = React.createClass({
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
        let characterNodes;
        let listButtonClassName = classNames(['btn', 'btn-secondary']);

        if (this.state.showContent) {
            listButtonClassName = classNames([listButtonClassName, 'active'])
            characterNodes = this.props.project.characters.map(function(character){
                let src;
                if(character.revisions.length)
                    src = character.revisions[0].content;

                return (
                    <Card className="col-xs-3" key={ character.id }>
                        <strong>{ character.name }</strong>
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
                    <SectionHeader><Count count={ this.props.project.characters.length } />  Characters</SectionHeader>
                </div>
                <ul className="nav nav-pills pull-right">
                    <li className="nav-item">
                        <Link
                            to={ '/project/' + this.props.project.id + '/characters' }
                            className='btn btn-secondary'
                        >View</Link>
                    </li>
                    <li className="nav-item">
                        <button
                            onClick={ this.handleClickList }
                            className={ listButtonClassName }
                        >List</button>
                    </li>
                </ul>
                <div className="clearfix">
                    { characterNodes }
                </div>
            </section>
        );
    }
})

module.exports.ProjectCharacters = ProjectCharacters
