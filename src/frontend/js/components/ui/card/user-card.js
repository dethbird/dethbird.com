import React from 'react';
import { browserHistory } from 'react-router';
import {
    Card,
    Grid,
    Icon,
    Image,
    Label,
    List
} from 'semantic-ui-react';
import moment from 'moment';

const UserCard = React.createClass({
    propTypes: {
        user: React.PropTypes.object.isRequired
    },
    render() {
        const { user } = this.props;
        return (
            <Card onClick={ (e) => { browserHistory.push(`/admin/user/${user.id}/edit`)} } >
                <Image shape="rounded" src={ user.avatar_image_url || 'https://myspace.com/common/images/user.png' } />
                <Card.Content>
                    <Card.Header>{ user.username }</Card.Header>
                    <Card.Meta>{ user.email }</Card.Meta>
                </Card.Content>

                <Card.Content extra>
                    <List divided size='small' relaxed>
                        <List.Item>
                            {
                                user.date_verified!==null
                                ? <span><Icon name='checked calendar' />{ moment(user.date_verified).format("MMM Do YY, h:mm a")  }</span>
                                : <Label color='red' basic horizontal  size='small'><Icon name='checked calendar' /> Not Verified</Label>
                            }
                        </List.Item>
                        <List.Item>
                            {
                                user.date_activated!==null
                                ? <span><Icon name='checked calendar' />{ moment(user.date_activated).format("MMM Do YY, h:mm a")  }</span>
                                : <Label color='red' basic horizontal  size='small'><Icon name='checked calendar' /> Not Activated</Label>
                            }
                        </List.Item>
                        <List.Item>
                            <Icon name='add to calendar' />{ moment(user.date_created).format("MMM Do YY, h:mm a") }
                        </List.Item>
                        <List.Item>
                            <Icon name='calendar' />{ moment(user.date_updated).format("MMM Do YY, h:mm a") }
                        </List.Item>
                    </List>
                </Card.Content>
            </Card>
        );
    }
});

export default UserCard;
