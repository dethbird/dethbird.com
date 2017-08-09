import React, { Component } from 'react';
import classNames from 'classnames';

class Container extends Component {
    render() {
        const { className } = this.props;
        return (
            <div className={ classNames(['container', className ]) }>
                { this.props.children }
            </div>
        )
    }
}
export default Container;
