import React, { Component } from 'react';

import XYCanvasViewer from 'components/xycanvas/xycanvas-viewer';
import PhaserContainer from 'components/phaser/phaser-container';

class Thing extends Component {
    render() {
        if (layout.canvas.type == 'xycanvas')
            return <XYCanvasViewer layout={ layout } />;
        
        if (layout.canvas.type == 'phaser')
            return <PhaserContainer layout={layout} />;
            
    }
};

export default Thing;