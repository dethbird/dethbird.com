import React from 'react';

import InternalLayout from 'components/layout/internal';
import StoryPlayer from 'components/ui/story-player';


const StoryPlay = React.createClass({
    render() {
        const { path } = this.props.route;
        const { securityContext } = this.props.route.props;
        const { id } = this.props.params;

        return (
            <InternalLayout path={ path } securityContext={ securityContext }>
                <StoryPlayer id={ id } />
            </InternalLayout>
        );
    }
})

export default StoryPlay;
