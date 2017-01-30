import React from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
// import {CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';

import AppHeader from '../layout/app-header';
// import { Card } from '../ui/card'
// import { CardBlock } from '../ui/card-block'
// import { Description } from '../ui/description'
// import { FountainFull } from '../ui/fountain-full'
// import { Image } from "../ui/image"
// import { HeaderPage } from "../ui/header-page"
// import { HeaderPageButton } from "../ui/header-page-button"
// import { SectionHeader } from '../ui/section-header'
// import UiState from '../ui/ui-state'

// import {
//     UI_STATE_INITIALIZING,
//     UI_STATE_COMPLETE,
// } from '../../constants/ui-state';
// import { getLocation } from  '../../actions/location'


const Index = React.createClass({
    // componentWillMount() {
    //     const { dispatch } = this.props;
    //     const { projectId, locationId } = this.props.params;
    //     dispatch(getLocation(projectId, locationId));
    // },
    render() {
        return (
            <div className="app">
                <div className="app-header">
                    <AppHeader title="Lameness Reduction Party"/>
                </div>
                <div className="app-body">
                    <div id="lipsum">
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent arcu felis, rutrum vitae arcu vitae, molestie vulputate lectus. Vestibulum dictum semper metus. Morbi sit amet justo quis arcu sodales aliquet. Ut ut congue diam, sed vestibulum diam. Donec eleifend ante metus, sed euismod lectus fermentum sit amet. Praesent et vulputate diam. Aliquam congue, leo quis vulputate molestie, enim lacus iaculis quam, sed tristique arcu leo vitae enim. Sed fermentum diam ut nulla dapibus, ut aliquam mi dignissim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin convallis, libero at volutpat ultricies, sapien nisi feugiat risus, id scelerisque ligula sem a metus. Curabitur ut nibh accumsan, consequat ante et, ultrices urna.
                            </p>
                            <p>
                            Nulla aliquam imperdiet velit pretium sagittis. Cras commodo pretium nisl, ut accumsan ante sollicitudin eget. Phasellus tincidunt tortor nulla, ut mollis neque ultrices in. Mauris faucibus metus eget feugiat viverra. Sed lobortis quam ac urna interdum volutpat. Ut venenatis orci non eros egestas cursus. Nulla dignissim, quam sit amet blandit scelerisque, nunc ipsum porta nisl, a gravida nunc sapien auctor urna. Fusce tempus, risus in mattis dapibus, nisi lacus laoreet est, in interdum nisl nisi sed sapien. Cras ultricies non justo ut hendrerit.
                            </p>
                            <p>
                            Donec aliquet nibh augue, at semper dolor interdum eu. Maecenas pretium nulla vitae augue euismod fringilla in sed tellus. Maecenas turpis mi, posuere a facilisis at, mollis eu felis. Donec accumsan in erat ut dapibus. Aliquam cursus quam sed lectus vulputate, id vehicula ligula egestas. Cras a eleifend justo. Sed rutrum ipsum id aliquet gravida. Vivamus neque nisi, volutpat at volutpat at, luctus a metus.
                            </p>
                            <p>
                            Aenean sit amet metus metus. Donec magna velit, gravida vel sapien nec, congue pellentesque odio. Cras imperdiet consectetur velit, a feugiat arcu hendrerit mattis. Vestibulum lobortis, odio nec vulputate efficitur, sapien quam accumsan dui, nec porta massa purus a augue. In semper et elit eget dapibus. Fusce orci ante, sagittis sit amet diam nec, luctus fermentum ligula. Aliquam at metus in turpis cursus auctor eget eu orci. Maecenas scelerisque elit quis sodales pretium. Nullam consequat venenatis tincidunt. Morbi purus neque, ultricies in auctor sit amet, vehicula sed arcu.
                            </p>
                            <p>
                            In sollicitudin nisl sit amet dui facilisis, non volutpat urna ultrices. Morbi tristique diam eu purus tempor euismod. Quisque ac libero vitae dolor laoreet tempus vel sed justo. Pellentesque vehicula tellus urna, vel porta ligula placerat in. Donec in orci a enim hendrerit tincidunt. Vestibulum orci risus, blandit at urna a, congue volutpat purus. Curabitur dui turpis, sollicitudin sit amet nunc ut, elementum pellentesque eros. Phasellus ac neque non nisl sagittis porttitor. Sed ultrices felis quis ipsum imperdiet, at tincidunt nisi eleifend.
                            </p>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent arcu felis, rutrum vitae arcu vitae, molestie vulputate lectus. Vestibulum dictum semper metus. Morbi sit amet justo quis arcu sodales aliquet. Ut ut congue diam, sed vestibulum diam. Donec eleifend ante metus, sed euismod lectus fermentum sit amet. Praesent et vulputate diam. Aliquam congue, leo quis vulputate molestie, enim lacus iaculis quam, sed tristique arcu leo vitae enim. Sed fermentum diam ut nulla dapibus, ut aliquam mi dignissim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin convallis, libero at volutpat ultricies, sapien nisi feugiat risus, id scelerisque ligula sem a metus. Curabitur ut nibh accumsan, consequat ante et, ultrices urna.
                            </p>
                            <p>
                            Nulla aliquam imperdiet velit pretium sagittis. Cras commodo pretium nisl, ut accumsan ante sollicitudin eget. Phasellus tincidunt tortor nulla, ut mollis neque ultrices in. Mauris faucibus metus eget feugiat viverra. Sed lobortis quam ac urna interdum volutpat. Ut venenatis orci non eros egestas cursus. Nulla dignissim, quam sit amet blandit scelerisque, nunc ipsum porta nisl, a gravida nunc sapien auctor urna. Fusce tempus, risus in mattis dapibus, nisi lacus laoreet est, in interdum nisl nisi sed sapien. Cras ultricies non justo ut hendrerit.
                            </p>
                            <p>
                            Donec aliquet nibh augue, at semper dolor interdum eu. Maecenas pretium nulla vitae augue euismod fringilla in sed tellus. Maecenas turpis mi, posuere a facilisis at, mollis eu felis. Donec accumsan in erat ut dapibus. Aliquam cursus quam sed lectus vulputate, id vehicula ligula egestas. Cras a eleifend justo. Sed rutrum ipsum id aliquet gravida. Vivamus neque nisi, volutpat at volutpat at, luctus a metus.
                            </p>
                            <p>
                            Aenean sit amet metus metus. Donec magna velit, gravida vel sapien nec, congue pellentesque odio. Cras imperdiet consectetur velit, a feugiat arcu hendrerit mattis. Vestibulum lobortis, odio nec vulputate efficitur, sapien quam accumsan dui, nec porta massa purus a augue. In semper et elit eget dapibus. Fusce orci ante, sagittis sit amet diam nec, luctus fermentum ligula. Aliquam at metus in turpis cursus auctor eget eu orci. Maecenas scelerisque elit quis sodales pretium. Nullam consequat venenatis tincidunt. Morbi purus neque, ultricies in auctor sit amet, vehicula sed arcu.
                            </p>
                            <p>
                            In sollicitudin nisl sit amet dui facilisis, non volutpat urna ultrices. Morbi tristique diam eu purus tempor euismod. Quisque ac libero vitae dolor laoreet tempus vel sed justo. Pellentesque vehicula tellus urna, vel porta ligula placerat in. Donec in orci a enim hendrerit tincidunt. Vestibulum orci risus, blandit at urna a, congue volutpat purus. Curabitur dui turpis, sollicitudin sit amet nunc ut, elementum pellentesque eros. Phasellus ac neque non nisl sagittis porttitor. Sed ultrices felis quis ipsum imperdiet, at tincidunt nisi eleifend.
                            </p>
                            <p>
                            Aenean sit amet metus metus. Donec magna velit, gravida vel sapien nec, congue pellentesque odio. Cras imperdiet consectetur velit, a feugiat arcu hendrerit mattis. Vestibulum lobortis, odio nec vulputate efficitur, sapien quam accumsan dui, nec porta massa purus a augue. In semper et elit eget dapibus. Fusce orci ante, sagittis sit amet diam nec, luctus fermentum ligula. Aliquam at metus in turpis cursus auctor eget eu orci. Maecenas scelerisque elit quis sodales pretium. Nullam consequat venenatis tincidunt. Morbi purus neque, ultricies in auctor sit amet, vehicula sed arcu.
                            </p>
                            <p>
                            In sollicitudin nisl sit amet dui facilisis, non volutpat urna ultrices. Morbi tristique diam eu purus tempor euismod. Quisque ac libero vitae dolor laoreet tempus vel sed justo. Pellentesque vehicula tellus urna, vel porta ligula placerat in. Donec in orci a enim hendrerit tincidunt. Vestibulum orci risus, blandit at urna a, congue volutpat purus. Curabitur dui turpis, sollicitudin sit amet nunc ut, elementum pellentesque eros. Phasellus ac neque non nisl sagittis porttitor. Sed ultrices felis quis ipsum imperdiet, at tincidunt nisi eleifend.
                            </p>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent arcu felis, rutrum vitae arcu vitae, molestie vulputate lectus. Vestibulum dictum semper metus. Morbi sit amet justo quis arcu sodales aliquet. Ut ut congue diam, sed vestibulum diam. Donec eleifend ante metus, sed euismod lectus fermentum sit amet. Praesent et vulputate diam. Aliquam congue, leo quis vulputate molestie, enim lacus iaculis quam, sed tristique arcu leo vitae enim. Sed fermentum diam ut nulla dapibus, ut aliquam mi dignissim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin convallis, libero at volutpat ultricies, sapien nisi feugiat risus, id scelerisque ligula sem a metus. Curabitur ut nibh accumsan, consequat ante et, ultrices urna.
                            </p>
                            <p>
                            Nulla aliquam imperdiet velit pretium sagittis. Cras commodo pretium nisl, ut accumsan ante sollicitudin eget. Phasellus tincidunt tortor nulla, ut mollis neque ultrices in. Mauris faucibus metus eget feugiat viverra. Sed lobortis quam ac urna interdum volutpat. Ut venenatis orci non eros egestas cursus. Nulla dignissim, quam sit amet blandit scelerisque, nunc ipsum porta nisl, a gravida nunc sapien auctor urna. Fusce tempus, risus in mattis dapibus, nisi lacus laoreet est, in interdum nisl nisi sed sapien. Cras ultricies non justo ut hendrerit.
                            </p>
                            <p>
                            Donec aliquet nibh augue, at semper dolor interdum eu. Maecenas pretium nulla vitae augue euismod fringilla in sed tellus. Maecenas turpis mi, posuere a facilisis at, mollis eu felis. Donec accumsan in erat ut dapibus. Aliquam cursus quam sed lectus vulputate, id vehicula ligula egestas. Cras a eleifend justo. Sed rutrum ipsum id aliquet gravida. Vivamus neque nisi, volutpat at volutpat at, luctus a metus.
                            </p>
                            <p>
                            Aenean sit amet metus metus. Donec magna velit, gravida vel sapien nec, congue pellentesque odio. Cras imperdiet consectetur velit, a feugiat arcu hendrerit mattis. Vestibulum lobortis, odio nec vulputate efficitur, sapien quam accumsan dui, nec porta massa purus a augue. In semper et elit eget dapibus. Fusce orci ante, sagittis sit amet diam nec, luctus fermentum ligula. Aliquam at metus in turpis cursus auctor eget eu orci. Maecenas scelerisque elit quis sodales pretium. Nullam consequat venenatis tincidunt. Morbi purus neque, ultricies in auctor sit amet, vehicula sed arcu.
                            </p>
                            <p>
                            In sollicitudin nisl sit amet dui facilisis, non volutpat urna ultrices. Morbi tristique diam eu purus tempor euismod. Quisque ac libero vitae dolor laoreet tempus vel sed justo. Pellentesque vehicula tellus urna, vel porta ligula placerat in. Donec in orci a enim hendrerit tincidunt. Vestibulum orci risus, blandit at urna a, congue volutpat purus. Curabitur dui turpis, sollicitudin sit amet nunc ut, elementum pellentesque eros. Phasellus ac neque non nisl sagittis porttitor. Sed ultrices felis quis ipsum imperdiet, at tincidunt nisi eleifend.
                            </p>
                            </div>
                </div>
                <div className="app-footer">footer</div>
            </div>
        );
        // const { ui_state, project, location, className } = this.props;
        //
        // if(!location)
        //     return <UiState state={ ui_state } />
        //
        // return (
        //     <div className="locationPage">
        //
        //         <LocationBreadcrumb { ...this.props } />
        //
        //         <UiState state={ ui_state } />
        //
        //         <HeaderPage title={ location.name }>
        //             <HeaderPageButton
        //                 onTouchTap={() => browserHistory.push(`/project/${project.id}/location/${location.id}/edit`)}
        //                 title="Edit"
        //             />
        //         </HeaderPage>
        //
        //         <Image src={ location.content } />
        //         <br />
        //
        //         <Card className='input-card'>
        //             <CardText>
        //                 <Description source={ location.description }  />
        //             </CardText>
        //         </Card>
        //
        //     </div>
        // )
    }
})

const mapStateToProps = (state) => {
    // const { ui_state, location, project } = state.location;
    // return {
    //     ui_state: ui_state ? ui_state : UI_STATE_INITIALIZING,
    //     project,
    //     location
    // }
    return state;
}

export default connect(mapStateToProps)(Index);
