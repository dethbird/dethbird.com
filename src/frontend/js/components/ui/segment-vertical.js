import React from 'react';
import cx from 'classnames';

const SegmentVertical = React.createClass({
    propTypes: {
        className: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.array
        ])
    },
    render() {
        const { children, className } = this.props;

        return (
            <div
                className={ cx(['ui', 'vertical', className, 'segment']) }
            >{ children }</div>
        );
    }
})

export default SegmentVertical;
