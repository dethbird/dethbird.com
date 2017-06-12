<?php

class Project extends ActiveRecord\Model
{
    static $table_name = 'project';

    static $before_create = ['before_create_audit'];
    static $after_create = ['after_create_audit'];
    static $before_save = ['before_save_audit'];
    static $after_update = ['after_update_audit'];

    public function before_create_audit() {
        $this->date_created = date('Y-m-d g:i:s a');
        $this->date_updated = date('Y-m-d g:i:s a');
    }

    public function after_create_audit() {
        $log = new ProjectChangelog(
            $this->to_array(
                [
                    "except" => ['id']
                ]
            )
        );
        $log->project_id = $this->id;
        $log->type = 'create';
        $log->save();
    }

    public function after_update_audit() {
        $log = new ProjectChangelog(
            $this->to_array(
                [
                    "except" => ['id']
                ]
            )
        );
        $log->project_id = $this->id;
        $log->type = 'update';
        $log->save();
    }

    public function before_save_audit() {
        $this->date_updated = date('Y-m-d g:i:s a');
    }

    public static function find_all_filtered($filterParams) {

        $conditions = [];
        $conditionValues = [];

        $orderByValue = 'title asc';

        foreach ($filterParams as $k => $v) {
            switch($k) {
                case 'created_by':
                    if($v) {
                        $conditions[] = 'created_by = ?';
                        $conditionValues[] = $v;
                    }
                    break;
                case 'title':
                    if(trim($v)!=='') {
                        $conditions[] = 'TRIM(UPPER(title)) LIKE CONCAT("%", ? ,"%")';
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
        $models = Project::all([
            'conditions' => array_merge([implode(' AND ', $conditions)], $conditionValues),
            'order' => $orderByValue
        ]);

        return $models;
    }

    public function to_hydrated_array() {

        $_model = $this->to_array();

        # stories
        $stories = Story::find_all_by_project_id($this->id);
        $_arr_stories = [];
        foreach($stories as $story) {
            $_s = $story->to_array();
            $_arr_stories[] = $_s;
        }
        $_model['stories'] = $_arr_stories;

        # genres
        $projectSubgenres = ProjectSubgenre::find_all_by_project_id($this->id);
        $_projectSubgenres = [];
        foreach($projectSubgenres as $ps) {

            $subgenre = Subgenre::find_by_id($ps->subgenre_id);
            $genre = Genre::find_by_id($subgenre->genre_id);

            $_subgenre = $subgenre->to_array();
            $_subgenre['genre'] = $genre->to_array();

            $_projectSubgenres[] = $_subgenre;
        }
        $_model['subgenres'] = $_projectSubgenres;

        return $_model;

    }

}
