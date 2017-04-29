import React from 'react';
import { browserHistory } from 'react-router';
import {
    Card,
    Image
} from 'semantic-ui-react';

const ProjectCard = React.createClass({
    propTypes: {
        project: React.PropTypes.object.isRequired
    },
    render() {
        const { project } = this.props;
        return (
            <Card onClick={ (e) => { browserHistory.push(`/project/${project.id}/edit`)} } >
                <Card.Content className="center aligned">
                    <Image shape="rounded" spaced={ true } centered={ true } src={ project.avatar_image_url || 'https://c1.staticflickr.com/3/2843/34030429372_0fce46646f_b.jpg' } />
                    <Card.Header>{ project.name }</Card.Header>
                </Card.Content>
            </Card>
        );
    }
});

export default ProjectCard;
