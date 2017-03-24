<?php
use JsonSchema\Validator;
use JsonSchema\Constraints\Constraint;

class RequestBodyValidation
{

    private $schema;

    /**
     * Load the validation schema json
     * @param string $pathToJsonFile path to the file with json schema definition
     */
    public function __construct($pathToJsonFile) {
        $this->schema = json_decode(
            file_get_contents(realpath($pathToJsonFile)));
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
        $params = (object) $request->getParsedBody();
        $validator = new Validator();

        $validator->validate(
            $params,
            $this->schema,
            Constraint::CHECK_MODE_COERCE_TYPES
        );

        if (!$validator->isValid()) {
            $errors = ['properties' => []];
            foreach ($validator->getErrors() as $error) {
                $errors['properties'][] = $error;
            }
            return $response
                ->withStatus(400)->withJson($errors);
        }

        $response = $next($request, $response);
        return $response;
    }

}
