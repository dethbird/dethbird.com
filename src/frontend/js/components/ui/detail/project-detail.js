import React from 'react';
import { connect } from 'react-redux';
import {
    Container
} from 'semantic-ui-react';

import { UI_STATE } from 'constants/ui-state';
import { projectGet } from 'actions/project';


const ProjectDetail = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired
    },
    componentWillMount() {
        const { dispatch } = this.props;
        const { id } = this.props;
        dispatch(projectGet(id));
    },
    render() {
        const { id, ui_state, errors, model } = this.props;

        return (
            <Container text={ true }>
                farts
            </Container>
        )
    }
})

const mapStateToProps = (state) => {
    const { ui_state, errors, model } = state.projectReducer;
    return {
        ui_state: ui_state ? ui_state : UI_STATE.INITIALIZING,
        errors,
        model
    }
}

export default connect(mapStateToProps)(ProjectDetail);
