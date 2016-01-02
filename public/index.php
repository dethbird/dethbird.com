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
    // @todo does logged in user have access to this project?
    return function () use ($app) {

        // store current path in session for smart login
        $_SESSION['redirectTo'] = $app->request->getPathInfo();

        // check cookie for securityContext
        $securityContext = json_decode($app->getCookie('securityContext'));
        // die(var_dump($securityContext));
        if (!isset($securityContext->login)) {
          $app->redirect("/login");
        }

        // Check access to project
        $pathinfo = explode("/", $app->request->getPathInfo());
        if($pathinfo[1]=="projects") {
          $projectName = $pathinfo[2];
          if($projectName) {
            if(!in_array($projectName, $securityContext->projects)) {
              $app->redirect("/projects");
            }
          }
        }


    };
};


$app->notFound(function () use ($app) {
    $app->render(
        'pages/404.html.twig'
    );
});

$app->get("/login", function () use ($app) {
  // die(var_dump($_SESSION));
  $app->render(
      'pages/login.html.twig',
      array()
  );
});
$app->post("/login", function () use ($app) {

    $app->response->headers->set('Content-Type', 'application/json');
    $users = Yaml::parse(file_get_contents("../configs/users.yml"));
    $_user = null;
    foreach($users as $user) {
    if(
        $app->request->params('username')==$user['login']
        && $app->request->params('password')==$user['password']
    ) {
        unset($user['password']);
        $user['redirectTo'] = $_SESSION['redirectTo'];
        $_user = $user;
        break;
    }
    }
    if(is_null($_user)){
        $app->halt(404);
    } else {
        $app->setCookie(
            "securityContext",
            json_encode($_user),
            "1 days"
        );
        $app->response->setBody(json_encode($_user));
    }
});

$app->get("/logout", function () use ($app) {
    $app->deleteCookie('securityContext');
    $app->redirect("/");
});

$app->get("/", function () use ($app) {

    $configs = $app->container->get('configs');

    $_gallery = array();
    foreach($configs['portfolio']['gallery'] as $item) {
        $item['id'] = md5($item['thumbnail']);
        $_gallery[] = $item;
    }
    $configs['portfolio']['gallery'] = $_gallery;

    $instagramData = new InstagramData($configs['instagram']['client_id']);
    $wordpressData = new WordpressData($configs['wordpress']['url']);

    $templateVars = array(
        "configs" => $configs,
        "instagramData" => $instagramData->getRecentMedia($configs['instagram']['user_id'], 60, array(
            "art",
            "drawing",
            "sketchbook"
        )),
        "wordpressData" => $wordpressData->getPosts($configs['wordpress']['posts']),
        "tweetIds" => $configs['twitter']['tweets']
    );
    $app->render(
        'pages/index.html.twig',
        $templateVars,
        200
    );
});

$app->get("/comics/:name", function ($name) use ($app) {
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

$app->get("/resume", function () use ($app) {
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

/**
 * Experimental pages for proof of concepting
 */
$app->get("/experiments/:name", $authenticate($app), function ($name) use ($app) {

    $configs = $app->container->get('configs');
    $experimentConfigs = Yaml::parse(file_get_contents("../configs/experiments.yml"));

    $templateVars = array(
        "configs" => $configs,
        "experimentConfigs" => isset($experimentConfigs[$name]) ? $experimentConfigs[$name] : array()
    );
    if($name=="gallery001") {
        $instagramData = new InstagramData($configs['instagram']['client_id']);
        $templateVars['instagramData'] = $instagramData->getRecentMedia($configs['instagram']['user_id'], 60, array(
            "art",
            "drawing",
            "sketchbook"
        ));
    }

    if($name=="fountain002") {
        $templateVars['fountain'] = file_get_contents($experimentConfigs[$name]['fountainfile']);
    }

    $app->render(
        'pages/experiments/'. $name .'.html.twig',
        $templateVars,
        200
    );
});


/** public / private project wikis **/
$app->get("/projects/:name", $authenticate($app), function ($name) use ($app) {

    $configs = $app->container->get('configs');
    $projectConfigs = Yaml::parse(file_get_contents("../configs/projects/".$name."/index.yml"));
    $templateVars = array(
        "configs" => $configs,
        "securityContext" => json_decode($app->getCookie('securityContext')),
        "currentProject" => $name,
        "projectConfigs" => $projectConfigs
    );

    $app->render(
        'pages/projects/index.html.twig',
        $templateVars,
        200
    );

});


/** publically acceessible notes */
$app->get("/notes", function () use ($app) {

    // get directory listing for notes
    $directory = new \RecursiveDirectoryIterator(APPLICATION_PATH . "/configs/notes");
    $objects = new RecursiveIteratorIterator($directory);
    $files = array();

    foreach($objects as $filepath => $fileinfo){
        $file = new stdClass();
        $file->name = $fileinfo->getFilename();
        $file->name = $fileinfo->getFilename();
        $file->mtime = $fileinfo->getMTime();
        $files[] = $file;
    }

    $configs = $app->container->get('configs');
    $templateVars = array(
        "configs" => $configs,
        "securityContext" => json_decode($app->getCookie('securityContext')),
        "files" => $files
    );

    $app->render(
        'pages/notes/index.html.twig',
        $templateVars,
        200
    );
});

$app->get("/note/:name", function ($name) use ($app) {

    $configs = $app->container->get('configs');
    $noteMarkdown = file_get_contents("../configs/notes/".$name.".md");
    $templateVars = array(
        "configs" => $configs,
        "securityContext" => json_decode($app->getCookie('securityContext')),
        "currentNote" => $name,
        "noteMarkdown" => $noteMarkdown
    );

    $app->render(
        'pages/notes/note.html.twig',
        $templateVars,
        200
    );
});

$app->post("/note/:name", $authenticate($app), function ($name) use ($app) {
    $bytes = file_put_contents("../configs/notes/".$name.".md", $app->request->params('content'));
    $data = new stdClass();
    $data->bytesWritten = $bytes;

    $app->response->headers->set('Content-Type', 'application/json');
    $app->response->setBody(json_encode($data));
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
