<?php

require_once("Base.php");

class TodoistData extends ExternalDataBase {

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


    public function getAuthorizeScreenUri()
    {
        return "https://todoist.com/oauth/authorize?client_id=" . $this->key . "&scope=data:read&state=farts5000";
    }

    public function fetchAccessToken($code)
    {
        $response = $this->httpClient->post(
            "https://todoist.com/oauth/access_token", [
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


    public function getArticlesByTag($tag)
    {
        $response = $this->httpClient->post(
            'https://getpocket.com/v3/get',[
            'headers' => [
                'X-Accept' => 'application/json'
            ],
            'json' => [
                'consumer_key' => $this->consumerKey,
                'access_token' => $this->accessToken,
                'state' => 'all',
                'sort' => 'newest',
                'detailType' => 'complete',
                'count' => 100,
                'tag' => $tag
            ]
        ]);
        return $response->getBody()->getContents();
    }
}
