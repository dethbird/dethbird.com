<?php

class UserPocket extends ActiveRecord\Model
{
    static $table_name = 'user_pocket';

    static $before_create = ['before_create_audit'];
    static $before_save = ['before_save_audit'];

    public function before_create_audit() {
        $this->date_added = date('Y-m-d g:i:s a');
        $this->date_updated = date('Y-m-d g:i:s a');
    }

    public function before_save_audit() {
        $this->date_updated = date('Y-m-d g:i:s a');
    }

}
