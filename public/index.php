<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors',1);
define("APPLICATION_PATH", __DIR__ . "/../");
date_default_timezone_set('America/New_York');
session_cache_limiter(false);
session_start();

if (!isset($_SESSION['securityContext'])) {
    $_SESSION['securityContext'] = null;
}

set_include_path(implode(PATH_SEPARATOR, array(
    APPLICATION_PATH ,
    APPLICATION_PATH . 'library',
    get_include_path(),
)));


require '../vendor/autoload.php';
require_once APPLICATION_PATH . 'src/library/Cache/Manager.php';
require_once APPLICATION_PATH . 'src/library/ExternalData/PocketData.php';
require_once APPLICATION_PATH . 'src/library/ExternalData/MercuryPostlightData.php';
require_once APPLICATION_PATH . 'src/library/Middleware/SetSecurityContext.php';
require_once APPLICATION_PATH . 'src/library/Middleware/RequestBodyValidation.php';
require_once APPLICATION_PATH . 'src/library/Middleware/ReadAccess.php';
require_once APPLICATION_PATH . 'src/library/Middleware/WriteAccess.php';
require_once APPLICATION_PATH . 'src/library/Validation/Validator.php';
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Symfony\Component\Yaml\Yaml;
use Guzzle\Http\Client;
use Ramsey\Uuid\Uuid;

$app = new \Slim\App([
    'settings' => [
        'determineRouteBeforeAppMiddleware' => true,
        'displayErrorDetails' => true
    ]
]);
$configs = Yaml::parse(file_get_contents("../configs/configs.yml"));
$container = $app->getContainer();

# container configs
$container['configs'] = $configs;

# container view
$container['view'] = function ($container) {
    $view = new \Slim\Views\Twig(APPLICATION_PATH . 'src/views', [
        'cache' => false
    ]);

    // Instantiate and add Slim specific extension
    $basePath = rtrim(str_ireplace('index.php', '', $container['request']->getUri()->getBasePath()), '/');
    $view->addExtension(new Slim\Views\TwigExtension($container['router'], $basePath));

    return $view;
};

# container notFoundHandler
$container['notFoundHandler'] = function ($c) {
    return function ($request, $response) use ($c) {
        $_SESSION['lastRequestUri'] = $_SERVER['REQUEST_URI'];
        return $c['response']
            ->withStatus(302)
            ->withHeader('Location', '/');
    };
};

# index
$app->get('/', function ($request, $response){
    $configs = $this['configs'];
    $view = $this['view'];
    $securityContext = isset($_SESSION['securityContext']) ? $_SESSION['securityContext'] : null;
    $lastRequestUri = isset($_SESSION['lastRequestUri']) ? $_SESSION['lastRequestUri'] : null;

    $templateVars = [
        "configs" => $configs,
        'securityContext' => $securityContext,
        'lastRequestUri' => $lastRequestUri,
    ];

    return $this['view']->render(
        $response,
        'pages/index.html.twig',
        $templateVars
    );

})
->add( new SetSecurityContext($container) );

$app->any('/proxy/[{path:.*}]', function($request, $response, $path = null) {

    $configs = $this['configs'];
    $securityContext = isset($_SESSION['securityContext']) ? $_SESSION['securityContext'] : null;

    $client = new GuzzleHttp\Client(['base_uri' => 'https://api-dev.storystation.io']);
    try {
        $apiResponse = $client->request($request->getMethod(), '/' . $path['path'], ['json' => $request->getParsedBody()]);
    } catch (Exception $e) {
        return $response
            ->withStatus($e->getResponse()->getStatusCode())
            ->withJson(json_decode($e->getResponse()->getBody()->getContents()));
    }
    
    $body = json_decode($apiResponse->getBody()->getContents());

    return $response
        ->withJson($body);
});

# logout
$app->get("/logout",  function ($request, $response) {
    $_SESSION['securityContext'] = null;
    $_SESSION['lastRequestUri'] = '/';
    return $response
        ->withStatus(302)
        ->withHeader('Location', '/');
});

$app->run();
