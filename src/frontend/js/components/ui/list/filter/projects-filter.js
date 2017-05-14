import React from 'react';
import {
    Button,
    Form,
    Grid,
    Segment
} from 'semantic-ui-react';


const ProjectsFilter = React.createClass({
    propTypes: {
        onFilter: React.PropTypes.func.isRequired,
    },
    getInitialState() {
        return {
            changedFields: {}
        }
    },
    handleFieldChange(e, payload) {
        const { changedFields } = this.state;
        if (payload.type=="checkbox") {
            changedFields[payload.id] = payload.checked;
        } else {
            changedFields[payload.name] = payload.value;
        }
        this.setState({
            ... this.state,
            changedFields
        });
    },
    handleSubmit(e){
        e.preventDefault();
        const { onFilter } = this.props;
        const { changedFields } = this.state;
        onFilter(e, changedFields);
    },
    handleReset(e) {
        const { onFilter } = this.props;
        this.setState({
            ... this.state,
            changedFields: {}
        });
        onFilter(e, {});
    },
    render() {
        const { handleFieldChange, handleSubmit, handleReset } = this;
        const { onChange, onFilter } = this.props;

        return (
            <Segment>
                <Form
                    size="small"
                    onSubmit={ handleSubmit }
                >
                    <Grid verticalAlign='bottom'>
                        <Grid.Column width={ 4 } >
                            <Form.Input label="Name" placeholder="Name" name="name" type="text" onChange={ handleFieldChange } />
                        </Grid.Column>
                        <Grid.Column width={ 3 } >
                            <Button type='submit' icon='filter' basic color='teal' />
                            <Button as='a' icon='remove' basic onClick={ handleReset }/>
                        </Grid.Column>
                    </Grid>
                </Form>
            </Segment>
        )
    }
})

export default ProjectsFilter;
