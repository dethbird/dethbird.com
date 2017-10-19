<?php

# service
$app->group('/service', function(){

    $this->group('/pocket', function(){
        $this->get('/authorize', function($request, $response){
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

        $this->get('/redirect', function($request, $response){
            $pocketData = new PocketData(
                $this->configs['service']['pocket']['key']);
        
            $accessToken = $pocketData->fetchAccessTokenData($_SESSION['pocketCode']);

            # save access token at Explosioncorp
            $api = new ExplosioncorpApi($this->configs['api']['base_url'], $_SESSION['authToken']);
            $api->request('POST', '/api/0.1/service/pocket/auth', $accessToken);

            return $response
                ->withStatus(302)
                ->withHeader('Location', '/');
        });
    });

    $this->group('/todoist', function(){
        $this->get('/authorize', function($request, $response){
            $todoistData = new TodoistData(
                $this->configs['service']['todoist']['key'],
                $this->configs['service']['todoist']['secret']);

            return $response
                ->withStatus(302)
                ->withHeader('Location', $todoistData->getAuthorizeScreenUri());
        });

        $this->get('/redirect', function($request, $response){
            $todoistData = new TodoistData(
                $this->configs['service']['todoist']['key'],
                $this->configs['service']['todoist']['secret']);
        
            $accessToken = $todoistData->fetchAccessToken($request->getQueryParams()['code']);

            # save access token at Explosioncorp
            $api = new ExplosioncorpApi($this->configs['api']['base_url'], $_SESSION['authToken']);
            $api->request('POST', '/api/0.1/service/todoist/auth', $accessToken);

            return $response
                ->withStatus(302)
                ->withHeader('Location', '/');
        });
    });

    $this->group('/wunderlist', function(){
        $this->get('/authorize', function($request, $response){
            $wunderlist = new WunderlistData(
                $this->configs['service']['wunderlist']['key'],
                $this->configs['service']['wunderlist']['secret']);

            return $response
                ->withStatus(302)
                ->withHeader('Location', $wunderlist->getAuthorizeScreenUri(
                    "https://".$_SERVER['HTTP_HOST']."/service/wunderlist/redirect"
                ));
        });

        $this->get('/redirect', function($request, $response){
            $wunderlist = new WunderlistData(
                $this->configs['service']['wunderlist']['key'],
                $this->configs['service']['wunderlist']['secret']);
        
            $accessToken = $wunderlist->fetchAccessToken($request->getQueryParams()['code']);

            # save access token at Explosioncorp
            $api = new ExplosioncorpApi($this->configs['api']['base_url'], $_SESSION['authToken']);
            $api->request('POST', '/api/0.1/service/wunderlist/auth', $accessToken);

            return $response
                ->withStatus(302)
                ->withHeader('Location', '/');
        });
    });    
});
