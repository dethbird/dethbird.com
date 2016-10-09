import React from 'react'
import classNames from 'classnames'
import { browserHistory, Link } from 'react-router'

import { Card } from "../../ui/card"
import { CardClickable } from "../../ui/card-clickable"
import { CardBlock } from "../../ui/card-block"
import { Count } from "../../ui/count"
import { ImagePanelRevision } from "../../ui/image-panel-revision"
import { SectionHeader } from "../../ui/section-header"


const ProjectReferenceImages = React.createClass({
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
    handleClickItem(id) {
        browserHistory.push(
            '/project/' + this.props.project.id
            + '/reference_image/' + id
            + '/edit'
        )
    },
    render: function() {
        const that = this;
        let reference_imageNodes;
        let showButtonClassName = classNames(['btn', 'btn-secondary']);
        let showButtonCopy = 'Show';

        if (this.state.showContent) {
            showButtonClassName = classNames([showButtonClassName, 'active'])
            showButtonCopy = 'Hide';
            reference_imageNodes = this.props.project.reference_images.map(function(reference_image){
                const src = reference_image.content;

                return (
                    <CardClickable
                        className="col-xs-3"
                        key={ reference_image.id }
                        onClick={ that.handleClickItem.bind(that, reference_image.id) }
                    >
                        <strong>{ reference_image.name }</strong>
                        <ImagePanelRevision src={ src } />
                        <br />
                        <br />
                    </CardClickable>
                );
            });
        }

        return (
            <section className="clearfix well">
                <div className="pull-left">
                    <SectionHeader><Count count={ this.props.project.reference_images.length } />  Reference Images</SectionHeader>
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
                            to={ '/project/' + this.props.project.id + '/reference_images' }
                            className='btn btn-secondary'
                        >View</Link>
                    </li>
                </ul>
                <div className="clearfix">
                    { reference_imageNodes }
                </div>
            </section>
        );
    }
})

module.exports.ProjectReferenceImages = ProjectReferenceImages
