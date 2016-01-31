<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
// ini_set('display_startup_errors',1);
define("APPLICATION_PATH", __DIR__ . "/../");
date_default_timezone_set('America/New_York');
session_cache_limiter(false);
session_start();

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

use Aptoma\Twig\Extension\MarkdownExtension;
use Aptoma\Twig\Extension\MarkdownEngine;
use Symfony\Component\Yaml\Yaml;

// Load configs and add to the app container
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
// $view->addExtension(new MarkdownExtension($markdownEngine));
$app->container->set('configs', $configs);

// Route authentication
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


    $configs = $app->container->get('configs');

    if($configs['under_construction']==true && $app->request->get('bypass')!="true") {
        $app->render(
            'partials/under_construction.html.twig',
            array(
                "configs" => $configs,
                "section" => "under_construction"
            ),
            200
        );
    } else {
        $wordpressData = new WordpressData($configs['wordpress_blog']['base_url']);
        $instagramData = new InstagramData($configs['instagram']['client_id']);
            // var_dump($wordpressData->getPosts($configs['featured']['blogs']['wordpress'])); die();
        $app->render(
            'pages/index.html.twig',
            array(
                "configs" => $configs,
                "section" => "home",
                "wordpressPosts" => $wordpressData->getPosts($configs['featured']['blogs']['wordpress']),
                "instagramData" => $instagramData->getEmbedMedia(
                    $instagramData->getRecentMedia($configs['instagram']['user_id'], 6), 525
                )
            ),
            200
        );
    }
});

$app->get("/about", $authenticate($app), function () use ($app) {

    $configs = $app->container->get('configs');
    $app->render(
        'pages/about.html.twig',
        array(
            "configs" => $configs,
            "section" => "about"
        ),
        200
    );
});

$app->get("/contact", $authenticate($app), function () use ($app) {

    $configs = $app->container->get('configs');
    $app->render(
        'partials/contact.html.twig',
        array(
            "configs" => $configs,
            "section" => "contact"
        ),
        200
    );
});

$app->get("/graduates", $authenticate($app), function () use ($app) {

    $configs = $app->container->get('configs');
    $app->render(
        'partials/graduates.html.twig',
        array(
            "configs" => $configs,
            "section" => "graduates"
        ),
        200
    );
});

$app->run();
