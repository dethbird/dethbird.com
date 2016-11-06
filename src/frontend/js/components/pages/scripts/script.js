import classNames from 'classnames';
import React from 'react'
import { browserHistory, Link } from 'react-router'

import {CardActions, CardHeader, CardText} from 'material-ui/Card';

import { Card } from '../../ui/card'
import { CardBlock } from '../../ui/card-block'
import { CardActionsButton } from '../../ui/card-actions-button'
import { Description } from '../../ui/description'


const Script = React.createClass({
    propTypes: {
      script: React.PropTypes.object.isRequired,
      className: React.PropTypes.string
    },

    render: function() {
        const { script, className } = this.props;

        return (
            <Card
                className={ classNames([className, 'script']) }
                key={ script.id }
            >
                <CardHeader
                    actAsExpander={true}
                    showExpandableButton={true}
                    title={ script.name }
                    titleStyle={ {fontSize: '18px'} }
                />

                <CardText expandable={true}>
                    <Description source={ script.description } />
                </CardText>

                <CardActions className="text-align-right">
                    <CardActionsButton
                        title="View"
                        onTouchTap={() => browserHistory.push('/script/' + script.id)}
                    />
                    <CardActionsButton
                        title="Edit"
                        onTouchTap={() => browserHistory.push('/script/' + script.id + '/edit')}
                    />
                </CardActions>

            </Card>
        );
    }
})

module.exports.Script = Script
