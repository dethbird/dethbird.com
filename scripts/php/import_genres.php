<?php

define("APPLICATION_PATH", __DIR__ . "/../");
date_default_timezone_set('America/New_York');
require_once APPLICATION_PATH . 'vendor/autoload.php';

use Colors\Color;
use Commando\Command;
use Symfony\Component\Yaml\Yaml;
use MeadSteve\Console\Shells\BasicShell;

$c = new Color();
$configs = Yaml::parse(
   file_get_contents(APPLICATION_PATH . "configs/configs.yml"));

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

$map = [
    "Action / Adventure" => [
        "Action Combat",
        "Action Suspense-Thrillers",
        "Animal Action Films",
        "Biker",
        "Blockbuster",
        "Chase Films or Thrillers",
        "Comic-Book Action",
        "Conspiracy Thriller (Paranoid Thriller)",
        "Costume Adventures",
        "Desert Epics",
        "Disaster",
        "Epic Adventure Films",
        "Erotic Thrillers",
        "Escape",
        "Fairy Tale",
        "Girls With Guns",
        "Guy Films",
        "Heroic Bloodshed Films",
        "Hong Kong",
        "James Bond Series",
        "Jungle and Safari Epics",
        "Man or Woman-In-Peril",
        "Man vs. Nature",
        "Martial Arts",
        "Mountain",
        "Political Conspiracies",
        "Revenge Films",
        "Sea Adventures",
        "Searchers / Expeditions for Lost Continents",
        "Serialized films",
        "Straight Action / Conflict",
        "Super-Heroes",
        "Surfing or Surf Films",
        "Survival",
        "Swashbuckler",
        "Sword and Sorcery (Sword and Sandal)",
        "Techno-Thrillers",
        "Treasure Hunts",
        "Undercover"
    ],
    "Comedy" => [
        "Anarchic Comedies",
        "Animals",
        "Black Comedies (Dark Humor)",
        "British Humor",
        "Buddy",
        "Classic Comedies",
        "Clown",
        "Comedy Musicals",
        "Comedy Thrillers",
        "Comic Criminals",
        "Dumb Comedies",
        "Family Comedies",
        "Farce",
        "Fish-out-of-water Comedies",
        "Gross-out Comedies",
        "Horror Comedies",
        "Lampoon",
        "Mockumentary (Fake Documentary)",
        "Parenthood Comedies",
        "Parody",
        "Political Comedies",
        "Populist",
        "Pre-Teen Comedies",
        "Re-Marriage Comedies",
        "Romantic Comedies",
        "Satire",
        "School Days",
        "Screwball Comedies",
        "Sex Comedies",
        "Slacker",
        "Slapstick",
        "Social-Class Comedies",
        "Sophisticated Comedies",
        "Spoofs",
        "Stand-Up",
        "Stoner Comedies",
        "Teen/Teen Sex Comedies",
        "Urban Comedies",
        "Workplace Comedies"
    ],
    "Crime & Gangster" => [
        "Bad Girl Movies",
        "Cops & Robbers",
        "Detective / Private Eye / Mysteries",
        "Espionage",
        "Film Noir",
        "Hard-boiled Detective",
        "Heist / Caper",
        "Law and Order",
        "Lovers on the Run",
        "Mafia, Organized Crime, Mob Films",
        "Mysteries",
        "Neo-Noir",
        "Outlaw Biker Films",
        "Procedurals",
        "Suspense-Thrillers",
        "Trial Films",
        "Vice Films",
        "Victim",
        "Women in Prison"
    ],
    "Cultural/Historical" => [
        "Ancient History",
        "Art",
        "Art History",
        "Autobiograpy",
        "Biblical",
        "Biography",
        "Documentary",
        "Greek Myth",
        "Medieval (Dark Ages)",
        "Period Pictures",
        "Roman Empire",
        "Social Commentary",
        "War History"
    ],
    "Drama" => [
        "Adaptations, Based upon True Stories",
        "Addiction and / or Alcoholism",
        "Adult",
        "African-American",
        "British Empire",
        "Chick Flicks or Guy-Cry Films",
        "Childhood Dramas",
        "Christmas Films",
        "Coming of Age",
        "Costume Dramas",
        "Diary Films",
        "Disease/Disability",
        "Docu-dramas",
        "Ethnic Family Saga",
        "Euro-Spy Films",
        "Fallen Women",
        "Generation Gap",
        "High School",
        "Holocaust",
        "Investigative Reporting",
        "Legal / Courtroom",
        "Life Story",
        "Love",
        "Medical",
        "Melodramas",
        "Newspaper",
        "Nostalgia",
        "Presidential Politics or Political Dramas",
        "Prostitution",
        "Psychological",
        "Gay and Lesbian",
        "Race Relations,",
        "Inter-racial Themes",
        "Sexual/Erotic (Steamy Romantic Dramas)",
        "Shakespearean",
        "Showbiz Dramas",
        "Small-town Life",
        "Soap Opera",
        "Social Problem Film",
        "Social Commentaries",
        "Teen (or Youth) Films",
        "Tragedy",
        "Women's Friendship",
        "Youth Culture"
    ],
    "Horror" => [
        "B-Movie Horror",
        "Cannibalism or Cannibal Films",
        "Classic Horror",
        "Creature Features",
        "Demonic Possession",
        "Erotic",
        "Ghosts",
        "Gore",
        "Gothic",
        "Halloween",
        "Haunted House, other Hauntings",
        "Macabre",
        "Older-Woman-In-Peril Films (Hagsploitation)",
        "Psychic Powers",
        "Reincarnation",
        "Satanic Stories",
        "Serial Killers",
        "Slashers or \"Splatter\" Films",
        "Teen Terror (Teen Screams)",
        "Terror",
        "Vampires",
        "Witchcraft",
        "Wolves, Werewolves"
    ],
    "Musical / Dance" => [
        "Ballet",
        "Beach Party Films",
        "Broadway Show Musicals",
        "Concert Films",
        "Dance Films",
        "Folk Musicals",
        "Hip-Hop Films",
        "Operettas",
        "Rockumentary",
        "Stage Musicals"
    ],
    "Science Fiction" => [
        "50's Sci-Fi",
        "Action Sci-Fi",
        "Aliens, Extra-Terrestrial Encounters",
        "Alien Invasion",
        "Atomic Age",
        "Classic Sci-Fi",
        "Cyber Punk",
        "End of World",
        "Fantasy Films",
        "Futuristic",
        "Lost Worlds",
        "Mad Scientist",
        "Monsters / Mutants",
        "Other Dimensions",
        "Outer Space",
        "Post-Apocalyptic",
        "Pre-historic",
        "Robots, Cyborgs, and Androids",
        "Sci-Fi Thrillers",
        "Space Adventures",
        "Star Trek",
        "Supernatural",
        "Time or Space Travel",
        "Virtual Reality",
        "Zombies"
    ],
    "War" => [
        "Aerial Combat, Aviation",
        "Ancient War",
        "Anti-War",
        "Civil War",
        "Korean",
        "Prisoner of War/Escape",
        "Revolutionary War",
        "Space War",
        "Submarine",
        "Vietnam"
    ],
    "Western" => [
        "Cattle Drive",
        "Epic Westerns",
        "Frontier",
        "Gunfighters",
        "Outlaws",
        "Road-Trail Journeys",
        "Shoot-outs",
        "Spaghetti Westerns"
    ],
    "Other" => [
        "Blaxploitation",
        "Buddy Cop",
        "Hood Films",
        "Literary Adaptation",
        "Military",
        "Prison",
        "Quest",
        "Religious",
        "Road",
        "Sports"
    ]
];

foreach ($map as $genreName=>$subgenres) {
    $g = new Genre();
    $g->name = $genreName;
    $g->save();
    var_dump($g);
    foreach ($subgenres as $subgenreName) {
        $s = new Subgenre();
        $s->name = $subgenreName;
        $s->genre_id = $g->id;
        $s->save();
        var_dump($s);
    }
}
