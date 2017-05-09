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
