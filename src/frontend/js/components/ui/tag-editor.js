import React from 'react';
import {
    Container,
    Divider,
    Input,
    Label
} from 'semantic-ui-react';

const TagEditor = React.createClass({
    getInitialState() {
        return {
            tags: [],
            newTag: undefined
        }
    },
    propTypes: {
        tagsArrayAsJson: React.PropTypes.string,
        onChange: React.PropTypes.func
    },
    componentWillReceiveProps(nextProps){
        const { tagsArrayAsJson } = nextProps;
        this.setState({
            tags: tagsArrayAsJson ? JSON.parse(tagsArrayAsJson) : []
        });
    },
    handleFieldChange(e) {
        this.setState({
            ... this.state,
            newTag: e.currentTarget.value
        });
    },
    addTag() {
        const { tags, newTag } = this.state;
        const { onChange } = this.props;
        const newTags = tags;

        if(newTag) {
            newTags.push(newTag);
            this.setState({
                tags: newTags,
                newTag: null
            });

            const e = {
                currentTarget: {
                    value: JSON.stringify(newTags)
                }
            };
            onChange(e, 'tags');
        }
    },
    render() {
        const { tags, newTag } = this.state;
        const tagNodes = tags.map(function(tag, i){
            return (
                <Label color="teal" tag={ true } size="large" key={ i }>{ tag }</Label>
            );
        });

        return (
            <Container>
                { tagNodes }
                <Divider clearing={ true } hidden/>
                <Input
                    placeholder="New tag"
                    id="new_tag"
                    type="text"
                    icon="tags"
                    iconPosition="left"
                    label={{ tag: true, content: 'Add', color: "teal", onClick: this.addTag, as: "a" }}
                    labelPosition="right"
                    onChange={ this.handleFieldChange }
                    value={ newTag || '' }
                />
            </Container>
        )
    }
})

export default TagEditor;
