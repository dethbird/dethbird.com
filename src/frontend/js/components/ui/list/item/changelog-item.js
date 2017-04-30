import React from 'react';
import { browserHistory } from 'react-router';
import moment from 'moment';
import {
    Button,
    Item,
    Image,
    Label
} from 'semantic-ui-react';

const ChangelogItem = React.createClass({
    propTypes: {
        item: React.PropTypes.object.isRequired
    },
    render() {
        const { item } = this.props;
        if (item.model=='character') {
            return (
                <Item>
                    <Item.Image shape="circular" size="tiny" spaced={ true } centered={ true } src={ item.avatar_image_url || 'https://myspace.com/common/images/user.png' } />
                    <Item.Content verticalAlign="middle">
                        <Button as="a" size="mini" basic className="right floated" onClick={()=>{ browserHistory.push(`/character/${item.character_id}/edit`)}}>Edit</Button>
                        <Item.Header>{ item.name }</Item.Header>
                        <Item.Description>
                            <Label color={ item.type=='create' ? 'green' : 'blue' } size="mini">{ item.model }: { item.type }</Label>
                        </Item.Description>
                        <Item.Extra>{ moment(item.date_updated).format("dddd, MMMM Do YYYY h:mm:ss a") }</Item.Extra>
                    </Item.Content>

                </Item>
            );
        }
        if (item.model=='story') {
            return (
                <Item>
                    <Item.Image shape="rounded" size="tiny" spaced={ true } centered={ true } src={ item.header_image_url || 'https://c1.staticflickr.com/3/2843/34030429372_0fce46646f_b.jpg' } />
                    <Item.Content verticalAlign="middle">
                        <Button as="a" size="mini" basic className="right floated" onClick={()=>{ browserHistory.push(`/story/${item.story_id}/edit`)}}>Edit</Button>
                        <Item.Header>{ item.name }</Item.Header>
                        <Item.Description>
                            <Label color={ item.type=='create' ? 'green' : 'blue' } size="mini">{ item.model }: { item.type }</Label>
                        </Item.Description>
                        <Item.Extra>{ moment(item.date_updated).format("dddd, MMMM Do YYYY h:mm:ss a") }</Item.Extra>
                    </Item.Content>

                </Item>
            );
        }

        if (item.model=='project') {
            return (
                <Item>
                    <Item.Image shape="rounded" size="tiny" spaced={ true } centered={ true } src={ item.header_image_url || 'https://c1.staticflickr.com/3/2843/34030429372_0fce46646f_b.jpg' } />
                    <Item.Content verticalAlign="middle">
                        <Button as="a" size="mini" basic className="right floated" onClick={()=>{ browserHistory.push(`/project/${item.project_id}/edit`)}}>Edit</Button>
                        <Item.Header>{ item.name }</Item.Header>
                        <Item.Description>
                            <Label color={ item.type=='create' ? 'green' : 'blue' } size="mini">{ item.model }: { item.type }</Label>
                        </Item.Description>
                        <Item.Extra>{ moment(item.date_updated).format("dddd, MMMM Do YYYY h:mm:ss a") }</Item.Extra>
                    </Item.Content>

                </Item>
            );
        }
        return (
            <Item>
                { item.id }
            </Item>
        );
    }
});

export default ChangelogItem;
