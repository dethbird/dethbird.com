import React from 'react';
import {
    Form,
    Segment
} from 'semantic-ui-react';


const ProjectsFilter = React.createClass({
    propTypes: {
        onFilter: React.PropTypes.func.isRequired
    },
    render() {
        const { onChange, onFilter } = this.props;

        return (
            <Segment>
                <Form size="small">
                    <Form.Group>
                        <Form.Input label="Name" placeholder="Name" id="name" type="text" onChange={ ()=>{} } width={ 3 } />
                        <Form.Input label="Genre" placeholder="Genre" id="genre" type="text" onChange={ ()=>{} } width={ 3 } />
                    </Form.Group>
                </Form>
            </Segment>
        )
    }
})

export default ProjectsFilter;
