import classNames from 'classnames';
import React from 'react'
import moment from 'moment';
import { TweenMax, TimelineMax } from 'gsap';
import CustomScroll from 'react-custom-scroll';
import { browserHistory } from 'react-router';

import Description from '../../ui/description';
import Image from '../../ui/image';

const ContentArticleCard = React.createClass({

    propTypes: {
        className: React.PropTypes.string,
        article: React.PropTypes.object.isRequired,
        securityContext: React.PropTypes.object.isRequired,
        renderNav: React.PropTypes.bool,
        sequence: React.PropTypes.number
    },
    getDefaultProps: function() {
        return {
            renderNav: false
        }
    },
    renderNotes: function() {
        const { article } = this.props;

        if (!article.notes)
            return null;

        return (
            <div className="box">
                <CustomScroll heightRelativeToParent="calc(100% - 20px)">
                    <Description source={ article.notes } className="content notes" />
                </CustomScroll>
            </div>
        );

    },
    renderNav: function() {
        const { article, securityContext, renderNav } = this.props;

        if (article.user.id !== securityContext.id || !renderNav)
            return null;

        return (
            <div className="control is-grouped">
                <p className="control">
                    <a className="is-light" onClick={ () => browserHistory.push(`/content/article/${article.id}/edit`)}>
                        <span className="icon">
                            <i className="fa fa-cog"></i>
                        </span>
                    </a>
                </p>
            </div>
        );

    },
    componentDidMount: function() {
        const { sequence } = this.props
        const { root } = this.refs
        let tl = new TimelineMax();
        tl.add( TweenMax.from(root, .5, { scale: 1.3, opacity: 0 }, 0) );
        tl.delay( sequence ? sequence/4 : 0 );
        tl.play();
    },
    render: function() {
        const { article, className } = this.props;
        return (
            <div className={ classNames([className, 'card']) } ref="root">
                <header className="card-header">
                    <h5 className="card-header-title title is-5">
                        { article.title }
                    </h5>
                </header>
                <div className="card-image">
                    <figure className="image">
                        <Image src={ article.lead_image_url } />
                    </figure>
                </div>
                <div className="card-content">
                    <div className="content">{ article.excerpt }</div>
                    { this.renderNotes() }
                    <div className="content">
                        <a className="button is-primary is-small is-outlined" href={ article.url } target="_blank">{ article.domain }</a>
                        <br />
                        <span>{ article.author ? `by ${article.author}` : null }</span>
                        <br />
                        <strong>{  moment(article.date_published).format("YYYY MMMM Do") }</strong>
                    </div>
                    { this.renderNav() }
                </div>
            </div>
        );
    }
})

export default ContentArticleCard;
