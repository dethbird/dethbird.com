import classNames from 'classnames';
import React from 'react'
import moment from 'moment';
import { TweenMax, TimelineMax } from 'gsap';
import CustomScroll from 'react-custom-scroll';
import { browserHistory } from 'react-router';

import Description from '../../ui/description';
import InputCheckbox from '../../ui/form/input-checkbox';
// import Image from '../../ui/image';

const PocketArticleCard = React.createClass({

    propTypes: {
        className: React.PropTypes.string,
        article: React.PropTypes.object.isRequired,
        onCheckArticle: React.PropTypes.func.isRequired,
        sequence: React.PropTypes.number
    },
    renderNav: function() {
        const { article, onCheckArticle } = this.props;

        return (
            <div className="control is-grouped">
                <div className="control">
                    <InputCheckbox value={ article.resolved_url } onCheck={ onCheckArticle } />
                </div>
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

        let urlParser = document.createElement('a');
        urlParser.href = article.resolved_url;

        let authors = [];
        _.mapObject(article.authors, function(author, i) {
            authors.push(author.name);
        });

        return (
            <div className={ classNames([className, 'card']) } ref="root">
                <header className="card-header">
                    <h5 className="card-header-title title is-5">
                        { article.resolved_title }
                    </h5>
                </header>
                <div className="card-image">
                    <figure className="image">
                        <img src={ article.has_image=="1" ? article.image.src : null } />
                    </figure>
                </div>
                <div className="card-content">
                    <div className="content">{ article.excerpt }</div>
                    <div className="content">
                        <a className="button is-primary is-small is-outlined" href={ article.resolved_url } target="_blank">{ urlParser.hostname }</a>
                        <br />
                        <span>{ authors.lenth > 0 ? `by ${authors.join(" and ")}` : null }</span>
                        <br />
                        <strong>{  moment.unix(article.time_added).format("YYYY MMMM Do") }</strong>
                    </div>
                    { this.renderNav() }
                </div>
            </div>
        );
    }
})

export default PocketArticleCard;
