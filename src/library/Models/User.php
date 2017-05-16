<?php

class User extends ActiveRecord\Model
{
    static $table_name = 'user';

    static $before_create = ['before_create_audit'];
    static $before_save = ['before_save_audit'];

    public function before_create_audit() {
        $this->date_added = date('Y-m-d g:i:s a');
        $this->date_updated = date('Y-m-d g:i:s a');
    }

    public function before_save_audit() {
        $this->date_updated = date('Y-m-d g:i:s a');
    }

    public static function find_all_filtered($filterParams) {

        $conditions = [];
        $conditions[] = 'application_user = ?';
        $conditionValues = [];
        $conditionValues[] = 0;

        $orderByValue = 'username asc';

        foreach ($filterParams as $k => $v) {
            switch($k) {
                case 'username':
                    if(trim($v)!=='') {
                        $conditions[] = 'TRIM(UPPER(username)) LIKE CONCAT("%", ? ,"%")';
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
        $models = User::all([
            'conditions' => array_merge([implode(' AND ', $conditions)], $conditionValues),
            'order' => $orderByValue
        ]);

        return $models;
    }

}
