import React from 'react';
import {
    Form,
    Segment
} from 'semantic-ui-react';


const StoriesFilter = React.createClass({
    propTypes: {
        onFilter: React.PropTypes.func.isRequired
    },
    render() {
        const { onChange, onFilter } = this.props;

        return (
            <Segment raised>
                <Form>
                    Filter Form
                </Form>
            </Segment>
        )
    }
})

export default StoriesFilter;
