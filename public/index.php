<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors',1);
define("APPLICATION_PATH", __DIR__ . "/../");
date_default_timezone_set('America/New_York');
session_cache_limiter(false);
session_start();

# Ensure src/ is on include_path
set_include_path(implode(PATH_SEPARATOR, array(
    APPLICATION_PATH ,
    APPLICATION_PATH . 'library',
    get_include_path(),
)));


require '../vendor/autoload.php';
require_once APPLICATION_PATH . 'src/library/View/Extension/TemplateHelpers.php';
require_once APPLICATION_PATH . 'vendor/php-activerecord/php-activerecord/ActiveRecord.php';

use Aptoma\Twig\Extension\MarkdownExtension;
use Aptoma\Twig\Extension\MarkdownEngine;
use Cocur\Slugify\Slugify;
use Symfony\Component\Yaml\Yaml;
use Guzzle\Http\Client;

# Load configs and add to the app container
$configs = Yaml::parse(file_get_contents("../configs/configs.yml"));
$app = new \Slim\Slim(
    array(
        'view' => new Slim\Views\Twig(),
        'templates.path' => APPLICATION_PATH . 'src/views',
        'cookies.encrypt' => true,
        'cookies.secret_key' => $configs['security']['secret'],
        'cookies.cipher' => MCRYPT_RIJNDAEL_256,
        'cookies.cipher_mode' => MCRYPT_MODE_CBC
    )
);

$markdownEngine = new MarkdownEngine\MichelfMarkdownEngine();

$view = $app->view();
$view->parserExtensions = array(
    new \Slim\Views\TwigExtension(),
    new TemplateHelpers(),
    new MarkdownExtension($markdownEngine)
);

$app->container->set('configs', $configs);


ActiveRecord\Config::initialize(function($cfg)
{
    global $configs;

    $cfg->set_model_directory(APPLICATION_PATH . '/src/library/Models');
    $cfg->set_connections(
        [
            'development' =>
                'mysql://'.$configs['mysql']['user']
                .':'.$configs['mysql']['password']
                .'@'.$configs['mysql']['host'].'/'
                .$configs['mysql']['database']
        ]
    );
});


$app->notFound(function () use ($app) {
    $_SESSION['lastRequestUri'] = $_SERVER['REQUEST_URI'];
    $app->redirect("/");
});


# all GET routes
$app->get("/.*?", function () use ($app) {
    $configs = $app->container->get('configs');
    $lastRequestUri = isset($_SESSION['lastRequestUri']) ? $_SESSION['lastRequestUri'] : null;

    // locate layout file if exists
    $layoutFile = "../configs/layout" . ($_SERVER['REQUEST_URI'] == "/" ? "/index" : $_SERVER['REQUEST_URI'])  . "/layout.yml";
    $layout;
    if(file_exists($layoutFile)) {
        $layout = Yaml::parse(file_get_contents($layoutFile));
    }

    $templateVars = array(
        "configs" => $configs,
        'requestUri' => $_SERVER['REQUEST_URI'],
        'layout' => $layout
    );

    $app->render(
        'pages/index.html.twig',
        $templateVars,
        200
    );

});

# logout
$app->get("/logout", function () use ($app) {
  $_SESSION['securityContext'] = null;
  $app->redirect("/");
});


// require_once APPLICATION_PATH . 'src/routes/api.php';
// require_once APPLICATION_PATH . 'src/routes/likedrop.php';
// require_once APPLICATION_PATH . 'src/routes/projects.php';
// require_once APPLICATION_PATH . 'src/routes/scripts.php';
// require_once APPLICATION_PATH . 'src/routes/service.php';


$app->run();
