<?php

# service
$app->group('/service', function(){

    $this->group('/pocket', function(){

        $this->get('/authorize', function($request, $response, $args){
            $pocketData = new PocketData(
                $this->configs['service']['pocket']['key']);
            $code = $pocketData->fetchRequestCode(
                "https://".$_SERVER['HTTP_HOST']."/service/pocket/redirect");
            $_SESSION['pocketCode'] = $code;
            return $response
                ->withStatus(302)
                ->withHeader('Location', $pocketData->getAuthorizeScreenUri(
                    $code,
                    "https://".$_SERVER['HTTP_HOST']."/service/pocket/redirect"
                ));
        });

        $this->get('/redirect', function($request, $response, $args){
            $pocketData = new PocketData(
                $this->configs['service']['pocket']['key']);

            return $response->withJson($pocketData->fetchAccessTokenData(
                $_SESSION['pocketCode']));
        });
    });
});
