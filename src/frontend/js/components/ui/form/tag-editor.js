import React from 'react';
import ReactGA from 'react-ga';
import * as _ from 'underscore';
import {
    Button,
    Container,
    Divider,
    Icon,
    Input,
    Label,
    List,
    Modal
} from 'semantic-ui-react';

const TagEditor = React.createClass({
    getInitialState() {
        return {
            modalVisible: false,
            tags: [],
            newTag: undefined
        }
    },
    toggleModalVisible(e) {
        e.preventDefault();
        if (!this.state.modalVisible===true) {
            ReactGA.modalview('/tag-input-modal');
        }
        this.setState({
            ... this.state,
            modalVisible: !this.state.modalVisible,
            newTag: !this.state.modalVisible===true ? null : this.state.newTag
        });
    },
    propTypes: {
        tagsArrayAsJson: React.PropTypes.string,
        onChange: React.PropTypes.func
    },
    componentWillReceiveProps(nextProps){
        const { tagsArrayAsJson } = nextProps;
        this.setState({
            ... this.state,
            tags: tagsArrayAsJson ? JSON.parse(tagsArrayAsJson) : []
        });
    },
    handleFieldChange(e) {
        this.setState({
            ... this.state,
            newTag: e.currentTarget.value
        });
    },
    addTag(e) {
        const { toggleModalVisible } = this;
        const { tags, newTag } = this.state;
        const { onChange } = this.props;
        const newTags = tags;

        if(newTag) {
            newTags.push(newTag);
            this.setState({
                tags: newTags,
                newTag: null
            });

            onChange(e, {
                id: 'tags',
                value: JSON.stringify(newTags)
            });

            setTimeout(function(){
                toggleModalVisible(new Event('addTag'));
            }, 10)
        }
    },
    removeTag(tag) {
        const { tags } = this.state;
        const { onChange } = this.props;

        const newTags = _.filter(tags, function(t){
            return t !== tag;
        });

        this.setState({
            tags: newTags,
            newTag: null
        });

        onChange(null, {
            id: 'tags',
            value: JSON.stringify(newTags)
        });
    },
    render() {
        const { removeTag, toggleModalVisible } = this;
        const { tags, newTag, modalVisible } = this.state;
        const tagNodes = tags.map(function(tag, i){
            return (
                <List.Item key={ i } >
                    <List.Content>
                        <Label size="large" color="teal" tag={ true }>{ tag } <a><Icon name="trash" onClick={ (e) => { removeTag(tag) } }/></a></Label>
                    </List.Content>
                </List.Item>
            );
        });

        tagNodes.push(
            <List.Item key={ tagNodes.length } >
                <List.Content>
                    <Button icon='add' size='mini' onClick={ toggleModalVisible }/>
                </List.Content>
            </List.Item>
        );

        return (
            <Container className='tags-input'>
                <List horizontal>
                    { tagNodes }
                </List>
                <Modal open={ modalVisible } dimmer='blurring' onClose={ toggleModalVisible } size='small'>
                    <Modal.Content>
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
                            fluid
                        />
                    </Modal.Content>
                </Modal>

            </Container>
        )
    }
})

export default TagEditor;
