import React from 'react';
import {
    Card,
    Container,
    Image,
    Label
} from 'semantic-ui-react';
import moment from 'moment';

const NewsfeedCard = React.createClass({
    propTypes: {
        model: React.PropTypes.object.isRequired
    },
    render() {
        const { model } = this.props;
        return (
            <Card>
                <Image centered={ true } src={ model.lead_image_url } />
                <Card.Content>
                    <Card.Header>{ model.title }</Card.Header>
                    <Card.Description>
                        <div
                            dangerouslySetInnerHTML={ {
                                __html: model.excerpt
                            } }
                        />
                    </Card.Description>
                </Card.Content>
                <Card.Content>
                    <Card.Meta>{ model.author }</Card.Meta>
                    <Card.Meta>{ moment(model.date_published).format("dddd, MMMM Do YYYY") }</Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <Card.Description as={ Container }  textAlign="right"><Label basic color="teal">{ model.domain }</Label></Card.Description>
                </Card.Content>
            </Card>
        );
    }
});

export default NewsfeedCard;
