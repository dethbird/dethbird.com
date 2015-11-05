<?php

    $data = json_decode(file_get_contents('../configs/audio-analysis.json'));

    $moods = array();
    $themes = array();
    $danceability = array();
    $bpm = array();

    foreach ($data as $track) {
        $moods[$track->mood]++;
        $themes[$track->theme]++;
        $danceability[$track->danceability]++;
        $bpm[$track->bpm]++;
    }

    file_put_contents("../public/data/moods.json", json_encode($moods));
    file_put_contents("../public/data/themes.json", json_encode($themes));
    file_put_contents("../public/data/danceability.json", json_encode($danceability));
    file_put_contents("../public/data/bpm.json", json_encode($bpm));
