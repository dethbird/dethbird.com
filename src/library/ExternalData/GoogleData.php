<?php
require_once("Base.php");

class GoogleData extends ExternalDataBase {

    private $client;

    /**
     * Constructor.
     * @param string $applicationName name of the application.
     * @param string $authConfigFile  file location for the config json file.
     */
    public function __construct($applicationName, $authConfigFile)
    {
        $this->client = new Google_Client();
        $this->client->setApplicationName("LikeDrop");
        $this->client->setAuthConfigFile($authConfigFile);
        $this->client->addScope(Google_Service_Drive::DRIVE);
        $this->client->addScope(Google_Service_YouTube::YOUTUBE);
        $this->client->addScope(Google_Service_YouTube::YOUTUBE_READONLY);
        $this->client->setAccessType('offline');
        $this->client->setApprovalPrompt('force');
    }

    /**
     * Get the auth screen url
     * @return string the auth url
     */
    public function createAuthUrl()
    {
        return $this->client->createAuthUrl();
    }

    /**
     * Fetch an access token
     * @param  string $code The code GET param from the redirect
     * @return string       json representing auth token
     */
    public function getAccessToken($code)
    {
        $this->client->authenticate($code);
        return $this->client->getAccessToken();
    }

    /**
     * Is the access token expired?
     * @return boolean
     */
    public function isAccessTokenExpired()
    {
        return $this->client->isAccessTokenExpired();
    }

    /**
     * Set the auth token
     * @param string $accessToken the json encoded auth object from Google.
     */
    public function setAccessToken($accessToken)
    {
        $this->client->setAccessToken(json_decode($accessToken, true));
    }

    /**
     * Get a new access token
     * @param  string $refreshToken Refresh token we got from the redirect
     * @return obeject               New auth token (without refresh token!)
     */
    public function refreshAccessToken($refreshToken)
    {
        $this->client->refreshToken($refreshToken);
        return $this->client->getAccessToken();
    }

    /** DRIVE **/

    /**
     * Get file list for an authenticated user
     * @link https://developers.google.com/drive/v3/reference/files/list
     *
     * @param  array  $options  options for the file list operation.
     * @return array            array of file objects as stdClass()
     */
    public function listFiles($options)
    {
        $data = [];
        $drive_service = new Google_Service_Drive($this->client);
        $files = $drive_service->files->listFiles($options);
        foreach ($files->getFiles() as $file) {
            $data[] = $file->toSimpleObject();
        }
        return $data;
    }

    /**
     * Get the full metadata for a file
     * @param  string $fileId The google file id to fetch for
     * @return object         object representing the file
     */
    public function getFile($fileId)
    {
        $drive_service = new Google_Service_Drive($this->client);
        $file = $drive_service->files->get($fileId, [
            'fields' => 'appProperties,capabilities,contentHints,createdTime,description,explicitlyTrashed,fileExtension,folderColorRgb,fullFileExtension,headRevisionId,iconLink,id,imageMediaMetadata,isAppAuthorized,kind,lastModifyingUser,md5Checksum,mimeType,modifiedByMeTime,modifiedTime,name,originalFilename,ownedByMe,owners,parents,permissions,properties,quotaBytesUsed,shared,sharedWithMeTime,sharingUser,size,spaces,starred,thumbnailLink,trashed,version,videoMediaMetadata,viewedByMe,viewedByMeTime,viewersCanCopyContent,webContentLink,webViewLink,writersCanShare'
        ]);

        $data = $file->toSimpleObject();
        $data->folder = $this->getFileFolder(null, $file);
        return $data;
    }


    /**
     * Download the Google Drive file
     * @param  string $fileId The google file id to fetch for
     * @return string         contents of the file
     */
    public function downloadFile($fileId)
    {
        $drive_service = new Google_Service_Drive($this->client);
        $response = $drive_service->files->get($fileId, ['alt' => 'media'] );
        $body = $response->getBody();
        return $body;
    }

    /**
     * Build the cache key string we will use to find and serve thumbnails
     * @param  object $fileObj simpleObject representation of file
     * @return string         cache key
     */
    public function getThumbnailCacheKey($file)
    {
        return $file->md5Checksum;
    }

    /**
     * Recursively climb up the parent folder chain
     * @param  [type] $folder the current folder
     * @param  [type] $file   Google Drive file class
     * @return [type]         another level up of the folder tree
     */
    public function getFileFolder($folder, $file)
    {
        if (count($file->getParents()) > 0){

            $drive_service = new Google_Service_Drive($this->client);

            $parents = $file->getParents();
            $parent = $parents[0];

            $file = $drive_service->files->get($parent, [
                'fields' => 'appProperties,capabilities,contentHints,createdTime,description,explicitlyTrashed,fileExtension,folderColorRgb,fullFileExtension,headRevisionId,iconLink,id,imageMediaMetadata,isAppAuthorized,kind,lastModifyingUser,md5Checksum,mimeType,modifiedByMeTime,modifiedTime,name,originalFilename,ownedByMe,owners,parents,permissions,properties,quotaBytesUsed,shared,sharedWithMeTime,sharingUser,size,spaces,starred,thumbnailLink,trashed,version,videoMediaMetadata,viewedByMe,viewedByMeTime,viewersCanCopyContent,webContentLink,webViewLink,writersCanShare'
            ]);

            $folder = "/" . $file->getName() . $folder;
            $folder = $this->getFileFolder($folder, $file);
        }
        return $folder;
    }

    /** YOUTUBE **/
    public function getYoutubeChannels($part, $options)
    {
        $youtube_service = new Google_Service_YouTube($this->client);
        $channels = $youtube_service->channels->listChannels(
            $part, $options)->getItems();
        $data = [];
        foreach($channels as $channel){
            $data[] = $channel->toSimpleObject();
        }
        return $data;
    }

    public function getYoutubePlaylistItems($part, $options)
    {
        $youtube_service = new Google_Service_YouTube($this->client);
        $result = $youtube_service->playlistItems->listPlaylistItems(
            $part, $options);
        $items = $result->getItems();
        $pageInfo = $result->getPageInfo();
        $nextPageToken = $result->nextPageToken;
        $data = [];

        while (count($data) < $pageInfo->totalResults) {
            foreach($items as $video){
                $data[] = $video->toSimpleObject();
            }
            if (count($data) < $pageInfo->totalResults) {
                $options['pageToken'] = $nextPageToken;
                $result = $youtube_service->playlistItems->listPlaylistItems(
                    $part, $options);
                $items = $result->getItems();
                $nextPageToken = $result->nextPageToken;
            }
        }

        return $data;
    }

}
