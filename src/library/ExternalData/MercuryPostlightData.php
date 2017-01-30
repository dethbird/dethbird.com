<?php

require_once("Base.php");

class MercuryPostlightData extends ExternalDataBase {

    private $consumerKey;

    public function __construct($consumerKey)
    {
        $this->consumerKey = $consumerKey;
        parent::__construct();
    }

    public function getArticle($url)
    {
        $response = $this->httpClient->get(
            'https://mercury.postlight.com/parser',[
            'query' => [
                'url' => $url
            ],
            'headers' => [
                'x-api-key' => $this->consumerKey
            ]
        ]);
        return json_decode($response->getBody()->getContents());
    }
}
