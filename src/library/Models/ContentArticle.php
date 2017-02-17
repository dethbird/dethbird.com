<?php

class ContentArticle extends ActiveRecord\Model
{
    static $table_name = 'content_article';

    static $before_create = array('before_create_audit');
    static $before_save = array('before_save_audit');

    public function before_create_audit() {
        if (!$this->date_added) {
            $this->date_added = date('Y-m-d g:i:s a');
        }
        if (!$this->date_published) {
            $this->date_published = date('Y-m-d g:i:s a');
        }
        $this->date_updated = date('Y-m-d g:i:s a');
    }

    public function before_save_audit() {
        $this->date_updated = date('Y-m-d g:i:s a');
    }

    public function to_json(array $options=array()) {
        $model = json_decode(parent::to_json($options));
        if ($model->user_id) {
            $user = User::find_by_id($model->user_id);
            $model->user = json_decode($user->to_json([
                'except' => ['api_key', 'password', 'email', 'read', 'write']
            ]));
        }

        $model->tags = [];
        $contentArticleTags = ContentArticleTag::find_all_by_content_article_id($model->id);
        while (list($k, $v) = each($contentArticleTags)) {
            $tag = Tag::find($v->tag_id);
            $model->tags[] = json_decode($tag->to_json());
        }

        return json_encode($model);
    }
}
