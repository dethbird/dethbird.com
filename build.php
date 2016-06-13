<?php

    require_once 'vendor/autoload.php';
    use Colors\Color;
    use Commando\Command;

    $cmd = new Commando\Command();
    $cmd->beepOnError();
    $cmd->option('c')
        ->boolean()
        ->aka('cache')
        ->describedAs('Clear cache and reset permissions of cache directory');
    $cmd->option('p')
        ->boolean()
        ->aka('php')
        ->describedAs('PHP/Composer install');
    $cmd->option('n')
        ->boolean()
        ->aka('npm')
        ->describedAs('Install node modules from package.json');
    $cmd->option('j')
        ->boolean()
        ->aka('javascript')
        ->describedAs('Broswerify and minify the js');
    $cmd->option('u')
        ->boolean()
        ->aka('uglify')
        ->describedAs('Uglify the compiled js (leave empty in dev)');
    $c = new Color();
    $shell = new MeadSteve\Console\Shells\BasicShell();

    // var_dump($cmd); die();
    // cache
    if($cmd['cache']) {
        echo $c("Cache clear and setup")
            ->white()->bold()->highlight('blue') . PHP_EOL;
        // echo "cache:".$options['cache']."\n";
        $shell->executeCommand('rm', array(
            "-rf",
            "cache"
        ));
        $shell->executeCommand('mkdir', array(
            "cache"
        ));
        $shell->executeCommand('chmod', array(
            "777",
            "cache"
        ));

        echo $c("Cache setup complete.")
            ->green()->bold() . PHP_EOL;
    }

    // php and composer
    if($cmd['php']) {
        echo $c("PHP / Composer")
            ->white()->bold()->highlight('blue') . PHP_EOL;

        $shell->executeCommand('rm', array(
            "-rf",
            "vendor"
        ));

        $shell->executeCommand('rm', array(
            "-rf",
            "composer.lock"
        ));

        $resp = $shell->executeCommand('curl', array(
            "-sS",
            "https://getcomposer.org/installer",
            "|",
            "php"
        ));
        echo implode(PHP_EOL, $resp) . PHP_EOL;

        $resp = $shell->executeCommand('php', array(
            "composer.phar",
            "install",
            "|",
            "php"
        ));
        // var_dump($resp);
        // shell_exec("rm -rf composer.phar");
        $resp = $shell->executeCommand('rm', array(
            "-rf",
            "composer.phar"
        ));

        // shell_exec("chmod -R 777 configs/*");
        $resp = $shell->executeCommand('chmod', array(
            "-R",
            "777",
            "configs/*"
        ));

        echo $c("PHP / Composer complete.")
            ->green()->bold() . PHP_EOL;
    }

    // node
    if($cmd['npm']) {
        echo $c("Node modules")
            ->white()->bold()->highlight('blue') . PHP_EOL;
        $resp = $shell->executeCommand('rm', array(
            "-rf",
            "node_modules"
        ));
        $resp = $shell->executeCommand('npm', array(
            "install"
        ));

        echo implode(PHP_EOL, $resp) . PHP_EOL;

        echo $c("Node modules complete.")
            ->green()->bold() . PHP_EOL;
    }

    // javascript
    if($cmd['javascript']) {

        echo $c("Javascript: browserify" . ($cmd['uglify'] ? " & uglify" : null))
            ->white()->bold()->highlight('blue') . PHP_EOL;

        $frontendFiles = $shell->executeCommand('find', array(
            "src/frontend/js/pages/",
            "-name",
            "'*.js'"
        ));

        foreach($frontendFiles as $file){
            if($file) {
                $outputFile = str_replace("src/frontend", "public", $file);

                echo $c($outputFile)
                    ->yellow()->bold() . PHP_EOL;

                $browserifyResponse = $shell->executeCommand('browserify', array(
                    $file,
                    "-o",
                    $outputFile,
                    "--list"
                ));

                foreach($browserifyResponse as $builtFrom) {
                    echo $c("   " . $builtFrom)
                        ->white() . PHP_EOL;
                }

                if($cmd['uglify']){
                    $resp = $shell->executeCommand('uglifyjs', array(
                        $outputFile,
                        "-o",
                        $outputFile
                    ));
                }

                // report
                echo $c(
                    "   browserified from " .
                    count($browserifyResponse) .
                    " modules" .
                    ( $cmd['uglify'] ? " and uglified" : null ).
                    ": ".
                    round(filesize($outputFile)/1024, 2) . " Kb.")
                    ->green()->bold() . PHP_EOL;
            }
        }
    }

    echo $c("DONE.")
        ->green()->bold() . PHP_EOL;
