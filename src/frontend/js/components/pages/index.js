import React from 'react';
import { browserHistory, Link } from 'react-router';
import pluralize from 'pluralize';
import request from 'superagent';

import Element from '../layout/element';

const Index = React.createClass({

    render() {

        const elementNodes = layout.elements.map(function(element, i){
            return (
                <Element element={ element } key={ i }/>
            );
        });

        return (
            <div className="canvas">
                { elementNodes }
            </div>
        );
    }
})

export default Index;
