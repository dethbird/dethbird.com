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

    # changelog
    $this->get('/changelog', function($request, $response, $args){
        $headers = $request->getHeaders();

        # characters
        $models = [];
        $models = CharacterChangelog::find_all_by_created_by($_SESSION['securityContext']->id, ['limit' => 20, 'order' =>'date_updated desc']);
        $characters = [];
        foreach ($models as $model) {
            $characters[] = array_merge($model->to_array(), ['model' => 'character']);

        }

        # projects
        $models = [];
        $models = ProjectChangelog::find_all_by_created_by($_SESSION['securityContext']->id, ['limit' => 20, 'order' =>'date_updated desc']);
        $projects = [];
        foreach ($models as $model) {
            $projects[] = array_merge($model->to_array(), ['model' => 'project']);

        }

        # stories
        $models = [];
        $models = StoryChangelog::find_all_by_created_by($_SESSION['securityContext']->id, ['limit' => 20, 'order' =>'date_updated desc']);
        $stories = [];
        foreach ($models as $model) {
            $stories[] = array_merge($model->to_array(), ['model' => 'story']);

        }

        $items = array_merge(
            $characters,
            $stories,
            $projects
        );

        $sorted = usort($items, function($a, $b){
            return strtotime($a['date_updated']) < strtotime($b['date_updated']);
        });

        return $response
            ->withJson($items);
    })
    ->add( new ReadAccess($_SESSION['securityContext']) );

    # projects
    $this->get('/projects', function($request, $response, $args){
        $headers = $request->getHeaders();

        $models = [];
        $models = Project::find_all_by_created_by(isset($headers['HTTP_X_DEMO_REQUEST']) ? 1 : $_SESSION['securityContext']->id);
        $_arr = [];
        foreach ($models as $model) {
            $_arr[] = $model->to_array();
        }
        return $response
            ->withJson($_arr);
    })
    ->add( new ReadAccess($_SESSION['securityContext']) );

    $this->post('/project', function($request, $response, $args){
        $params = $request->getParsedBody();
        $params['created_by'] = $_SESSION['securityContext']->id;
        $model = new Project($params);
        $model->save();

        return $response
            ->withJson($model->to_array());
    })
    ->add( new WriteAccess($_SESSION['securityContext']) )
    ->add( new RequestBodyValidation(
        APPLICATION_PATH . 'configs/validation_schema/project-post.json') );

    $this->group('/project', function(){
        $this->get('/{id}', function($request, $response, $args){
            $model = Project::find_by_id($args['id']);
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
            $model = Project::find_by_id($args['id']);

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
            APPLICATION_PATH . 'configs/validation_schema/project-put.json') );

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
            $model = Story::find_by_id(isset($headers['HTTP_X_DEMO_REQUEST']) ? 4 : $args['id']);

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
            $userPocket = UserPocket::find_by_user_id($this->configs['application']['user_id']);
            $pocketData = new PocketData(
                $this->configs['service']['pocket']['key'],
                $userPocket->access_token
            );
            $mercuryPostlightData = new MercuryPostlightData(
                $this->configs['service']['mercury_postlight']['key']
            );
            $items = [];

            // check request cache from pocket
            $articlesJson = $cacheManager->retrieve(
                $this->configs['cache']['pocket']['articles']
            );
            if (!$articlesJson) {
                $articlesJson = $pocketData->getArticlesByTag('storystation');
                $cacheManager->store (
                    $this->configs['cache']['pocket']['articles'],
                    $articlesJson
                );
            }
            $articles = json_decode($articlesJson);

            // check each individual article cache
            foreach ($articles->list as $article) {
                $articleCacheFilename = str_replace("CACHE_KEY", $article->item_id, $this->configs['cache']['mercury_postlight']['article']);
                $articleJson = $cacheManager->retrieve(
                    $articleCacheFilename,
                    null
                );
                if (!$articleJson) {
                    $scraped = $mercuryPostlightData->getArticle($article->given_url);

                    if($scraped) {
                        if(is_null($scraped->date_published)) {
                            $scraped->date_published = date('Y-m-d', $article->time_added);
                        }
                        $articleJson = json_encode($scraped);
                        $cacheManager->store (
                            $articleCacheFilename,
                            $articleJson
                        );
                    }
                }
                if($articleJson){
                    $items []= json_decode($articleJson);
                }
            }

            $sorted = usort($items, function($a, $b){
                return strtotime($a->date_published) < strtotime($b->date_published);
            });

            return $response->withJson($items);
        });
    });
});
