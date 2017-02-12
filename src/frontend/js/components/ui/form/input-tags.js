import classNames from 'classnames';
import React from 'react'
import { WithContext as ReactTags } from 'react-tag-input';
import request from 'superagent';

class RemoveComponent extends React.Component {
    render() {
        return (
            <a {...this.props} className="delete is-small" />
        )
    }
}

const InputTags = React.createClass({
    propTypes: {
        tags: React.PropTypes.array.isRequired,
        onChange: React.PropTypes.func.isRequired
    },
    getInitialState() {
        const { tags } = this.props;
        return {
            tags: tags,
            suggestions: []
        }
    },
    componentDidMount() {
        const that = this;
        request.get('/api/tags')
            .end(function(err, res){

                const tags = res.body.map(function(tag,i){
                    return tag.text;
                });

                that.setState({
                    ... that.state,
                    suggestions: tags
                });
        });
    },
    componentWillReceiveProps(nextProps) {
        const { tags } = nextProps;
        if (this.isMounted()){
            this.setState({ ...this.state, tags });
        }
    },
    handleDelete(i) {
        const { tags } = this.state;
        const { onChange } = this.props;

        tags.splice(i, 1);

        onChange(tags);
        this.setState({...this.state, tags});
    },
    handleAddition(tag) {
        const { tags } = this.state;
        const { onChange } = this.props;

        tags.push({
            id: tags.length + 1,
            text: tag
        });

        onChange(tags);
        this.setState({...this.state, tags});
    },
    handleDrag(tag, currPos, newPos) {
        const { tags } = this.state;
        const { onChange } = this.props;

        tags.splice(currPos, 1);
        tags.splice(newPos, 0, tag);

        onChange(tags);
        this.setState({ ...this.state, tags });
    },
    render() {
        const { suggestions, tags } = this.state;
        return (
            <div>
                <ReactTags
                    tags={tags}
                    suggestions={suggestions}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    handleDrag={this.handleDrag}
                    minQueryLength={ 1 }
                    classNames={{
                        tags: 'input-tags',
                        tagInput: 'control',
                        tagInputField: 'input',
                        selected: 'content',
                        tag: 'tag is-info is-medium',
                        remove: 'delete is-small',
                        suggestions: 'suggestions'
                    }}
                    removeComponent={ RemoveComponent }
                />
            </div>
        )
    }
});

export default InputTags;
