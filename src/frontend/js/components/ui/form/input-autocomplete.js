import classNames from 'classnames';
import React from 'react'

const InputAutocomplete = React.createClass({

    propTypes: {
        label: React.PropTypes.string.isRequired,
        id: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        dataSource: React.PropTypes.array.isRequired
    },
    handleUpdateInput: function(value) {
        const { id, onChange } = this.props;
        onChange({
            target: {
                id: id,
                value: value
            }
        });
    },
    render: function() {
        const { label, id, onChange, dataSource } = this.props;

        return null;

        // return (
        //     <AutoComplete
        //         id={ id }
        //         hintText="Start typing"
        //         dataSource={ dataSource }
        //         onNewRequest={ this.handleUpdateInput }
        //         floatingLabelText={ label }
        //     />
        // );
    }
});

export default InputAutocomplete;
