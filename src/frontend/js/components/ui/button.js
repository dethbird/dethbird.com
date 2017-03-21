import React from 'react';
import cx from 'classnames';

const Button = React.createClass({
    propTypes: {
        className: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.array
        ])
    },
    render() {
        const { children, className } = this.props;

        return (
            <a
                className={ cx(['ui', className, 'button']) }
            >{ children }</a>
        );
    }
})

export default Button;
