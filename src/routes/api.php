<?php

# api local login
$app->post('/api/login', function () use ($app) {

    $configs = $app->container->get('configs');

    $user = User::find_by_username_and_password(
        $app->request->params('username'),
        md5($app->request->params('password'))
    );

    if(!$user) {
        $app->halt(404);
    }

    $model = json_decode(
        $user->to_json([
            'except'=>[
                'password',
                'app_user',
                'notifications',
                'date_added',
                'date_updated']
    ]));

    $_SESSION['securityContext'] = $model;

    if (isset($_SESSION['redirectTo'])) {
        $model->redirectTo = $_SESSION['redirectTo'];
    } else {
        $model->redirectTo = '/projects';
    }

    $app->response->setStatus(200);
    $app->response->headers->set('Content-Type', 'application/json');
    $app->response->setBody(json_encode($model));

});

# remote login
$app->post('/api/authorize', function () use ($app) {

    $configs = $app->container->get('configs');

    $data = json_decode($app->request->getBody());

    if($data) {

        $user = User::find_by_username_and_password(
            $data->username,
            md5($data->password)
        );

        if(!$user) {
            $app->halt(404);
        }

        $app->response->setStatus(200);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setBody($user->to_json([
            'except'=>['password', 'app_user', 'notifications', 'date_added', 'date_updated']
        ]));
    } else {
        $app->halt(400);
    }

});

