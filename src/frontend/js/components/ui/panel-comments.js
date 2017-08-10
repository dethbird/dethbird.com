import React, { Component } from 'react';


class PanelComments extends Component {
    render() {
        const { panel } = this.props;
        if (panel.comments.length < 1)
            return <div>No Comments</div>;
        const nodes = panel.comments.map(function(comment,i){
            return (
                <div key={i}>{comment.id}</div>
            );
        });
        return (
            <div>{ nodes }</div>
        )
    }
};

export default PanelComments;
