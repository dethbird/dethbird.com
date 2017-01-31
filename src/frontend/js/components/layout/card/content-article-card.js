import classNames from 'classnames';
import React from 'react'
import moment from 'moment';

const ContentArticleCard = React.createClass({

    propTypes: {
        className: React.PropTypes.string,
        article: React.PropTypes.object.isRequired
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
            </div>
        );
    }
})

export default ContentArticleCard;
