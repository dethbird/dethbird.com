<?php
class SetSecurityContext
{

    private $container;

    public function __construct($container) {
        $this->container = $container;
    }

    /**
     * SecurityContextMiddleware middleware invokable class
     *
     * @param  \Psr\Http\Message\ServerRequestInterface $request  PSR7 request
     * @param  \Psr\Http\Message\ResponseInterface      $response PSR7 response
     * @param  callable                                 $next     Next middleware
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function __invoke($request, $response, $next)
    {
        $configs = $this->container['configs'];

        # if no user session, set to default user: application
        if(!isset( $_SESSION['securityContext'])) {
            $user = Users::find_by_api_key($configs['application']['api_key']);
            $_SESSION['securityContext'] = json_decode($user->to_json([
                'except' => ['api_key', 'password', 'email']
            ]));
        }

        # store current path in session for smart login
        $_SESSION['redirectTo'] = $request->getRequestTarget();

        $response = $next($request, $response);

        return $response;
    }
}
