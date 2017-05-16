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

    if (!$user->date_verified) {
        return $response
            ->withStatus(404)
            ->withJson([ "global" => [ "message" => "Email address " . $user->email . " not verified" ] ]);
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

        $filters = $request->getQueryParams();
        $filters['created_by'] = isset($headers['HTTP_X_DEMO_REQUEST']) ? 1 : $_SESSION['securityContext']->id;
        $models = Character::find_all_filtered($filters);

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

    # contact
    $this->post('/contact', function($request, $response, $args){
        $params = $request->getParsedBody();

        $message = new ContactMessage();
        $message->email = $params['email'];
        $message->name = $params['name'];
        $message->organization = $params['organization'];
        $message->message = $params['message'];
        $message->client_ip = $_SERVER['REMOTE_ADDR'];
        $message->save();

        # send the email
        $templateVars = [
            "message" => $message->to_array(),
            "server" => $_SERVER
        ];

        $mail = new PHPMailer;
        $mail->setFrom('info@storystation.io', 'StoryStation');
        $mail->addAddress('rishi.satsangi@gmail.com');
        $mail->isHTML(true);
        $mail->Subject = 'StoryStation: Contact Form';
        $mailBody    = $this['view']->render(
            $response,
            'email/contact-message.html.twig',
            $templateVars
        );
        $mail->Body = implode("\n", array_slice(explode("\n", $mailBody), 3));;
        $mail->send();

        return $response
            ->withJson($params);
    })
    ->add( new RequestBodyValidation(
        APPLICATION_PATH . 'configs/validation_schema/contact-post.json') );

    # genres
    $this->get('/genres', function($request, $response, $args){
        $headers = $request->getHeaders();

        # genres
        $models = [];
        $models = Genre::all(['order' =>'name asc']);
        foreach ($models as $model) {

            #subgenres
            $g = $model->to_array();
            $g['subgenres'] = array();
            $smodels = Subgenre::find('all', ['conditions' => ['genre_id = ?', $model->id], 'order'=>'name asc']);
            foreach($smodels as $smodel) {
                $g['subgenres'][] = $smodel->to_array();
            }
            $genres[] = $g;
        }

        return $response
            ->withJson($genres);
    })
    ->add( new ReadAccess($_SESSION['securityContext']) );

    # private beta application
    $this->post('/privatebeta', function($request, $response, $args){
        $params = $request->getParsedBody();
        $params['created_by'] = $_SESSION['securityContext']->id;
        $captcha = $params['captcha'];
        unset($params['captcha']);

        $user = User::find('one', array('conditions' => array('UPPER(username) = ?', strtoupper($params['username']))));
        if ($user) {
            return $response
                ->withStatus(409)
                ->withJson(['global' => ['message'=>'Username already exists']]);
        }
        $user = User::find('one', array('conditions' => array('UPPER(email) = ?', strtoupper($params['email']))));
        if ($user) {
            return $response
                ->withStatus(409)
                ->withJson(['global' => ['message'=>'Email already exists']]);
        }
        # captcha
        $httpClient = new GuzzleHttp\Client();
        $captchaResponse = $httpClient->request(
            'POST',
            'https://www.google.com/recaptcha/api/siteverify',
            [
                'query' => [
                    'secret' => $this->configs['service']['recaptcha']['secret'],
                    'response' => $captcha,
                    'remoteip' => $_SERVER['REMOTE_ADDR']
                ]
            ]
        );
        $body = json_decode($captchaResponse->getBody()->getContents());
        if (!$body->success) {
            return $response
                ->withStatus(409)
                ->withJson(['global' => ['message'=>'Please verify you are not a robot.']]);
        }

        # create the user
        $user = new User();
        $user->email = $params['email'];
        $user->username = $params['username'];
        $user->name = isset($params['name']) ? $params['name'] : null;
        $user->password = md5(uniqid(null, true));
        $user->api_key = Ramsey\Uuid\Uuid::uuid4()->toString();
        $user->read = true;
        $user->write = true;
        $user->verify_token = Ramsey\Uuid\Uuid::uuid4()->toString();
        $user->save();

        $beta = new UserBetaAccess();
        $beta->user_id = $user->id;
        $beta->field_advertising = isset($params['field_advertising']) ? $params['field_advertising'] : 0;
        $beta->field_animation = isset($params['field_animation']) ? $params['field_animation'] : 0;
        $beta->field_other = isset($params['field_other']) ? $params['field_other'] : null;
        $beta->field_screenwriting = isset($params['field_screenwriting']) ? $params['field_screenwriting'] : 0;
        $beta->field_video_games = isset($params['field_video_games']) ? $params['field_video_games'] : 0;
        $beta->intent = isset($params['intent']) ? $params['intent'] : null;
        $beta->portfolio = isset($params['portfolio']) ? $params['portfolio'] : null;
        $beta->comments = isset($params['comments']) ? $params['comments'] : null;
        $beta->client_ip = $_SERVER['REMOTE_ADDR'];
        $beta->save();

        # send the email
        $templateVars = [
            "user" => $user,
            "server" => $_SERVER
        ];

        $mail = new PHPMailer;
        $mail->setFrom('info@storystation.io', 'StoryStation');
        $mail->addAddress($user->email);
        $mail->isHTML(true);
        $mail->Subject = 'StoryStation: Verify Email';
        $mailBody    = $this['view']->render(
            $response,
            'email/private-beta-apply-response.html.twig',
            $templateVars
        );
        $mail->Body = implode("\n", array_slice(explode("\n", $mailBody), 3));;
        $mail->send();

        return $response
            ->withJson($user->to_array());
    })
    ->add( new RequestBodyValidation(
        APPLICATION_PATH . 'configs/validation_schema/private-beta-post.json') );


    # projects
    $this->get('/projects', function($request, $response, $args){
        $headers = $request->getHeaders();

        $filters = $request->getQueryParams();
        $filters['created_by'] = isset($headers['HTTP_X_DEMO_REQUEST']) ? 1 : $_SESSION['securityContext']->id;

        $models = Project::find_all_filtered($filters);
        $_models = [];
        foreach ($models as $model) {
            $_models[] = $model->to_hydrated_array();
        }
        return $response
            ->withJson($_models);
    })
    ->add( new ReadAccess($_SESSION['securityContext']) );

    $this->post('/project', function($request, $response, $args){
        $params = $request->getParsedBody();
        $params['created_by'] = $_SESSION['securityContext']->id;
        $attributes = $params;
        unset($attributes['subgenres']);
        $model = new Project($attributes);
        $model->save();

        # delete then add subgenres
        if (isset($params['subgenres'])) {
            foreach ($params['subgenres'] as $k => $subgenre) {
                $ps = new ProjectSubgenre();
                $ps->project_id = $model->id;
                $ps->subgenre_id = $subgenre['id'];
                $ps->save();
            }
        }

        return $response
            ->withJson($model->to_hydrated_array());
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
                ->withJson($model->to_hydrated_array());
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

            $attributes = $params;
            unset($attributes['subgenres']);
            $model->update_attributes($attributes);

            # delete then add subgenres
            if (isset($params['subgenres'])) {
                ProjectSubgenre::table()->delete(['project_id' => $model->id]);
                foreach ($params['subgenres'] as $k => $subgenre) {
                    $ps = new ProjectSubgenre();
                    $ps->project_id = $model->id;
                    $ps->subgenre_id = $subgenre['id'];
                    $ps->save();
                }
            }

            return $response
                ->withJson($model->to_hydrated_array());
        })
        ->add( new WriteAccess($_SESSION['securityContext']) )
        ->add( new RequestBodyValidation(
            APPLICATION_PATH . 'configs/validation_schema/project-put.json') );

    });


    # stories
    $this->get('/stories', function($request, $response, $args){
        $models = [];

        $filters = $request->getQueryParams();
        $filters['created_by'] = isset($headers['HTTP_X_DEMO_REQUEST']) ? 1 : $_SESSION['securityContext']->id;
        $models = Story::find_all_filtered($filters);

        $_models = [];
        foreach ($models as $model) {
            $_models[] = $model->to_array();
        }
        return $response
            ->withJson($_models);
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

    # users
    $this->get('/users', function($request, $response, $args){
        $headers = $request->getHeaders();

        $filters = $request->getQueryParams();

        $models = User::find_all_filtered($filters);
        $_models = [];
        foreach ($models as $model) {
            $_models[] = $model->to_array();
        }
        return $response
            ->withJson($_models);
    })
    ->add( new ReadAccess($_SESSION['securityContext']) );

    $this->post('/user', function($request, $response, $args){
        $params = $request->getParsedBody();
        $params['created_by'] = $_SESSION['securityContext']->id;
        $attributes = $params;
        $model = new Project($attributes);
        $model->save();

        return $response
            ->withJson($model->to_array());
    })
    ->add( new WriteAccess($_SESSION['securityContext']) )
    ->add( new RequestBodyValidation(
        APPLICATION_PATH . 'configs/validation_schema/user-post.json') );

    $this->group('/user', function(){
        $this->get('/{id}', function($request, $response, $args){
            $model = User::find_by_id($args['id']);
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
            $model = User::find_by_id($args['id']);

            if (!$model) {
                return $response
                    ->withStatus(404)
                    ->withJson(["global" => ["message" => "Not found"]]);
            }

            if ($_SESSION['securityContext']->admin_user!==1) {
                if ($model->created_by != $_SESSION['securityContext']->id) {
                    return $response
                        ->withStatus(403)
                        ->withJson(["global" => ["message" => "Ownership check failed"]]);
                }
            }

            $attributes = $params;
            $model->update_attributes($attributes);

            return $response
                ->withJson($model->to_array());
        })
        ->add( new WriteAccess($_SESSION['securityContext']) )
        ->add( new RequestBodyValidation(
            APPLICATION_PATH . 'configs/validation_schema/user-put.json') );

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
