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
        
            $accessToken = $pocketData->fetchAccessTokenData($_SESSION['pocketCode']);

            # save access token at Explosioncorp
            $api = new ExplosioncorpApi(
                $this->configs['api']['base_url'],
                $_SESSION['authToken']);
            
            $api->request(
                'POST',
                '/api/0.1/service/pocket/auth',
                json_encode($accessToken));

            return $response
                ->withStatus(302)
                ->withHeader('Location', '/');
        });
    });
});
