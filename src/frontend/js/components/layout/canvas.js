import classNames from 'classnames';
import React from 'react';
import debounce from 'react-event-debounce';

import Element from './element';

const Canvas = React.createClass({
    getInitialState() {
        return {
            scrollX: 0
        }
    },
    propTypes: {
        layout: React.PropTypes.object.isRequired
    },
    compileStyle(){
        const { layout } = this.props;
        let style = {};
        if (layout.canvas.dimensions)
            style = {
                ... style,
                width: layout.canvas.dimensions.width,
                height: layout.canvas.dimensions.height
            }
        return style;
    },
    componentDidMount(){
        window.addEventListener('scroll', this.windowScrollListener);
    },
    windowScrollListener(event) {
        this.setState({
            ... this.state,
            scrollX: window.scrollX
        });
    },
    render: function() {
        const { layout } = this.props;
        const { scrollX } = this.state;

        const elementNodes = layout.elements.map(function(element, i){
            return (
                <Element element={ element } key={ i } windowScrollX={ scrollX }/>
            );
        });

        return (
            <div className="canvas" ref="root" style={ this.compileStyle() }>
                { elementNodes }
            </div>
        );
    }
})

export default Canvas;
