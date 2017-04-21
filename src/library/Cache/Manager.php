<?php

class CacheManager {

    private function filepath($filename)
    {
        return APPLICATION_PATH . "cache/" . $filename;
    }

    public function retrieve($filename, $cacheTime = 7200)
    {
        if(file_exists($this->filepath($filename))) {
            if (!is_null($cacheTime)) {
              if (time() - filectime($this->filepath($filename)) > $cacheTime){
                  return false;
              }
            }
            return file_get_contents($this->filepath($filename));
        } else {
            return false;
        }
    }

    public function store($filename, $data)
    {
        file_put_contents($this->filepath($filename), $data);
    }
}
