import React from 'react';
import {
    Segment,
} from 'semantic-ui-react';

import ScriptForm from 'components/form/script-form';
import Footer from 'components/ui/footer';
import LoggedInHeader from 'components/ui/logged-in-header';


const ScriptEdit = React.createClass({
    render() {
        const { path } = this.props.route;
        const { securityContext } = this.props.route.props;
        const { id } = this.props.params;

        return (
            <Segment.Group>
                <LoggedInHeader path={ path } securityContext={ securityContext } />
                <Segment className="main-content">
                    <ScriptForm id={ id } />
                </Segment>
                <Footer />
            </Segment.Group>
        );
    }
})

export default ScriptEdit;
