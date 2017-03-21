import React from 'react';

const Index = React.createClass({
    render() {
        const { securityContext } = this.props.route.props;
        console.log(securityContext);
        return (
            <div>index</div>
        )
    }
})

export default Index;
