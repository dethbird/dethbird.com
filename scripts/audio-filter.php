<?php

    $data = json_decode(file_get_contents('../configs/audio-analysis.json'));

    // $tracks = array();
    // foreach ($data as $track) {
    //     if (
    //         true
    //         && $track->bpm >= 120 
    //         && $track->bpm <= 180
    //         && $track->theme == "At the Office"
    //         && $track->mood == "Bittersweet"
    //         // && $track->danceability > 90
    //     ){
    //         $tracks[] = $track;
    //     }
    // }

    // echo json_encode($tracks);

    // $tracks = array();
    // foreach ($data as $track) {
    //     if (
    //         true
    //         && $track->bpm >= 120 
    //         && $track->bpm <= 180
    //         && $track->theme == "Feeling Blue"
    //         && $track->mood == "Warm"
    //         // && $track->danceability > 90
    //     ){
    //         $tracks[] = $track;
    //     }
    // }

    // echo json_encode($tracks);


    // $tracks = array();
    // foreach ($data as $track) {
    //     if (
    //         true
    //         // && $track->bpm >= 120 
    //         // && $track->bpm <= 180
    //         && $track->theme == "70's"
    //         && $track->mood == "Atmospheric"
    //         && $track->danceability > 90
    //     ){
    //         $tracks[] = $track;
    //     }
    // }

    // echo json_encode($tracks);


    $tracks = array();
    foreach ($data as $track) {
        if (
            true
            && $track->bpm = 60 
            // && $track->bpm <= 180
            // && $track->theme == "70's"
            && $track->mood == "Melancholy"
            // && $track->danceability > 90
        ){
            $tracks[] = $track;
        }
    }

    echo json_encode($tracks);