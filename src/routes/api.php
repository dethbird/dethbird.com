<?php
$app->post("/api/0.1/login", function ($request, $response){

    $params = $request->getParsedBody();

    $user = User::first(
        [
            'conditions' => [
                'UPPER(username) = ? AND password = ?',
                strtoupper($params['username']),
                md5($params['password'])
            ]
        ]
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
        $headers = $request->getHeaders();

        $models = [];
        $models = Character::find_all_by_created_by(isset($headers['HTTP_X_DEMO_REQUEST']) ? 1 : $_SESSION['securityContext']->id);
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

    # stories
    $this->get('/stories', function($request, $response, $args){
        $models = [];
        $models = Story::find_all_by_created_by($_SESSION['securityContext']->id);
        $_arr = [];
        foreach ($models as $model) {
            $_arr[] = $model->to_array();
        }
        return $response
            ->withJson($_arr);
    })
    ->add( new ReadAccess($_SESSION['securityContext']) );

    $this->post('/story', function($request, $response, $args){
        $params = $request->getParsedBody();
        $params['created_by'] = $_SESSION['securityContext']->id;
        $model = new Story($params);
        $model->save();

        return $response
            ->withJson($model->to_array());
    })
    ->add( new WriteAccess($_SESSION['securityContext']) )
    ->add( new RequestBodyValidation(
        APPLICATION_PATH . 'configs/validation_schema/story-post.json') );

    $this->group('/story', function(){
        $this->get('/{id}', function($request, $response, $args){
            $headers = $request->getHeaders();
            $model = Story::find_by_id(isset($headers['HTTP_X_DEMO_REQUEST']) ? 1 : $args['id']);

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
            $model = Story::find_by_id($args['id']);

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
            APPLICATION_PATH . 'configs/validation_schema/story-put.json') );

    });

    $this->group('/homepage', function(){
        $this->get('/news', function($request, $response, $args){

            $cacheManager = new CacheManager();

            $items = $cacheManager->retrieve(
                $this->configs['cache']['homepage']['news']
            );

            if (!$items) {

                $userPocket = UserPocket::find_by_user_id($this->configs['application']['user_id']);
                $pocketData = new PocketData(
                    $this->configs['service']['pocket']['key'],
                    $userPocket->access_token
                );
                $mercuryPostlightData = new MercuryPostlightData(
                    $this->configs['service']['mercury_postlight']['key']
                );
                $data = $pocketData->getArticlesByTag('storystation');
                $dataObj = json_decode($data);
                $items = [];
                foreach($dataObj->list as $item) {
                    $scraped = $mercuryPostlightData->getArticle($item->given_url);
                    if(is_null($scraped->date_published)) {
                        $scraped->date_published = date('Y-m-d', $item->time_added);
                    }
                    $items[] = $scraped;
                }
                $items = json_encode($items);
                $cacheManager->store (
                    $this->configs['cache']['homepage']['news'],
                    $items
                );
            }

            return $response->withJson(json_decode($items));
        });
    });
});
