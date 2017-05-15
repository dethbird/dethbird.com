<?php

class Story extends ActiveRecord\Model
{
    static $table_name = 'story';

    static $before_create = ['before_create_audit'];
    static $after_create = ['after_create_audit'];
    static $before_save = ['before_save_audit'];
    static $after_update = ['after_update_audit'];

    public function before_create_audit() {
        $this->date_created = date('Y-m-d g:i:s a');
        $this->date_updated = date('Y-m-d g:i:s a');
    }

    public function after_create_audit() {
        $log = new StoryChangelog(
            $this->to_array(
                [
                    "except" => ['id']
                ]
            )
        );
        $log->story_id = $this->id;
        $log->type = 'create';
        $log->save();
    }

    public function after_update_audit() {
        $log = new StoryChangelog(
            $this->to_array(
                [
                    "except" => ['id']
                ]
            )
        );
        $log->story_id = $this->id;
        $log->type = 'update';
        $log->save();
    }

    public function before_save_audit() {
        $this->date_updated = date('Y-m-d g:i:s a');
    }

    public static function find_all_filtered($filterParams) {

        $conditions = [];
        $conditionValues = [];

        $orderByValue = 'name asc';

        foreach ($filterParams as $k => $v) {
            switch($k) {
                case 'created_by':
                    if($v) {
                        $conditions[] = 'created_by = ?';
                        $conditionValues[] = $v;
                    }
                    break;
                case 'name':
                    if(trim($v)!=='') {
                        $conditions[] = 'TRIM(UPPER(name)) LIKE CONCAT("%", ? ,"%")';
                        $conditionValues[] = strtoupper(trim($v));
                    }
                    break;
                case 'order_by':
                    if(trim($v)!=='') {
                        $orderByValue = $v;
                    }
                    break;

            }
        }
        $models = Story::all([
            'conditions' => array_merge([implode(' AND ', $conditions)], $conditionValues),
            'order' => $orderByValue
        ]);

        return $models;
    }

}
