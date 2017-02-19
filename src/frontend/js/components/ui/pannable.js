import classNames from 'classnames';
import React from 'react';


const Pannable = React.createClass({
    getInitialState() {
        return {
            panning: false,
            startLocation: {
                x: 0,
                y: 0
            }
        };
    },
    propTypes: {
        className: React.PropTypes.string,
        dampen: React.PropTypes.number.isRequired,
        style: React.PropTypes.object
    },
    startPanning(e) {
        console.log(e.target);
        e.stopPropagation();
        this.setState({
            ... this.state,
            panning: true,
            startLocation: {
                x: e.clientX,
                y: e.clientY
            }
        });
    },
    stopPanning(e) {
        e.stopPropagation();
        this.setState({
            ... this.state,
            panning: false
        });
    },
    pan(e) {
        const { panning, startLocation } = this.state;
        const { dampen } = this.props;
        if (panning) {
            window.scroll(
                window.scrollX + ((startLocation.x - e.clientX)/dampen),
                window.scrollY + ((startLocation.y - e.clientY)/dampen)
            );
        }
    },
    render: function() {
        const { className, children, style } = this.props;

        return (
            <div
                className={ classNames(['pannable', className]) }
                onMouseDown={ this.startPanning }
                onMouseUp={ this.stopPanning }
                onMouseOut={ this.stopPanning }
                onMouseMove={ this.pan }
            >
                { children }
                <div
                    className='pannable-handle'
                    style= { style }
                />
            </div>
        );
    }
})

export default Pannable;
