import React from 'react'
import { render } from 'react-dom'
import { IndexRoute, Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

import { App } from '../components/app'
import Character from '../components/pages/character'
import CharacterEdit from '../components/pages/character-edit'
import CharacterRevisionEdit from '../components/pages/character-revision-edit'
import ConceptArt from '../components/pages/concept_art'
import ConceptArtEdit from '../components/pages/concept_art-edit'
import ConceptArtRevisionEdit from '../components/pages/concept_art-revision-edit'
import LocationEdit from '../components/pages/location-edit'
import Project from '../components/pages/project'
import ProjectEdit from '../components/pages/project-edit'
import { ProjectCharactersEdit } from '../components/pages/project-characters-edit'
import { ProjectConceptArtEdit } from '../components/pages/project-concept_art-edit'
import { ProjectLocationsEdit } from '../components/pages/project-locations-edit'
import { ProjectReferenceImagesEdit } from '../components/pages/project-reference_images-edit'
import { ProjectStoryboardsEdit } from '../components/pages/project-storyboards-edit'
import Projects from '../components/pages/projects'
import { ProjectsEdit } from '../components/pages/projects-edit'
import ReferenceImage from '../components/pages/reference_image'
import ReferenceImageEdit from '../components/pages/reference_image-edit'
import Script from '../components/pages/script'
import ScriptEdit from '../components/pages/script-edit'
import Storyboard from '../components/pages/storyboard'
import StoryboardEdit from '../components/pages/storyboard-edit'
import StoryboardPanel from '../components/pages/storyboard-panel'
import StoryboardPanelEdit from '../components/pages/storyboard-panel-edit'
import StoryboardPanelCommentEdit from '../components/pages/storyboard-panel-comment-edit'
import StoryboardPanelRevisionEdit from '../components/pages/storyboard-panel-revision-edit'
import store from '../store/store';

const NoMatch = React.createClass({
  render() {
    return (
      <div>Whachhu talkin about</div>
    )
  }
})

if (lastRequestUri) {
    browserHistory.push(lastRequestUri);
}

render((
    <Provider store={ store }>
        <Router history={browserHistory}>
            <Route path="/" component={ App}>
                <IndexRoute component={ Projects } />
                <Route path="projects" component={ Projects } />
                <Route path="projects/edit" component={ ProjectsEdit } />
                <Route path="project/add" component={ ProjectEdit } />
                <Route path="project/:projectId" component={ Project } />
                <Route path="project/:projectId/edit" component={ ProjectEdit } />
                <Route path="project/:projectId/characters/edit" component={ ProjectCharactersEdit } />
                <Route path="project/:projectId/character/add" component={ CharacterEdit } />
                <Route path="project/:projectId/character/:characterId" component={ Character } />
                <Route path="project/:projectId/character/:characterId/edit" component={ CharacterEdit } />
                <Route path="project/:projectId/character/:characterId/revision/add" component={ CharacterRevisionEdit } />
                <Route path="project/:projectId/character/:characterId/revision/:revisionId/edit" component={ CharacterRevisionEdit } />
                <Route path="project/:projectId/concept_art/edit" component={ ProjectConceptArtEdit } />
                <Route path="project/:projectId/concept_art/add" component={ ConceptArtEdit } />
                <Route path="project/:projectId/concept_art/:conceptArtId" component={ ConceptArt } />
                <Route path="project/:projectId/concept_art/:conceptArtId/edit" component={ ConceptArtEdit } />
                <Route path="project/:projectId/concept_art/:conceptArtId/revision/add" component={ ConceptArtRevisionEdit } />
                <Route path="project/:projectId/concept_art/:conceptArtId/revision/:revisionId/edit" component={ ConceptArtRevisionEdit } />
                <Route path="project/:projectId/locations/edit" component={ ProjectLocationsEdit } />
                <Route path="project/:projectId/location/add" component={ LocationEdit } />
                <Route path="project/:projectId/location/:locationId/edit" component={ LocationEdit } />
                <Route path="project/:projectId/reference_images/edit" component={ ProjectReferenceImagesEdit } />
                <Route path="project/:projectId/reference_image/add" component={ ReferenceImageEdit } />
                <Route path="project/:projectId/reference_image/:referenceImageId" component={ ReferenceImage } />
                <Route path="project/:projectId/reference_image/:referenceImageId/edit" component={ ReferenceImageEdit } />
                <Route path="project/:projectId/script/add" component={ ScriptEdit } />
                <Route path="project/:projectId/script/:scriptId" component={ Script } />
                <Route path="project/:projectId/script/:scriptId/edit" component={ ScriptEdit } />
                <Route path="project/:projectId/storyboards/edit" component={ ProjectStoryboardsEdit } />
                <Route path="project/:projectId/storyboard/add" component={ StoryboardEdit } />
                <Route path="project/:projectId/storyboard/:storyboardId" component={ Storyboard } />
                <Route path="project/:projectId/storyboard/:storyboardId/edit" component={ StoryboardEdit } />
                <Route path="project/:projectId/storyboard/:storyboardId/panel/add" component={ StoryboardPanelEdit } />
                <Route path="project/:projectId/storyboard/:storyboardId/panel/:panelId" component={ StoryboardPanel } />
                <Route path="project/:projectId/storyboard/:storyboardId/panel/:panelId/edit" component={ StoryboardPanelEdit } />
                <Route path="project/:projectId/storyboard/:storyboardId/panel/:panelId/comment/add" component={ StoryboardPanelCommentEdit } />
                <Route path="project/:projectId/storyboard/:storyboardId/panel/:panelId/comment/:commentId/edit" component={ StoryboardPanelCommentEdit } />
                <Route path="project/:projectId/storyboard/:storyboardId/panel/:panelId/revision/add" component={ StoryboardPanelRevisionEdit } />
                <Route path="project/:projectId/storyboard/:storyboardId/panel/:panelId/revision/:revisionId/edit" component={ StoryboardPanelRevisionEdit } />
                <Route path="*" component={ Projects } />
            </Route>
        </Router>
    </Provider>
), document.getElementById('mount'))
