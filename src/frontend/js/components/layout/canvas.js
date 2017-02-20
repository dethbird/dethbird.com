import classNames from 'classnames';
import React from 'react';
import debounce from 'react-event-debounce';

import Element from './element';
import Pannable from '../ui/pannable';

const Canvas = React.createClass({
    getInitialState() {
        return {
            scrollX: 0,
            scrollY: 0
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
            scrollX: window.scrollX,
            scrollY: window.scrollY
        });
    },
    render: function() {
        const { layout } = this.props;
        const { scrollX, scrollY } = this.state;

        const elementNodes = layout.elements.map(function(element, i){
            return (
                <Element element={ element } key={ i } windowScrollX={ scrollX } windowScrollY={ scrollY }/>
            );
        });

        const style = this.compileStyle();
        return (
            <Pannable dampen={ 8 } style={ style }>
                <div className="canvas" ref="root" style={ style } id={ layout.canvas.id }>
                    { elementNodes }
                </div>
            </Pannable>
        );
    }
})

export default Canvas;
