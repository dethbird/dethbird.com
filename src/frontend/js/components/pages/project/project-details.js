import React from 'react'

import { CardActions, CardMedia, CardText } from 'material-ui/Card';

import { Card } from "../../ui/card"
import { CardBlock } from "../../ui/card-block"
import { Description } from "../../ui/description"
import { Image } from "../../ui/image"
import { SectionHeader } from "../../ui/section-header"


const ProjectDetails = React.createClass({
    propTypes: {
      project: React.PropTypes.object.isRequired
    },

    render: function() {
        const { project } = this.props;
        return (
            <div className='content-primary'>
                <CardMedia className="text-align-center">
                    <Image src={ project.content } />
                </CardMedia>
                <Card>
                    <CardText>
                        <Description source={ project.description }></Description>
                    </CardText>
                </Card>
            </div>
        );
    }
})

module.exports.ProjectDetails = ProjectDetails
