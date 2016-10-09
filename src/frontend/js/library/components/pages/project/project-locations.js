import React from 'react'
import classNames from 'classnames'
import { browserHistory, Link } from 'react-router'

import { Card } from "../../ui/card"
import { CardClickable } from "../../ui/card-clickable"
import { CardBlock } from "../../ui/card-block"
import { Count } from "../../ui/count"
import { ImagePanelRevision } from "../../ui/image-panel-revision"
import { SectionHeader } from "../../ui/section-header"


const ProjectLocations = React.createClass({
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
            + '/location/' + id
            + '/edit'
        )
    },
    render: function() {
        const that = this;
        let locationNodes;
        let showButtonClassName = classNames(['btn', 'btn-secondary']);
        let showButtonCopy = 'Show';

        if (this.state.showContent) {
            showButtonClassName = classNames([showButtonClassName, 'active'])
            showButtonCopy = 'Hide';
            locationNodes = this.props.project.locations.map(function(location){
                const src = location.content;

                return (
                    <CardClickable
                        className="col-xs-3"
                        key={ location.id }
                        onClick={ that.handleClickItem.bind(that, location.id) }
                    >
                        <strong>{ location.name }</strong>
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
                    <SectionHeader><Count count={ this.props.project.locations.length } />  Locations</SectionHeader>
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
                            to={ '/project/' + this.props.project.id + '/locations' }
                            className='btn btn-secondary'
                        >View</Link>
                    </li>
                </ul>
                <div className="clearfix">
                    { locationNodes }
                </div>
            </section>
        );
    }
})

module.exports.ProjectLocations = ProjectLocations
