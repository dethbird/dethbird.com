import React, { Component } from 'react';
import classNames from 'classnames';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { GridList, GridTile } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';

import PanelImage from 'components/ui/panel-image';


class PanelRevisions extends Component {
    render() {
        const { panel } = this.props;
        if (panel.revisions.length < 1)
            return <div>No Revisions</div>;
        const nodes = panel.revisions.map(function (revision, i) {
            return (
                <GridTile
                    key={i}
                >
                    <Card>
                        <CardMedia>
                            <img src={ revision.content } />
                        </CardMedia>
                    </Card>
                </GridTile>
            );
        });
        return (
            <GridList
                cols={2}
                padding={10}
                cellHeight={'auto'}
            >
                {nodes}
            </GridList>
        )
    }
};

export default PanelRevisions;
