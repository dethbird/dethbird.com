<?php
$app->post("/api/0.1/login", function ($request, $response){

    $params = $request->getParsedBody();
    $user = User::find_by_username_and_password(
        $params['username'],
        md5($params['password'])
    );

    if (!$user) {
        return $response->withStatus(404)->withJson([
            "global" => [
                "message" => "User not found"
            ]
        ]);
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
    });
});
