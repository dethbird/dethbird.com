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
        $userJson = $user->to_json([
            'except' => ['api_key', 'password', 'email']
        ]);
        $_SESSION['securityContext'] = json_decode($userJson);
        $app->response->setStatus(200);
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setBody($userJson);
    } else {
        $app->halt(400);
    }

});

$app->group('/api', $authorizeByHeaders($app), function () use ($app) {

    $app->group('/content', function () use ($app) {

        global $writeAccess;

        # get articles
        $app->get('/articles', function () use ($app) {
            $securityContext = $_SESSION['securityContext'];
            $article = [];
            if ($securityContext->application_user==0){
                $articles = ContentArticle::find_all_by_user_id($securityContext->id, ['order' => 'date_published desc']);
            } else if ($securityContext->application_user==1){
                $articles = ContentArticle::find('all', ['order' => 'date_published desc']);
            }
            $_response = [];
            foreach($articles as $article) {
                $_response[] = json_decode($article->to_json());
            }
            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody(json_encode($_response));
        });

        # delete article
        $app->delete('/article/:articleId', function ($articleId) use ($app) {
            $configs = $app->container->get('configs');
            $securityContext = $_SESSION['securityContext'];

            // fetch model if exists
            $model = ContentArticle::find_by_id($articleId);
            if (!$model) {
                $app->halt(404, json_encode(['article_id' => 'Article not found']));
            }
            $model->delete();

            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');

        });

        # get article
        $app->get('/article/:articleId', function ($articleId) use ($app) {
            $configs = $app->container->get('configs');
            $securityContext = $_SESSION['securityContext'];

            // fetch model if exists
            $model = ContentArticle::find_by_id($articleId);
            if (!$model) {
                $app->halt(404, json_encode(['article_id' => 'Article not found']));
            }

            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody($model->to_json());

        });

        # post article
        $app->post('/article', $writeAccess($app), function () use ($app) {
            $configs = $app->container->get('configs');
            $securityContext = $_SESSION['securityContext'];
            $payload = json_decode($app->request->getBody(), true);

            $client = new MercuryPostlightData($configs['service']['mercury_postlight']['key']);
            $article = $client->getArticle($payload['url']);
            if(isset($article->error)) {
                $app->halt(400, json_encode(['url' => 'Invalid url']));
            }

            // fetch model if exists
            $model = ContentArticle::find_by_url($article->url);
            if (!$model) {
                $model = new ContentArticle();
                $model->user_id = $securityContext->id;
            }
            $model->url = $article->url;
            $model->title = $client->cleanData($article->title);
            $model->author = $article->author;
            $model->lead_image_url = $article->lead_image_url;
            $model->date_published = $article->date_published;
            $model->excerpt = $article->excerpt;
            $model->content = $article->content;
            $model->word_count = $article->word_count;
            $model->domain = $article->domain;
            $model->save();

            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody($model->to_json());

        });

        # post article
        $app->post('/articles', $writeAccess($app), function () use ($app) {
            $configs = $app->container->get('configs');
            $securityContext = $_SESSION['securityContext'];
            $payload = json_decode($app->request->getBody(), true);

            $response = [];

            foreach ($payload as $url) {
                $client = new MercuryPostlightData($configs['service']['mercury_postlight']['key']);
                $article = $client->getArticle($url);
                if(isset($article->error)) {
                    $response[] = ['url' => 'Invalid url', 'item' => $url];

                } else if (!$article->date_published) {
                    $response[] = ['date_published' => 'No date published', 'item' => $url];
                } else {

                    // fetch model if exists
                    $model = ContentArticle::find_by_url($article->url);
                    if (!$model) {
                        $model = new ContentArticle();
                        $model->user_id = $securityContext->id;
                    }
                    $model->url = $article->url;
                    $model->title = $client->cleanData($article->title);
                    $model->author = $article->author;
                    $model->lead_image_url = $article->lead_image_url;
                    $model->date_published = $article->date_published;
                    $model->excerpt = $article->excerpt;
                    $model->content = $article->content;
                    $model->word_count = $article->word_count;
                    $model->domain = $article->domain;
                    $model->save();

                    $response[] = json_decode($model->to_json());
                }
            }

            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody(json_encode($response));


        });

        # put article
        $app->put('/article/:articleId', $writeAccess($app), function ($articleId) use ($app) {
            $configs = $app->container->get('configs');
            $securityContext = $_SESSION['securityContext'];
            $payload = json_decode($app->request->getBody(), true);

            // fetch model if exists
            $model = ContentArticle::find_by_id($articleId);
            if (!$model) {
                $app->halt(404, json_encode(['article_id' => 'Article not found']));
            }
            $model->notes = $payload['notes'];
            $model->save();

            if (sizeof($payload['tags'])>0){
                // delete existing article tags
                ContentArticleTag::table()->delete(['content_article_id' => $model->id]);

                // find or create tag
                while (list($key, $tag) = each($payload['tags'])) {
                    $tagModel = Tag::find('one', ['conditions' => ['UPPER(text) = UPPER(?) AND user_id = ?', trim($tag['text']), $securityContext->id]]);
                    if(!$tagModel){
                        $tagModel = new Tag([
                            "text" => trim($tag['text']),
                            "user_id" => $securityContext->id
                        ]);
                        $tagModel->save();
                    }
                    $contentArticleTag = new ContentArticleTag([
                        "content_article_id" => $model->id,
                        "tag_id" => $tagModel->id
                    ]);
                    $contentArticleTag->save();
                }

            }

            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody($model->to_json());

        });
    });

    $app->get('/externalimage', function () use ($app) {
        $imageUrl = $app->request->params('image');
        $model = ContentArticle::find_by_lead_image_url($imageUrl);
        if (!$model) {
            $app->halt(404, json_encode(['image' => 'Article not found']));
        }

        $year = date('Y', strtotime($model->date_published));
        $month = date('m', strtotime($model->date_published));
        $day = date('d', strtotime($model->date_published));

        $folder = APPLICATION_PATH . 'cache/image/content/article/' . $year . '/' . $month . '/' . $day;
        if(!file_exists($folder))
            mkdir($folder, 0755, true);

        $extension = strtolower(pathinfo($model->lead_image_url, PATHINFO_EXTENSION ));
        $localPath = $folder . '/' .$model->id . '.' . $extension;
        if (!file_exists($localPath)) {
            // download the image
            $resource = fopen($localPath, "w");
            $client =  new GuzzleHttp\Client();
            $client->request('GET', $model->lead_image_url, ['sink' => $resource]);
            chmod($localPath, 0755);
        }

        $app->response->setStatus(200);
        $app->response->headers->set('Content-Type',  mime_content_type($localPath));
        $app->response->setBody(file_get_contents($localPath));
    });
    $app->group('/tags', function () use ($app) {

        # get tags
        $app->get('/', function () use ($app) {
            $securityContext = $_SESSION['securityContext'];
            $tags = Tag::find_all_by_user_id($securityContext->id, ['order' => 'text asc']);
            $userTags = [];
            while (list($key, $tag) = each($tags)) {
                $userTags[] = json_decode($tag->to_json());
            }
            $app->response->setStatus(200);
            $app->response->headers->set('Content-Type', 'application/json');
            $app->response->setBody(json_encode($userTags));
        });

        $app->group('/bulk-add', function () use ($app) {
            global $writeAccess;

            # get tags
            $app->post('/content-articles', $writeAccess($app), function () use ($app) {

                $configs = $app->container->get('configs');
                $securityContext = $_SESSION['securityContext'];
                $payload = json_decode($app->request->getBody(), true);

                $tagModel = Tag::find('one', ['conditions' => ['UPPER(text) = UPPER(?) AND user_id = ?', trim($payload['tag']), $securityContext->id]]);

                if (!$tagModel) {
                    $tagModel = new Tag();
                    $tagModel->text = trim($payload['tag']);
                    $tagModel->user_id = $securityContext->id;
                    $tagModel->save();
                }

                foreach($payload['article_ids'] as $articleId) {
                    $article = ContentArticle::find_by_id((int) $articleId);
                    $contentArticleTag = ContentArticleTag::find_by_content_article_id_and_tag_id(
                        $article->id,
                        $tagModel->id
                    );
                    if (!$contentArticleTag) {
                        $contentArticleTag = new ContentArticleTag();
                        $contentArticleTag->content_article_id = $article->id;
                        $contentArticleTag->tag_id = $tagModel->id;
                        $contentArticleTag->save();
                    }
                }

                $app->response->setStatus(200);
                $app->response->headers->set('Content-Type', 'application/json');
                $app->response->setBody(json_encode(["status" => "ok"]));
            });
        });
    });
});
