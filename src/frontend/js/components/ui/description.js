import React from 'react';
// import ReactMarkdown from 'react-markdown';
import marked from 'marked';

import classNames from 'classnames';

const Description = React.createClass({
    propTypes: {
        source: React.PropTypes.string,
        className: React.PropTypes.string
    },
    render: function() {
        const { source, className } = this.props;

        if (source) {
            const html = {__html: marked(source)};
            return (
                <div
                    className={ classNames([className, 'description']) }
                    dangerouslySetInnerHTML={ html }
                />
            );
        }


            /*
            return (
                <ReactMarkdown
                    className={ classNames([className, 'description']) }
                    source={ source || '' }
                >
                </ReactMarkdown>
            );
            */
        return null;
    }
})

export default Description;
