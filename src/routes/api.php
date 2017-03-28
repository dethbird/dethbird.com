<?php
$app->post("/api/0.1/login", function ($request, $response){

    $params = $request->getParsedBody();
    $user = User::find_by_username_and_password(
        $params['username'],
        md5($params['password'])
    );

    if (!$user) {
        return $response
            ->withStatus(404)
            ->withJson([ "global" => [ "message" => "User not found" ] ]);
    }

    $model = json_decode(
        $user->to_json([
            'except'=>[
                'api_key',
                'password',
                'notifications',
                'date_added',
                'date_updated']
    ]));

    $_SESSION['securityContext'] = $model;

    return $response
        ->withJson($model);
})
->add( new RequestBodyValidation(
    APPLICATION_PATH . 'configs/validation_schema/login-post.json') );

$app->group('/api/0.1', function(){

    # characters
    $this->get('/characters', function($request, $response, $args){
        $models = [];
        $models = Character::find_all_by_created_by($_SESSION['securityContext']->id);
        $_arr = [];
        foreach ($models as $model) {
            $_arr[] = $model->to_array();
        }
        return $response
            ->withJson($_arr);
    })
    ->add( new ReadAccess($_SESSION['securityContext']) );

    $this->post('/character', function($request, $response, $args){
        $params = $request->getParsedBody();
        $params['created_by'] = $_SESSION['securityContext']->id;
        $model = new Character($params);
        $model->save();

        return $response
            ->withJson($model->to_array());
    })
    ->add( new WriteAccess($_SESSION['securityContext']) )
    ->add( new RequestBodyValidation(
        APPLICATION_PATH . 'configs/validation_schema/character-post.json') );

    $this->group('/character', function(){
        $this->get('/{id}', function($request, $response, $args){
            $model = Character::find_by_id($args['id']);
            if (!$model) {
                return $response
                    ->withStatus(404)
                    ->withJson(["global" => ["message" => "Not found"]]);
            }
            return $response
                ->withJson($model->to_array());
        })
        ->add( new ReadAccess($_SESSION['securityContext']) );

        $this->put('/{id}', function($request, $response, $args){
            $params = $request->getParsedBody();
            $params['updated_by'] = $_SESSION['securityContext']->id;
            $model = Character::find_by_id($args['id']);

            if (!$model) {
                return $response
                    ->withStatus(404)
                    ->withJson(["global" => ["message" => "Not found"]]);
            }

            if ($_SESSION['securityContext']->application_user!==1) {
                if ($model->created_by != $_SESSION['securityContext']->id) {
                    return $response
                        ->withStatus(403)
                        ->withJson(["global" => ["message" => "Ownership check failed"]]);
                }
            }

            $model->update_attributes($params);

            return $response
                ->withJson($model->to_array());
        })
        ->add( new WriteAccess($_SESSION['securityContext']) )
        ->add( new RequestBodyValidation(
            APPLICATION_PATH . 'configs/validation_schema/character-put.json') );

    });

    # scripts
    $this->get('/scripts', function($request, $response, $args){
        $models = [];
        $models = Script::find_all_by_created_by($_SESSION['securityContext']->id);
        $_arr = [];
        foreach ($models as $model) {
            $_arr[] = $model->to_array();
        }
        return $response
            ->withJson($_arr);
    })
    ->add( new ReadAccess($_SESSION['securityContext']) );

    $this->post('/script', function($request, $response, $args){
        $params = $request->getParsedBody();
        $params['created_by'] = $_SESSION['securityContext']->id;
        $model = new Script($params);
        $model->save();

        return $response
            ->withJson($model->to_array());
    })
    ->add( new WriteAccess($_SESSION['securityContext']) )
    ->add( new RequestBodyValidation(
        APPLICATION_PATH . 'configs/validation_schema/script-post.json') );

    $this->group('/script', function(){
        $this->get('/{id}', function($request, $response, $args){
            $model = Script::find_by_id($args['id']);
            if (!$model) {
                return $response
                    ->withStatus(404)
                    ->withJson(["global" => ["message" => "Not found"]]);
            }
            return $response
                ->withJson($model->to_array());
        })
        ->add( new ReadAccess($_SESSION['securityContext']) );

        $this->put('/{id}', function($request, $response, $args){
            $params = $request->getParsedBody();
            $params['updated_by'] = $_SESSION['securityContext']->id;
            $model = Script::find_by_id($args['id']);

            if (!$model) {
                return $response
                    ->withStatus(404)
                    ->withJson(["global" => ["message" => "Not found"]]);
            }

            if ($_SESSION['securityContext']->application_user!==1) {
                if ($model->created_by != $_SESSION['securityContext']->id) {
                    return $response
                        ->withStatus(403)
                        ->withJson(["global" => ["message" => "Ownership check failed"]]);
                }
            }

            $model->update_attributes($params);

            return $response
                ->withJson($model->to_array());
        })
        ->add( new WriteAccess($_SESSION['securityContext']) )
        ->add( new RequestBodyValidation(
            APPLICATION_PATH . 'configs/validation_schema/script-put.json') );

    });
});
