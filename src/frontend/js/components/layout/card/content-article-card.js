import classNames from 'classnames';
import React from 'react'
import moment from 'moment';

import Description from '../../ui/description';

const ContentArticleCard = React.createClass({

    propTypes: {
        className: React.PropTypes.string,
        article: React.PropTypes.object.isRequired
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
    render: function() {
        const { article, className } = this.props;
        return (
            <div className={ classNames([className, 'card']) } >
                <header className="card-header">
                    <h5 className="card-header-title">
                        { article.title }
                    </h5>
                </header>
                <div className="card-image">
                    <figure className="image">
                        <img src={ article.lead_image_url } alt="Image" />
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
            </div>
        );
    }
})

export default ContentArticleCard;
