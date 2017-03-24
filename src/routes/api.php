<?php
$app->post("/api/0.1/login", function ($request, $response){

    $params = $request->getParsedBody();
    $user = Users::find_by_username_and_password(
        $params['username'],
        md5($params['password'])
    );

    if (!$user) {
        return $response->withStatus(404);
    }

    $model = json_decode(
        $user->to_json([
            'except'=>[
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
