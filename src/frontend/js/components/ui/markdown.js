import classNames from 'classnames';
import marked from 'marked';
import React, { Component } from 'react';
import PropTypes from 'prop-types'


class Markdown extends Component {
    render() {
        const { source, className } = this.props;
        if (source) {
            const html = { __html: marked(source) };
            return (
                <div
                    className={classNames(['markdown', className])}
                    dangerouslySetInnerHTML={html}
                />
            );
        }
        return null;
    }
};

Markdown.propTypes = {
    source: PropTypes.string.isRequired
};

export default Markdown;
