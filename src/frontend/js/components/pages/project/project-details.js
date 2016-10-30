import React from 'react'

import { Card } from "../../ui/card"
import { CardBlock } from "../../ui/card-block"
import { Description } from "../../ui/description"
import { ImagePanelRevision } from "../../ui/image-panel-revision"
import { SectionHeader } from "../../ui/section-header"


const ProjectDetails = React.createClass({
    propTypes: {
      project: React.PropTypes.object.isRequired
    },

    render: function() {
      return (
          <div>
              <Card>
                  <h3 className="card-header">{ this.props.project.name }</h3>
                  <div className="text-align-center">
                      <ImagePanelRevision { ...{src: this.props.project.content }} />
                  </div>
                  <CardBlock>
                      <Description source={ this.props.project.description }></Description>
                  </CardBlock>
              </Card>
          </div>
      );
    }
})

module.exports.ProjectDetails = ProjectDetails
