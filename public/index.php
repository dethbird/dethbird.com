<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors',1);
define("APPLICATION_PATH", __DIR__ . "/../");
date_default_timezone_set('America/New_York');
session_cache_limiter(false);
session_start();

set_include_path(implode(PATH_SEPARATOR, array(
    APPLICATION_PATH ,
    APPLICATION_PATH . 'library',
    get_include_path(),
)));


require '../vendor/autoload.php';
require_once APPLICATION_PATH . 'src/library/Middleware/SetSecurityContext.php';
require_once APPLICATION_PATH . 'src/library/Middleware/RequestBodyValidation.php';
require_once APPLICATION_PATH . 'src/library/Middleware/ReadAccess.php';
require_once APPLICATION_PATH . 'src/library/Middleware/WriteAccess.php';
require_once APPLICATION_PATH . 'src/library/Validation/Validator.php';
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Symfony\Component\Yaml\Yaml;
use Guzzle\Http\Client;


$app = new \Slim\App([
    'settings' => [
        'determineRouteBeforeAppMiddleware' => true
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

# ActiveRecord
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
// ActiveRecord\Serialization::$DATETIME_FORMAT = 'Y-m-d g:i:s a';


// # authorize the user by header auth token
// $authorizeByHeaders = function ($app) {
//
//     return function () use ($app) {
//
//         # check cookie for securityContext
//         $apiKey = $app->request->headers->get('X-Api-Key');
//         if ($apiKey == "") {
//             if (!isset($_SESSION['securityContext'])) {
//                 $app->halt(400, json_encode(['X-Api-Key'=>'Invalid api key, no active session']));
//             }
//         } else {
//             $user = Users::find_by_api_key($apiKey);
//
//             if(!$user) {
//                 $app->halt(404, json_encode(['X-Api-Key'=>'Invalid api key, user not found']));
//             } else {
//                 $_SESSION['securityContext'] = json_decode($user->to_json([
//                     'except' => ['api_key', 'password', 'email']
//                 ]));
//             }
//         }
//     };
// };

// # authorize the user by header auth token
// $writeAccess = function ($app) {
//
//     return function () use ($app) {
//         # check cookie for securityContext
//         if (isset($_SESSION['securityContext'])) {
//
//             $user = $_SESSION['securityContext'];
//             if (!$user->write) {
//                 $app->halt(403);
//             }
//         }
//     };
// };
//

# mockup
$app->get("/mockup/{section}", function ($request, $response, $args){
    $section = $args['section'];
    $configs = $this['configs'];
    $view = $this['view'];
    $securityContext = isset($_SESSION['securityContext']) ? $_SESSION['securityContext'] : null;
    $lastRequestUri = isset($_SESSION['lastRequestUri']) ? $_SESSION['lastRequestUri'] : null;

    if (!file_exists( APPLICATION_PATH . 'src/views/mockup/' . $section . '.html.twig')) {
        $section = "index";
    }

    $templateVars = array(
        "configs" => $configs,
        'securityContext' => $securityContext,
        'lastRequestUri' => $lastRequestUri,
        "section" => $section
    );

    return $this['view']->render(
        $response,
        'mockup/' .$section. '.html.twig',
        $templateVars
    );
})
->add( new SetSecurityContext($container) );

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
        "section" => "index"
    ];

    return $this['view']->render(
        $response,
        'pages/index.html.twig',
        $templateVars
    );

})
->add( new SetSecurityContext($container) );


// # logout
$app->get("/logout",  function ($request, $response) {
    $_SESSION['securityContext'] = null;
    $_SESSION['lastRequestUri'] = '/';
    return $response
        ->withStatus(302)
        ->withHeader('Location', '/');
});


require_once APPLICATION_PATH . 'src/routes/api.php';
// require_once APPLICATION_PATH . 'src/routes/service.php';


$app->run();
