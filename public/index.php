<?php

require '../vendor/autoload.php';

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
define("APPLICATION_PATH", __DIR__ . "/..");
date_default_timezone_set('America/New_York');

// Ensure src/ is on include_path
set_include_path(implode(PATH_SEPARATOR, array(
    APPLICATION_PATH ,
    APPLICATION_PATH . '/src',
    get_include_path(),
)));

use Symfony\Component\Yaml\Yaml;

// Load configs and add to the app container
$app = new \Slim\Slim();
$configs = Yaml::parse(file_get_contents("../configs/configs.yml"));
$app->container->set('configs', $configs);


// This is where a persistence layer ACL check would happen on authentication-related HTTP request items
$authenticate = function ($app) {
    return function () use ($app) {
        if (false) {
            $app->halt(403, "Invalid security context");
        }
    };
};


$app->get("/", $authenticate($app), function () use ($app) {
    $app->response->setBody('farts');
});


$app->run();