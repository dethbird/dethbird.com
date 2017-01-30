import classNames from 'classnames';
import React from 'react'

const ContentArticleCard = React.createClass({

    propTypes: {
        className: React.PropTypes.string,
        article: React.PropTypes.object.isRequired
    },

    render: function() {
        const { article, className } = this.props;

        return (
            <div className={ classNames([className, 'card']) }>
                <header className="card-header">
                    <p className="card-header-title">
                        { article.title }
                    </p>
                </header>
                <div className="card-image">
                    <figure className="image">
                        <img src={ article.lead_image_url } alt="Image" />
                    </figure>
                </div>
                <div className="card-content">
                    <div className="content">{ article.excerpt }</div>
                    <div className="content has-text-right"><small>{ article.date_published }</small></div>
                </div>
            </div>
        );
    }
})

export default ContentArticleCard;
