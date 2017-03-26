<?php
class ReadAccess
{

    private $securityContext;

    public function __construct($securityContext) {
        $this->securityContext = $securityContext;
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
        if ($this->securityContext->read !== 1) {
            return $response
                ->withStatus(403);
        }
        $response = $next($request, $response);
        return $response;
    }
}
