<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
// ini_set('display_startup_errors',1);
define("APPLICATION_PATH", __DIR__ . "/../");
date_default_timezone_set('America/New_York');

// Ensure src/ is on include_path
set_include_path(implode(PATH_SEPARATOR, array(
    APPLICATION_PATH ,
    APPLICATION_PATH . 'library',
    get_include_path(),
)));


require '../vendor/autoload.php';
require_once APPLICATION_PATH . 'src/library/ExternalData/InstagramData.php';
require_once APPLICATION_PATH . 'src/library/ExternalData/YoutubeData.php';
require_once APPLICATION_PATH . 'src/library/ExternalData/WordpressData.php';
require_once APPLICATION_PATH . 'src/library/View/Extension/TemplateHelpers.php';


use Symfony\Component\Yaml\Yaml;

// Load configs and add to the app container
$app = new \Slim\Slim(
    array(
        'view' => new Slim\Views\Twig(),
        'templates.path' => APPLICATION_PATH . 'src/views'
    )
);
$view = $app->view();
$view->parserExtensions = array(
    new \Slim\Views\TwigExtension(),
    new TemplateHelpers()
);
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


$app->notFound(function () use ($app) {
    $app->render(
        'pages/404.html.twig'
    );
});


$app->get("/", $authenticate($app), function () use ($app) {
    $app->render(
        'pages/index.html.twig',
        $app->container->get('configs'),
        200
    );
});

$app->get("/comics/:name", $authenticate($app), function ($name) use ($app) {
    $configs = $app->container->get('configs');
    if(!array_key_exists($name, $configs["comics"])){
        $app->notFound();
    } else {
        $app->render(
            'pages/comics.html.twig',
            array("comic" => $configs["comics"][$name]),
            200
        );
    }
});

$app->get("/resume", $authenticate($app), function () use ($app) {
    $resume = Yaml::parse(file_get_contents("../configs/resume.yml"));

    if ($app->request->isAjax()) {
        $app->response->headers->set('Content-Type', 'application/json');
        $app->response->setBody(json_encode($resume));
    } else {
        $app->render(
            'pages/resume.html.twig',
            $resume,
            200
        );
    }
});

$app->get("/experiments/:name", $authenticate($app), function ($name) use ($app) {

    $experimentConfigs = Yaml::parse(file_get_contents("../configs/experiments.yml"));

    $configs = $app->container->get('configs');
    $app->render(
        'pages/experiments/'. $name .'.html.twig',
        array(
            "configs" => $configs,
            "experimentConfigs" => isset($experimentConfigs[$name]) ? $experimentConfigs[$name] : array()
        ),
        200
    );
});



$app->get("/posts/:type", $authenticate($app), function ($type) use ($app) {

    $app->response->headers->set('Content-Type', 'application/json');

    if($type=="instagram") {
        $instagramData = new InstagramData();
        $data = $instagramData->getMedia($app->request->params('ids'));
    } else if($type=="wordpress") {
        $wordpressData = new WordpressData();
        $data = $wordpressData->getPosts($app->request->params('ids'));
    }

    $app->response->setBody(json_encode($data));

});


$app->run();