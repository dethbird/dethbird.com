import React, { Component } from 'react';
import classNames from 'classnames';
import { find } from 'lodash';

import { REGEX_INLINE } from 'constants/section';
import { SECTION_LEVEL } from 'constants/section';

class ScriptToken extends Component {
    constructor(props) {
        super(props);
        this.renderInlineText = this.renderInlineText.bind(this);
        this.renderTitleToken = this.renderTitleToken.bind(this);
        this.renderScriptToken = this.renderScriptToken.bind(this);
    }
    renderInlineText(token){
        let html = token.model.text.join('\n');
        html = html.replace(REGEX_INLINE.CENTERED, '<span class="centered">$1</span>')
                    .replace(REGEX_INLINE.NOTE, '<span class="note-inline">$1</span>')
                    .replace(REGEX_INLINE.PARENTHETICAL, '<span class="parenthetical">($1)</span>')
                    .replace(REGEX_INLINE.BOLD, '<span class="bold">$1</span>')
                    .replace(REGEX_INLINE.ITALIC, '<span class="italic">$1</span>')
                    .replace(REGEX_INLINE.UNDERLINE, '<span class="underline">$1</span>')
                    .replace(REGEX_INLINE.TWO_SPACES, '<br /><br />')
                    .replace('\n', '<br/>');
        return (
            <div
                className={classNames(['token-text', `token-text-${token.type}`])}
                dangerouslySetInnerHTML={ {
                    __html: html
                } }
            />
        );
    }
    renderTitleToken(token){
        const textNodes = token.model.text.map(function(t,i){
            return <div className='token-text' key={ i }>{ t }</div>
        });

        if (token.type == 'title')
            return (
                <div className={classNames(['token', 'title-token', token.type])}>
                    <h1>{ textNodes }</h1>
                </div>
            );

        return <div className={classNames(['token', 'title-token', token.type])}>{ textNodes }</div>;
    }
    renderScriptToken(token){
        const { renderInlineText } = this;

        const textNodes = token.model.text.map(function(t,i){
            return <div className={classNames(['token-text', `token-text-${token.type}`])} key={ i }>{ t }</div>
        });


        if (token.type == 'dialogue')
            return (
                <div className={classNames(['token', 'script-token', token.type])}>
                    <h5>
                        { token.model.character }
                        { token.model.parenthetical ? <span className='parenthetical'> {token.model.parenthetical}</span> : null }
                        { token.model.dual ? <span className='dual'> (together)</span> : null }
                    </h5>
                    { renderInlineText(token) }
                </div>
            );

        if (token.type == 'action')
            return (
                <div className={classNames(['token', 'script-token', token.type])}>
                    { renderInlineText(token) }
                </div>
            );

        if (token.type == 'scene' || token.type == 'transition')
            return (
                <div className={classNames(['token', 'script-token', token.type])}>
                    <h4>{ token.model.text[0] }</h4>
                </div>
            );

        if (token.type == 'page_break')
            return (
                <div className={classNames(['token', 'script-token', token.type])}>
                    <hr />
                </div>
            );
        return <div className={classNames(['token', 'script-token', token.type])}>{ textNodes }</div>;
    }
    render() {
        const { renderScriptToken, renderTitleToken } = this;
        const { token, type } = this.props;

        console.log(token);

        if (token.type=='blank_line')
            return <div id={ token.id } ref={(div) => { this.token = div; }} ></div>;

        if (type=='title')
            return <div
                id={ token.id }
                ref={(div) => { this.token = div; }}
            >
                { renderTitleToken(token) }
            </div>;


        if (type=='script')
            return <div
                id={ token.id }
                ref={(div) => { this.token = div; }}
            >
                { renderScriptToken(token) }
            </div>;

    }
};

export default ScriptToken;
