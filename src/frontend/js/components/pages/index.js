import React from 'react';
import { browserHistory, Link } from 'react-router';
import pluralize from 'pluralize';
import request from 'superagent';

import Canvas from '../layout/canvas';

const Index = React.createClass({

    render() {
        return <Canvas layout={ layout } />
    }
})

export default Index;
