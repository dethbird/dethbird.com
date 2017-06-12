import React from 'react';
import { browserHistory } from 'react-router';
import {
    Button,
    Divider,
    Form,
    Grid,
    Segment,
    Select
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
    handleSelectChange(e, payload) {
        const { handleFieldChange, handleSubmit } = this;
        const { onFilter } = this.props;
        handleFieldChange(e, payload);
        setTimeout(function(){
            handleSubmit(new Event('handleSelectChange'));
        }, 100);
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
        const { handleFieldChange, handleSelectChange, handleSubmit, handleReset } = this;
        const { onChange, onFilter } = this.props;
        const { changedFields } = this.state;

        return (
            <Segment>
                <Form
                    size="small"
                    onSubmit={ handleSubmit }
                >
                    <Grid verticalAlign='bottom'>
                        <Grid.Column width={ 4 } >
                            <Form.Input label="Title" placeholder="Title" name="title" type="text" onChange={ handleFieldChange } value={ changedFields.title || ''}/>
                        </Grid.Column>
                        <Grid.Column width={ 4 } >
                            <Form.Field>
                                <label>Order</label>
                                <Select placeholder="Order by" onChange={ handleSelectChange } name="order_by" options={[
                                    {
                                        key: "title_asc",
                                        value: "title asc",
                                        text: "Title A-Z"
                                    },
                                    {
                                        key: "title_desc",
                                        value: "title desc",
                                        text: "Title Z-A"
                                    },
                                    {
                                        key: "date_created_desc",
                                        value: "date_created desc",
                                        text: "Created (latest first)"
                                    },
                                    {
                                        key: "date_updated_desc",
                                        value: "date_updated desc",
                                        text: "Updated (latest first)"
                                    },
                                    {
                                        key: "date_created_asc",
                                        value: "date_created asc",
                                        text: "Created (oldest first)"
                                    },
                                    {
                                        key: "date_updated_asc",
                                        value: "date_updated asc",
                                        text: "Updated (oldest first)"
                                    }
                                ]}/>
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column width={ 3 } >
                            <Button type='submit' icon='filter' basic color='teal' />
                            <Button as='a' icon='remove' basic onClick={ handleReset }/>
                        </Grid.Column>
                        <Grid.Column width={ 5 } textAlign='right'>
                            <Divider vertical />
                            <Button as='a' content='New' labelPosition='right' icon='add' color='green' onClick={()=>{browserHistory.push('/project/create')}} />
                        </Grid.Column>
                    </Grid>
                </Form>
            </Segment>
        )
    }
})

export default ProjectsFilter;
