import React from 'react';
import cx from 'classnames';

const ItemContainer = React.createClass({
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
                className={ cx(['ui', className, 'item']) }
            >{ children }</div>
        );
    }
})

export default ItemContainer;
