<?php 
require 'vendor/autoload.php';
use josegonzalez\Dotenv\Loader;
use MeadSteve\Console\Shells\BasicShell;

$shell = new BasicShell();
$dotenv = (new Loader('.env'))
    ->parse()
    ->toArray();

foreach ($dotenv as $k=>$v) {
    $resp = $shell->executeCommand('sed', array(
        "-i",
        "'s/:".$k."/".addcslashes($v, "/")."/g'",
        "configs/configs.yml"
    ));
}
