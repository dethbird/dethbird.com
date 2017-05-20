import React from 'react';
import classNames from 'classnames';
import {
    Container
} from 'semantic-ui-react';

const ScriptToken = React.createClass({
    propTypes: {
        token: React.PropTypes.object.isRequired,
        type: React.PropTypes.string.isRequired // title|script
    },
    renderTitleToken(token){
        const textNodes = token.model.text.map(function(t,i){
            return <div className='token-text' key={ i }>{ t }</div>
        });

        if (token.type == 'title')
            return <div className={classNames(['token', 'title', token.type])}><h1>{ textNodes }</h1></div>

        return <div className={classNames(['token', 'title', token.type])}>{ textNodes }</div>;
    },
    renderScriptToken(token){
        console.log(token);

        const textNodes = token.model.text.map(function(t,i){
            return <div className='token-text' key={ i }>{ t }</div>
        });

        if (token.type == 'dialogue')
            return <div className={classNames(['token', 'script', token.type])}><h1>{ token.model.character }</h1>{ textNodes }</div>

        return <div className={classNames(['token', 'script', token.type])}>{ textNodes }</div>;
    },
    render() {
        const { renderScriptToken, renderTitleToken } = this;
        const { token, type } = this.props;

        if (token.type=='blank_line')
            return null;

        if (type=='title')
            return renderTitleToken(token);

        if (type=='script')
            return renderScriptToken(token);

    }
})

export default ScriptToken;
