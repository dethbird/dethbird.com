<?php

class ApiResponse {
    private $statusCode;
    private $body;

    public function __construct($code = 200, $body = null)
    {
        $this->statusCode = $code;
        $this->body = $body;
    }

    public function setStatusCode($code)
    {
        $this->statusCode = (int) $code;
    }

    public function getStatusCode()
    {
        return $this->statusCode;
    }

    public function setBody($body)
    {
        $this->body = $body;
    }

    public function getBody()
    {
        return $this->body;
    }

    public function isOk() {
        return $this->statusCode >= 200 && $this->statusCode < 300;
    }
}


class ExplosioncorpApi {

    private $baseUrl;
    private $authToken;
    private $httpClient;

    public function __construct($baseUrl, $authToken = null)
    {
        $this->baseUrl = $baseUrl;
        $this->authToken = $authToken;
        $this->httpClient = new GuzzleHttp\Client(['base_uri' => $this->baseUrl]);
    }


    public function request(
        $method = 'GET',
        $path = null,
        $body = null,
        $options = [],
        $queryParams = [])
    {
        $response = new ApiResponse();
        $apiResponse = null;
        try {
            $options = [];
            if (is_object($body) || is_array($body)) {
                $options['json'] = $body;
            }
            if (!is_null($this->authToken)) {
                $options['headers'] = ['Auth-Token' => $this->authToken];
            }
            $apiResponse = $this->httpClient->request($method, $path, $options);
        } catch (Exception $e) {
            $apiResponse = $e->getResponse();
        }
        $response->setStatusCode($apiResponse->getStatusCode());
        $response->setBody($apiResponse->getBody()->getContents());
        return $response;
    }
}