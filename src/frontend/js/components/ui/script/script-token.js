import React from 'react';
import classNames from 'classnames';
import {
    Container,
    Divider,
    Grid,
    Header,
    Image,
    Segment
} from 'semantic-ui-react';
import { SECTION_LEVEL } from 'constants/section';

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
            return (
                <div className={classNames(['token', 'title-token', token.type])}>
                    <Header as="h1">{ textNodes }</Header>
                </div>
            );

        return <div className={classNames(['token', 'title-token', token.type])}>{ textNodes }</div>;
    },
    renderScriptToken(token){

        const textNodes = token.model.text.map(function(t,i){
            return <div className={classNames(['token-text', `token-text-${token.type}`])} key={ i }>{ t }</div>
        });

        const sectionIcon = (token) => {
            return <Image className={classNames(['section-icon', `section-icon-${SECTION_LEVEL[token.model.level]}`])} src={`/svg/section/${SECTION_LEVEL[token.model.level]}.svg`} />;
        }

        if (token.type == 'dialogue')
            return (
                <div className={classNames(['token', 'script-token', token.type])}>
                    <Header as="h5">{ token.model.character }</Header>
                    { textNodes }
                </div>
            );

        if (token.type == 'scene' || token.type == 'transition')
            return (
                <div className={classNames(['token', 'script-token', token.type])}>
                    <Header as="h4">{ token.model.text[0] }</Header>
                </div>
            );

        if (token.type == 'page_break')
            return (
                <div className={classNames(['token', 'script-token', token.type])}>
                    <Divider />
                </div>
            );

        if (token.type == 'section') {
            return (
                <div className={classNames(['token', 'script-token', token.type, `section-${SECTION_LEVEL[token.model.level]}`])}>
                    <Grid>
                        <Grid.Column width={ 14 }>
                            <Header as={'h' + `${token.model.level}`}>{ sectionIcon(token) }{ token.model.text[0] }</Header>
                        </Grid.Column>
                        <Grid.Column width={ 2 } textAlign='right' verticalAlign='middle'>
                            { token.model.duration && token.model.level==4 ? <span className='panel-duration right floated'>{ token.model.duration }</span> : null }
                        </Grid.Column>
                    </Grid>
                    <Divider />
                    { token.model.image && token.model.level==4 ? <Segment inverted><Image src={token.model.image} centered className='panel-image'/></Segment> : null }
                </div>
            );
        }
        return <div className={classNames(['token', 'script-token', token.type])}>{ textNodes }</div>;
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
