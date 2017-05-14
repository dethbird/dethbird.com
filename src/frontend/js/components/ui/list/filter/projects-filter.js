import React from 'react';
import {
    Button,
    Form,
    Grid,
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
                    <Grid verticalAlign='bottom'>
                        <Grid.Column width={ 4 } >
                            <Form.Input label="Name" placeholder="Name" id="name" type="text" onChange={ ()=>{} } />
                        </Grid.Column>
                        <Grid.Column width={ 2 } >
                            <Button type='submit' icon='filter' labelPosition='right' content='Filter' />
                        </Grid.Column>
                    </Grid>
                </Form>
            </Segment>
        )
    }
})

export default ProjectsFilter;
