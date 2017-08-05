import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

export function BaseComponent => {
    class Authorized extends Component {
        componentWillMount() {
            console.log(this.props);
        }
        componentWillReceiveProps(nextProps) {
            console.log('props', nextProps);
        }
        render() {
            return <BaseComponent {...this.props} />;
        }
    }
    return withRouter(Authorized);
}