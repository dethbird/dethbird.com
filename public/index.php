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
require_once APPLICATION_PATH . 'src/library/View/Extension/TemplateHelpers.php';

use Aptoma\Twig\Extension\MarkdownExtension;
use Aptoma\Twig\Extension\MarkdownEngine;
use Symfony\Component\Yaml\Yaml;
use GuzzleHttp\Client;

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

# security context auth
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


# 404
$app->notFound(function () use ($app) {
    $app->render(
        'pages/404.html.twig'
    );
});


# login
$app->get("/login", function () use ($app) {
  // die(var_dump($_SESSION));
  $app->render(
      'pages/login.html.twig',
      array()
  );
});

# login api
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
        $user['redirectTo'] = isset($_SESSION['redirectTo']) ? $_SESSION['redirectTo'] : "/";
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
    $app->redirect("http://rishisatsangi.com");
});



# projects
$app->get("/projects/:name", $authenticate($app), function ($name) use ($app) {

    $configs = $app->container->get('configs');
    $projectConfigs = Yaml::parse(file_get_contents("../configs/projects.yml"));
    $projectId = $projectConfigs[$name];

    $httpClient = new Client([
        "base_uri" => $configs['workstation']['api_url']]);
    $response = $httpClient->request("GET", "/api/project/" . $projectId, [
        "headers" => [
            "Auth-Token" => $configs['workstation']['auth_token']
        ]
    ]);
    $body = $response->getBody();
    // print_r(json_decode($body)); exit();
    $templateVars = array(
        "configs" => $configs,
        "securityContext" => json_decode($app->getCookie('securityContext')),
        "currentProject" => $name,
        "project" => json_decode($body)
    );

    $app->render(
        'pages/projects/index.html.twig',
        $templateVars,
        200
    );

});



$app->run();
