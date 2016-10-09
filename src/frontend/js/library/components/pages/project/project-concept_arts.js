import React from 'react'
import classNames from 'classnames'
import { browserHistory, Link } from 'react-router'

import { Card } from "../../ui/card"
import { CardClickable } from "../../ui/card-clickable"
import { CardBlock } from "../../ui/card-block"
import { Count } from "../../ui/count"
import { ImagePanelRevision } from "../../ui/image-panel-revision"
import { SectionHeader } from "../../ui/section-header"


const ProjectConceptArts = React.createClass({
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
        let concept_artNodes;
        let showButtonClassName = classNames(['btn', 'btn-secondary']);
        let showButtonCopy = 'Show';

        if (this.state.showContent) {
            showButtonClassName = classNames([showButtonClassName, 'active'])
            showButtonCopy = 'Hide';
            concept_artNodes = this.props.project.concept_art.map(function(concept_art){
                let src;
                if(concept_art.revisions.length)
                    src = concept_art.revisions[0].content;

                return (
                    <Card className="col-xs-3" key={ concept_art.id }>
                        <strong>{ concept_art.name }</strong>
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
                    <SectionHeader><Count count={ this.props.project.concept_art.length } />  Concept Arts</SectionHeader>
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
                            to={ '/project/' + this.props.project.id + '/concept_art' }
                            className='btn btn-secondary'
                        >View</Link>
                    </li>
                </ul>
                <div className="clearfix">
                    { concept_artNodes }
                </div>
            </section>
        );
    }
})

module.exports.ProjectConceptArts = ProjectConceptArts
