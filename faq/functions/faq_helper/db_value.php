<?php
//This file set up a row in the db
class DbValue {
    private $table;
    private $column;
    private $value;
    private $type;

    public function __construct($ta, $c = null, $ty = null, $v = null) {
        $this->setTable($ta);
        $this->setColumn($c);
        $this->setType($ty);
        $this->setValue($v);
    }

    public function setTable($ta) {
        $this->table = $ta;
    }

    public function getTable() {
        return $this->table;
    }

    public function setColumn($c) {
        $this->column = $c;
    }

    public function getColumn() {
        return $this->column;
    }

    public function setValue($v) {
        $this->value = $v;
    }

    public function getValue() {
        return $this->value;
    }

    public function setType($t) {
        $this->type = $t;
    }

    public function getType() {
        return $this->type;
    }
}
?>