$app->group('/api', $authorizeByHeaders($app), function () use ($app) {

    # update comment
    $app->post('/comment', function () use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];

        /**
         * @todo use a different column to store the commenting user id
         */
        $model = new Comment($app->request->params());
        $object = json_decode($model->to_json());
        unset($object->user);
        // print_r($object); die();
        # validate
        $validator = new Validator();
        $validation_response = $validator->validate(
            $object,
            APPLICATION_PATH . "configs/validation_schemas/comment.json");

        if (is_array($validation_response)) {
            $app->response->setStatus(400);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody(json_encode($validation_response));
        } else {

            $model->save();
            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody($model->to_json());
        }

    });

    # update comment
    $app->put('/comment/:id', function ($id) use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];
        $db = $app->container->get('db');
        $id = (int) $id;

        /**
         * @todo use a different column to store the commenting user id
         */
        $model = Comment::find_by_id($id);

        if(!$model) {
            $app->halt(404);
        }

        foreach($app->request->params() as $key=>$value) {
            $model->$key = $value;
        }
        $object = json_decode($model->to_json());
        unset($object->user);

        # validate
        $validator = new Validator();
        $validation_response = $validator->validate(
            $object,
            APPLICATION_PATH . "configs/validation_schemas/comment.json");

        if (is_array($validation_response)) {
            $app->response->setStatus(400);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody(json_encode($validation_response));
        } else {

            $model->save();
            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody($model->to_json());
        }

    });

    # get
    $app->get('/external-content-source/:service_name', function ($service_name) use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];
        $db = $app->container->get('db');

        $flickr_user = $db->fetchOne(
            $configs['sql']['account_flickr']['get_by_user_id'],[
                'user_id' => $securityContext->id]);

        $flickrData = new FlickrData(
            $configs['service']['flickr']['key'],
            $configs['service']['flickr']['secret'],
            "http://".$configs['server']['hostname'] . "/service/flickr/redirect"
        );

        $flickrData->setAccessToken(
            $flickr_user['access_token'],
            $flickr_user['access_token_secret']
        );

        $data = json_decode(
            $flickrData->getRecent($flickr_user['flickr_user_id']));

        $app->response->setStatus(200);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setBody(json_encode($data->photos->photo));

    });


    # get project
    $app->get('/project/:id', function ($id) use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];
        $id = (int) $id;

        $model = Project::find_by_id_and_user_id(
            $id, $securityContext->id);

        if(!$model) {
            $app->halt(404);
        } else {
            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody($model->to_json());
        }

    });

    # create project
    $app->post('/project', function () use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];

        $model = new Project($app->request->params());
        $model->user_id = $securityContext->id;

        # validate
        $validator = new Validator();
        $validation_response = $validator->validate(
            json_decode($model->to_json()),
            APPLICATION_PATH . "configs/validation_schemas/project.json");

        if (is_array($validation_response)) {
            $app->response->setStatus(400);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody(json_encode($validation_response));
        } else {

            $model->save();
            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody($model->to_json());
        }

    });


    # update project
    $app->put('/project/:id', function ($id) use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];
        $id = (int) $id;

        $model = Project::find_by_id_and_user_id(
            $id, $securityContext->id);

        if(!$model) {
            $app->halt(404);
        }

        foreach($app->request->params() as $key=>$value) {
            $model->$key = $value;
        }

        # validate
        $validator = new Validator();
        $validation_response = $validator->validate(
            json_decode($model->to_json()),
            APPLICATION_PATH . "configs/validation_schemas/project.json");

        if (is_array($validation_response)) {
            $app->response->setStatus(400);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody(json_encode($validation_response));
        } else {
            $model->save();
            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody($model->to_json());
        }

    });

    # get projects
    $app->get('/projects', function () use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];

        $projects = Project::find_all_by_user_id($securityContext->id, [
            'order' => 'sort_order']);

        $_projects = [];
        foreach ($projects as $i=>$project) {
            $_projects[] = json_decode($project->to_json());
        }

        $app->response->setStatus(200);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setBody(json_encode($_projects));

    });

    # order characters
	$app->post('/projects_order', function () use ($app) {

		$configs = $app->container->get('configs');
		$securityContext = $_SESSION['securityContext'];

        $result = [];
        $result['items'] = [];
        foreach($app->request->params('items') as $sort_order => $item) {
            $model = Project::find_by_id_and_user_id(
                $item['id'], $securityContext->id);
            $model->sort_order = $sort_order;
            $model->save();
            $result['items'][] = json_decode($model->to_json());
        }

		$app->response->setStatus(200);
		$app->response->headers->set('Content-Type', 'application/json');
		$app->response->setBody(json_encode($result));
	});


    # add project user
    $app->post('/project_user', function () use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];
        $db = $app->container->get('db');
        $projectService = new Projects($db, $configs, $securityContext);

        # validate
        $validator = new Validator();
        $validation_response = $validator->validate(
            (object) $app->request->params(),
            APPLICATION_PATH . "configs/validation_schemas/project_user.json");

        if (is_array($validation_response)) {
            $app->response->setStatus(400);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody(json_encode($validation_response));
        } else {
            $user = $projectService->addProjectUser($app->request->params());

            $app->response->setStatus(201);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody(json_encode($user));
        }

    });

    # create character
    $app->post('/project_character', function () use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];

        $model = new ProjectCharacter($app->request->params());
        $model->user_id = $securityContext->id;

        # validate
        $validator = new Validator();
        $validation_response = $validator->validate(
            json_decode($model->to_json()),
            APPLICATION_PATH . "configs/validation_schemas/project_character.json");

        if (is_array($validation_response)) {
            $app->response->setStatus(400);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody(json_encode($validation_response));
        } else {

            $model->save();
            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody($model->to_json());
        }

    });

    # update character
    $app->put('/project_character/:id', function ($id) use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];
        $id = (int) $id;

        $model = ProjectCharacter::find_by_id_and_user_id(
            $id, $securityContext->id);

        if(!$model) {
            $app->halt(404);
        }

        foreach($app->request->params() as $key=>$value) {
            $model->$key = $value;
        }

        # validate
        $validator = new Validator();
        $validation_response = $validator->validate(
            json_decode($model->to_json()),
            APPLICATION_PATH . "configs/validation_schemas/project_character.json");

        if (is_array($validation_response)) {
            $app->response->setStatus(400);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody(json_encode($validation_response));
        } else {
            $model->save();
            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody($model->to_json());
        }

    });

    # order characters
	$app->post('/project_character_order', function () use ($app) {

		$configs = $app->container->get('configs');
		$securityContext = $_SESSION['securityContext'];

        $result = [];
        $result['items'] = [];
        foreach($app->request->params('items') as $sort_order => $item) {
            $model = ProjectCharacter::find_by_id_and_user_id(
                $item['id'], $securityContext->id);
            $model->sort_order = $sort_order;
            $model->save();
            $result['items'][] = json_decode($model->to_json());
        }

		$app->response->setStatus(200);
		$app->response->headers->set('Content-Type', 'application/json');
		$app->response->setBody(json_encode($result));
	});


    # create character revision
    $app->post('/project_character_revision', function () use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];

        $model = new ProjectCharacterRevision($app->request->params());
        $model->user_id = $securityContext->id;

        # validate
        $validator = new Validator();
        $validation_response = $validator->validate(
            json_decode($model->to_json()),
            APPLICATION_PATH . "configs/validation_schemas/project_character_revision.json");

        if (is_array($validation_response)) {
            $app->response->setStatus(400);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody(json_encode($validation_response));
        } else {

            $model->save();
            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody($model->to_json());
        }

    });


    # update character revision
    $app->put('/project_character_revision/:id', function ($id) use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];
        $id = (int) $id;

        $model = ProjectCharacterRevision::find_by_id_and_user_id(
            $id, $securityContext->id);

        if(!$model) {
            $app->halt(404);
        }

        foreach($app->request->params() as $key=>$value) {
            $model->$key = $value;
        }

        # validate
        $validator = new Validator();
        $validation_response = $validator->validate(
            json_decode($model->to_json()),
            APPLICATION_PATH . "configs/validation_schemas/project_character_revision.json");

        if (is_array($validation_response)) {
            $app->response->setStatus(400);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody(json_encode($validation_response));
        } else {
            $model->save();
            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody($model->to_json());
        }

    });

    # order project character revision revision
    $app->post('/project_character_revision_order', function () use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];

        $result = [];
        $result['items'] = [];
        foreach($app->request->params('items') as $sort_order => $item) {
            $model = ProjectCharacterRevision::find_by_id_and_user_id(
                $item['id'], $securityContext->id);
            $model->sort_order = $sort_order;
            $model->save();
            $result['items'][] = json_decode($model->to_json());
        }

        $app->response->setStatus(200);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setBody(json_encode($result));

    });


    # create concept_art
    $app->post('/project_concept_art', function () use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];

        $model = new ProjectConceptArt($app->request->params());
        $model->user_id = $securityContext->id;

        # validate
        $validator = new Validator();
        $validation_response = $validator->validate(
            json_decode($model->to_json()),
            APPLICATION_PATH . "configs/validation_schemas/project_concept_art.json");

        if (is_array($validation_response)) {
            $app->response->setStatus(400);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody(json_encode($validation_response));
        } else {

            $model->save();
            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody($model->to_json());
        }

    });

    # update concept art
    $app->put('/project_concept_art/:id', function ($id) use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];
        $id = (int) $id;

        $model = ProjectConceptArt::find_by_id_and_user_id(
            $id, $securityContext->id);

        if(!$model) {
            $app->halt(404);
        }

        foreach($app->request->params() as $key=>$value) {
            $model->$key = $value;
        }

        # validate
        $validator = new Validator();
        $validation_response = $validator->validate(
            json_decode($model->to_json()),
            APPLICATION_PATH . "configs/validation_schemas/project_concept_art.json");

        if (is_array($validation_response)) {
            $app->response->setStatus(400);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody(json_encode($validation_response));
        } else {
            $model->save();
            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody($model->to_json());
        }

    });


    # order concept art
    $app->post('/project_concept_art_order', function () use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];

        $result = [];
        $result['items'] = [];
        foreach($app->request->params('items') as $sort_order => $item) {
            $model = ProjectConceptArt::find_by_id_and_user_id(
                $item['id'], $securityContext->id);
            $model->sort_order = $sort_order;
            $model->save();
            $result['items'][] = json_decode($model->to_json());
        }

        $app->response->setStatus(200);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setBody(json_encode($result));

    });


    # create concept art revision
    $app->post('/project_concept_art_revision', function () use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];

        $model = new ProjectConceptArtRevision($app->request->params());
        $model->user_id = $securityContext->id;

        # validate
        $validator = new Validator();
        $validation_response = $validator->validate(
            json_decode($model->to_json()),
            APPLICATION_PATH . "configs/validation_schemas/project_concept_art_revision.json");

        if (is_array($validation_response)) {
            $app->response->setStatus(400);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody(json_encode($validation_response));
        } else {

            $model->save();
            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody($model->to_json());
        }

    });


    # update concept art revision
    $app->put('/project_concept_art_revision/:id', function ($id) use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];
        $id = (int) $id;

        $model = ProjectConceptArtRevision::find_by_id_and_user_id(
            $id, $securityContext->id);

        if(!$model) {
            $app->halt(404);
        }

        foreach($app->request->params() as $key=>$value) {
            $model->$key = $value;
        }

        # validate
        $validator = new Validator();
        $validation_response = $validator->validate(
            json_decode($model->to_json()),
            APPLICATION_PATH . "configs/validation_schemas/project_concept_art_revision.json");

        if (is_array($validation_response)) {
            $app->response->setStatus(400);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody(json_encode($validation_response));
        } else {
            $model->save();
            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody($model->to_json());
        }

    });


    # order project concept_art revisions
    $app->post('/project_concept_art_revision_order', function () use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];

        $result = [];
        $result['items'] = [];
        foreach($app->request->params('items') as $sort_order => $item) {
            $model = ProjectConceptArtRevision::find_by_id_and_user_id(
                $item['id'], $securityContext->id);
            $model->sort_order = $sort_order;
            $model->save();
            $result['items'][] = json_decode($model->to_json());
        }

        $app->response->setStatus(200);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setBody(json_encode($result));

    });


    # create location
    $app->post('/project_location', function () use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];

        $model = new ProjectLocation($app->request->params());
        $model->user_id = $securityContext->id;

        # validate
        $validator = new Validator();
        $validation_response = $validator->validate(
            json_decode($model->to_json()),
            APPLICATION_PATH . "configs/validation_schemas/project_location.json");

        if (is_array($validation_response)) {
            $app->response->setStatus(400);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody(json_encode($validation_response));
        } else {

            $model->save();
            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody($model->to_json());
        }

    });


    # update location
    $app->put('/project_location/:id', function ($id) use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];
        $id = (int) $id;

        $model = ProjectLocation::find_by_id_and_user_id(
            $id, $securityContext->id);

        if(!$model) {
            $app->halt(404);
        }

        foreach($app->request->params() as $key=>$value) {
            $model->$key = $value;
        }

        # validate
        $validator = new Validator();
        $validation_response = $validator->validate(
            json_decode($model->to_json()),
            APPLICATION_PATH . "configs/validation_schemas/project_location.json");

        if (is_array($validation_response)) {
            $app->response->setStatus(400);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody(json_encode($validation_response));
        } else {
            $model->save();
            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody($model->to_json());
        }

    });

    # order location
    $app->post('/project_location_order', function () use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];

        $result = [];
        $result['items'] = [];
        foreach($app->request->params('items') as $sort_order => $item) {
            $model = ProjectLocation::find_by_id_and_user_id(
                $item['id'], $securityContext->id);
            $model->sort_order = $sort_order;
            $model->save();
            $result['items'][] = json_decode($model->to_json());
        }

        $app->response->setStatus(200);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setBody(json_encode($result));
    });

    # create reference image
    $app->post('/project_reference_image', function () use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];

        $model = new ProjectReferenceImage($app->request->params());
        $model->user_id = $securityContext->id;

        # validate
        $validator = new Validator();
        $validation_response = $validator->validate(
            json_decode($model->to_json()),
            APPLICATION_PATH . "configs/validation_schemas/project_reference_image.json");

        if (is_array($validation_response)) {
            $app->response->setStatus(400);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody(json_encode($validation_response));
        } else {

            $model->save();
            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody($model->to_json());
        }

    });

    # update reference image
    $app->put('/project_reference_image/:id', function ($id) use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];
        $id = (int) $id;

        $model = ProjectReferenceImage::find_by_id_and_user_id(
            $id, $securityContext->id);

        if(!$model) {
            $app->halt(404);
        }

        foreach($app->request->params() as $key=>$value) {
            $model->$key = $value;
        }

        # validate
        $validator = new Validator();
        $validation_response = $validator->validate(
            json_decode($model->to_json()),
            APPLICATION_PATH . "configs/validation_schemas/project_reference_image.json");

        if (is_array($validation_response)) {
            $app->response->setStatus(400);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody(json_encode($validation_response));
        } else {
            $model->save();
            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody($model->to_json());
        }

    });

    # order reference image
    $app->post('/project_reference_image_order', function () use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];

        $result = [];
        $result['items'] = [];
        foreach($app->request->params('items') as $sort_order => $item) {
            $model = ProjectReferenceImage::find_by_id_and_user_id(
                $item['id'], $securityContext->id);
            $model->sort_order = $sort_order;
            $model->save();
            $result['items'][] = json_decode($model->to_json());
        }

        $app->response->setStatus(200);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setBody(json_encode($result));

    });

    # create storyboard
    $app->post('/project_storyboard', function () use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];

        $model = new ProjectStoryboard($app->request->params());
        $model->user_id = $securityContext->id;

        # validate
        $validator = new Validator();
        $validation_response = $validator->validate(
            json_decode($model->to_json()),
            APPLICATION_PATH . "configs/validation_schemas/project_storyboard.json");

        if (is_array($validation_response)) {
            $app->response->setStatus(400);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody(json_encode($validation_response));
        } else {

            $model->save();
            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody($model->to_json());
        }

    });

    # update storyboard
    $app->put('/project_storyboard/:id', function ($id) use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];
        $id = (int) $id;

        $model = ProjectStoryboard::find_by_id_and_user_id(
            $id, $securityContext->id);

        if(!$model) {
            $app->halt(404);
        }

        foreach($app->request->params() as $key=>$value) {
            $model->$key = $value;
        }

        # validate
        $validator = new Validator();
        $validation_response = $validator->validate(
            json_decode($model->to_json()),
            APPLICATION_PATH . "configs/validation_schemas/project_storyboard.json");

        if (is_array($validation_response)) {
            $app->response->setStatus(400);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody(json_encode($validation_response));
        } else {
            $model->save();
            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody($model->to_json());
        }

    });


	# order project storyboards
	$app->post('/project_storyboard_order', function () use ($app) {

        $configs = $app->container->get('configs');
		$securityContext = $_SESSION['securityContext'];

        $result = [];
        $result['items'] = [];
        foreach($app->request->params('items') as $sort_order => $item) {
            $model = ProjectStoryboard::find_by_id_and_user_id(
                $item['id'], $securityContext->id);
            $model->sort_order = $sort_order;
            $model->save();
            $result['items'][] = json_decode($model->to_json());
        }

		$app->response->setStatus(200);
		$app->response->headers->set('Content-Type', 'application/json');
		$app->response->setBody(json_encode($result));

	});

    # create storyboard panel
    $app->post('/project_storyboard_panel', function () use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];

        $model = new ProjectStoryboardPanel($app->request->params());
        $model->user_id = $securityContext->id;

        # validate
        $validator = new Validator();
        $validation_response = $validator->validate(
            json_decode($model->to_json()),
            APPLICATION_PATH . "configs/validation_schemas/project_storyboard_panel.json");

        if (is_array($validation_response)) {
            $app->response->setStatus(400);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody(json_encode($validation_response));
        } else {

            $model->save();
            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody($model->to_json());
        }

    });

    # update storyboard panel
    $app->put('/project_storyboard_panel/:id', function ($id) use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];
        $id = (int) $id;

        $model = ProjectStoryboardPanel::find_by_id_and_user_id(
            $id, $securityContext->id);

        if(!$model) {
            $app->halt(404);
        }

        foreach($app->request->params() as $key=>$value) {
            $model->$key = $value;
        }

        # validate
        $validator = new Validator();
        $validation_response = $validator->validate(
            json_decode($model->to_json()),
            APPLICATION_PATH . "configs/validation_schemas/project_storyboard_panel.json");

        if (is_array($validation_response)) {
            $app->response->setStatus(400);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody(json_encode($validation_response));
        } else {
            $model->save();
            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody($model->to_json());
        }

    });


	# order project storyboard panels
	$app->post('/project_storyboard_panel_order', function () use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];

        $result = [];
        $result['items'] = [];
        foreach($app->request->params('items') as $sort_order => $item) {
            $model = ProjectStoryboardPanel::find_by_id_and_user_id(
                $item['id'], $securityContext->id);
            $model->sort_order = $sort_order;
            $model->save();
            $result['items'][] = json_decode($model->to_json());
        }

        $app->response->setStatus(200);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setBody(json_encode($result));
	});


	# create storyboard panel revision
    $app->post('/project_storyboard_panel_revision', function () use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];

        $model = new ProjectStoryboardPanelRevision($app->request->params());
        $model->user_id = $securityContext->id;

        # validate
        $validator = new Validator();
        $validation_response = $validator->validate(
            json_decode($model->to_json()),
            APPLICATION_PATH . "configs/validation_schemas/project_storyboard_panel_revision.json");

        if (is_array($validation_response)) {
            $app->response->setStatus(400);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody(json_encode($validation_response));
        } else {

            $model->save();
            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody($model->to_json());
        }

    });

    # update storyboard panel revision
    $app->put('/project_storyboard_panel_revision/:id', function ($id) use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];
        $id = (int) $id;

        $model = ProjectStoryboardPanelRevision::find_by_id_and_user_id(
            $id, $securityContext->id);

        if(!$model) {
            $app->halt(404);
        }

        foreach($app->request->params() as $key=>$value) {
            $model->$key = $value;
        }

        # validate
        $validator = new Validator();
        $validation_response = $validator->validate(
            json_decode($model->to_json()),
            APPLICATION_PATH . "configs/validation_schemas/project_storyboard_panel_revision.json");

        if (is_array($validation_response)) {
            $app->response->setStatus(400);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody(json_encode($validation_response));
        } else {
            $model->save();
            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody($model->to_json());
        }

    });

    # order project storyboard panel revisions
    $app->post('/project_storyboard_panel_revision_order', function () use ($app) {

        $configs = $app->container->get('configs');
        $securityContext = $_SESSION['securityContext'];

        $result = [];
        $result['items'] = [];
        foreach($app->request->params('items') as $sort_order => $item) {
            $model = ProjectStoryboardPanelRevision::find_by_id_and_user_id(
                $item['id'], $securityContext->id);
            $model->sort_order = $sort_order;
            $model->save();
            $result['items'][] = json_decode($model->to_json());
        }

        $app->response->setStatus(200);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setBody(json_encode($result));
    });
    
});
