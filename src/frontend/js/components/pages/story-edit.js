import React from 'react';

import InternalLayout from 'components/layout/internal';
import StoryForm from 'components/form/story-form';


const StoryEdit = React.createClass({
    render() {
        const { path } = this.props.route;
        const { securityContext } = this.props.route.props;
        const { id, projectId } = this.props.params;

        return (
            <InternalLayout path={ path } securityContext={ securityContext }>
                <StoryForm id={ id } projectId={ projectId } />
            </InternalLayout>
        );
    }
})

export default StoryEdit;
