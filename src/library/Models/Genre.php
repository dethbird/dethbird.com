<?php

class Genre extends ActiveRecord\Model
{
    static $table_name = 'genre';

    static $before_create = ['before_create_audit'];
    static $before_save = ['before_save_audit'];

    public function before_create_audit() {
        $this->date_created = date('Y-m-d g:i:s a');
        $this->date_updated = date('Y-m-d g:i:s a');
    }

    public function before_save_audit() {
        $this->date_updated = date('Y-m-d g:i:s a');
    }

}
