import React, { Component } from 'react';


class PanelImage extends Component {
    render() {
        const { panel } = this.props;
        let src = 'http://cdn.iflscience.com/assets/site/img/ifls-placeholder.png?v=1.2.12';
        if (panel.revisions.length > 0)
            src = panel.revisions[0].content;
        return (
            <div style={{textAlign: 'center'}}>
                <img src={ src } style={ { maxWidth: '100%', height: 'auto', display: 'inline-block' } } />
            </div>
        );
    }
};

export default PanelImage;
