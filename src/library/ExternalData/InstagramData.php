<?php

require_once("Base.php");

class InstagramData extends DataBase {

    private $clientId;

    public function __construct($clientId)
    {
        $this->clientId = $clientId;
        parent::__construct();
    }


    /**
     *
     * @param  $userId Instagram user id
     * @param  $count Instagram user id
     * @return array() a collection of recent instagram posts by user id
     */
    public function getRecentMedia($userId, $count = 6, $tags = array())
    {
        $cacheKey = md5("instagramRecent:".$userId.$count,implode(",", $tags));
        $cache = $this->retrieveCache($cacheKey, 86400);
        if(!$cache) {

            $data = array();
            $url = null;
            while (count($data) < $count) {

                if(is_null($url)) {
                    $url = 'https://api.instagram.com/v1/users/' . $userId . '/media/recent/?client_id=' . $this->clientId . '&count=' . $count;
                }
                $response = $this->httpClient->get( $url )->send();
                $response = json_decode($response->getBody(true));
                foreach($response->data as $d) {
                    if(count($data) < $count) {
                        if(count($tags) > 0) {
                            foreach ($tags as $tag) {
                              if(in_array($tag, $d->tags)) {
                                  $data[] = $d;
                                  break;
                              }
                            }
                        } else {
                            $data[] = $d;
                        }
                    } else {
                        break;
                    }
                }
                $url = $response->pagination->next_url;
            }

            $this->storeCache($cacheKey, $data);
        } else {
            $data = $cache;
        }

        return $data;

    }

    /**
    *
    * @param $data array of instagram post objects (from media API)
    * @return array() a collection of media objects decoded from the instagram api response
    */
    public function getEmbedMedia($data, $maxwidth = 525)
    {
        $shortcodes = array();
        foreach ($data as $d) {
          $shortcodes[] = $d->link;
        }
        $cacheKey = md5("instagramShortcodes:" . implode("|", $shortcodes) . $maxwidth);
        $cache = $this->retrieveCache($cacheKey);
        if(!$cache) {
            foreach ($shortcodes as $id) {
                $response = $this->httpClient->get( 'http://api.instagram.com/publicapi/oembed/?url=' . $id . '&maxwidth=' .$maxwidth )->send();
                $response = json_decode($response->getBody(true));
                $data[] = $response;
            }
            $this->storeCache($cacheKey, $data);
            return $data;
        } else {
            return $cache;
        }
    }
}
