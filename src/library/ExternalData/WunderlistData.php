<?php

require_once("Base.php");

class WunderlistData extends ExternalDataBase {

    private $key;
    private $secret;
    private $accessToken;

    public function __construct($key, $secret, $accessToken = null)
    {
        $this->key = $key;
        $this->secret = $secret;
        $this->accessToken = $accessToken;
        parent::__construct();
    }


    public function getAuthorizeScreenUri($redirectUri)
    {
        return "https://www.wunderlist.com/oauth/authorize?client_id=" . $this->key . "&redirect_uri=" . $redirectUri . "&status=farts5000";
    }

    public function fetchAccessToken($code)
    {
        $response = $this->httpClient->post(
            "https://www.wunderlist.com/oauth/access_token", [
            'headers' => [
                'Content-Type' => 'application/json; charset=UTF-8',
                'X-Accept' => 'application/json'
            ],
            'json' => [
                'client_id' => $this->key,
                'client_secret' => $this->secret,
                'code' => $code
            ]]
        );
        return json_decode($response->getBody()->getContents());
    }
}
