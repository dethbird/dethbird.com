import classNames from 'classnames';
import React from 'react'
import moment from 'moment';
import { browserHistory } from 'react-router';

import Description from '../../ui/description';
import Image from '../../ui/image';

const ContentArticleCard = React.createClass({

    propTypes: {
        className: React.PropTypes.string,
        article: React.PropTypes.object.isRequired,
        securityContext: React.PropTypes.object.isRequired,
        renderNav: React.PropTypes.bool
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
            <div className="card-content">
                <div className="content box"><Description source={ article.notes } className="notes" /></div>
            </div>
        );

    },
    renderNav: function() {
        const { article, securityContext, renderNav } = this.props;

        if (article.user.id !== securityContext.id || !renderNav)
            return null;

        return (
            <div className="card-footer">
                <a className="card-footer-item" onClick={ () => browserHistory.push(`/content/article/${article.id}/edit`)}>
                    <span className="icon">
                        <i className="fa fa-cog"></i>
                    </span>
                </a>
            </div>
        );

    },
    render: function() {
        const { article, className } = this.props;
        return (
            <div className={ classNames([className, 'card']) } >
                <header className="card-header">
                    <h4 className="card-header-title">
                        { article.title }
                    </h4>
                </header>
                <div className="card-image">
                    <figure className="image">
                        <Image src={ article.lead_image_url } />
                    </figure>
                </div>
                <div className="card-content">
                    <div className="content">{ article.excerpt }</div>
                    <div className="content is-clearfix">
                        <span className="is-pulled-left">
                            <strong>{  moment(article.date_published).format("YYYY MMMM Do") }</strong>
                            <br />
                            { article.author ? `by ${article.author}` : null }
                        </span>
                        <span className="is-pulled-right">
                            <a className="button is-primary" href={ article.url } target="_blank">{ article.domain }</a>
                        </span>
                    </div>
                </div>
                { this.renderNotes() }
                { this.renderNav() }
            </div>
        );
    }
})

export default ContentArticleCard;
