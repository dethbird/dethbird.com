import React from 'react'

import { CardActions, CardText } from 'material-ui/Card';

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
            <div>
                <Image src={ project.content } />
                <br />
                <Card className='card-display'>
                    <CardText>
                        <Description source={ project.description }></Description>
                    </CardText>
                </Card>
            </div>
        );
    }
})

module.exports.ProjectDetails = ProjectDetails
