<?Php
class DatabaseAdmin {
    const DB_ERROR_MSG = 'Database error msg: ';
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function query($v) {
        $result = NULL;

        $table = $v->getTable();

        if (is_null($v->getValue())) {
            $query = "SELECT * FROM $table";
        } else {
            $column = $v->getColumn();
            $query = "SELECT * FROM $table WHERE $column = :v";
        }

        try {
            $statement = $this->db->prepare($query);

            if (!is_null($v->getValue())) {
                $value = $v->getValue();
                $type = $v->getType();
                $statement->bindValue(':v', $value, $type);
            }

            $statement->execute();

            $result = $statement->fetchAll();
        } catch (Exception $e) {
            $result = $e->getMessage();
        } finally {
            $statement->closeCursor();
        }
        return $result;
    }

    public function insert($value_array) {
        $result = NULL;

        $num_items = count($value_array);
        $i = 0;

        $table = $value_array[0]->getTable();
        $query = "INSERT INTO $table ";

        $column_list = "(";
        $value_list_alias = "(";

        foreach ($value_array as $value) {
            $column_list .= $value->getColumn();
            $value_list_alias .= ':'. $value->getColumn();
            if (++$i === $num_items) {
                $column_list .= ")";
                $value_list_alias .= ")";
            } else {
                $column_list .= ', ';
                $value_list_alias .= ', ';
            }
        }

        $query .= "$column_list VALUES $value_list_alias";

        try {
            $statement = $this->db->prepare($query);
            foreach($value_array as $value) {
                $statement->bindValue(':' . $value->getColumn(), $value->getValue(), $value->getType());
            }
            $result = $statement->execute();
        } catch (Exception $e) {
            $result = $e->getMessage();
        } finally {
            $statement->closeCursor();
        }

        return $result;
    }

    public function update($value, $condition_value) {
        $result = NULL;
        $table = $condition_value->getTable();

        $v = $value->getValue();
        $v_column = $value->getColumn();
        $v_type = $value->getType();
        $c_v = $condition_value->getValue();
        $c_column = $condition_value->getColumn();
        $c_type = $condition_value->getType();

        $query = "UPDATE $table SET $v_column = :v WHERE $c_column = :c_v";

        try {
            $statement = $this->db->prepare($query);
            $statement->bindValue(':v', $v, $v_type);
            $statement->bindValue(':c_v', $c_v, $c_type);
            $result = $statement->execute();
        } catch (Exception $e) {
            $result = $e->getMessage();
        } finally {
            $statement->closeCursor();
        }

        return $result;
    }

    public function delete($value) {
        $result = NULL;
        $table = $value->getTable();
        $column = $value->getColumn();
        $v = $value->getValue();
        $type = $value->getType();

        $query = "DELETE FROM $table WHERE $column = :v";

        try {
            $statement = $this->db->prepare($query);
            $statement->bindValue(':v', $v, $type);
            $result = $statement->execute();
        } catch (Exception $e) {
            $result = $e->getMessage();
        } finally {
            $statement->closeCursor();
        }

        return $result;
    }

    public function __destruct() {

    }
}
/*
   $dsn_data_source_name = 'mysql:host=localhost;dbname=php_db';
   $db_user_name = 'root';
   $db_pw = '';
   $db_table = 'students';
   $column_list = '';
   $value_list = "('3', '5', 'xxx yy', 'xy@gamil.com', 'web development')";
   $value_assignment = "name = 'uuu i'";
   $condition = "id = 3";

   $db = new DatabaseAdmin($dsn_data_source_name, $db_user_name, $db_pw);
   $result = $db->insert($db_table, $column_list, $value_list);
   $result = $db->update($db_table, $value_assignment, $condition);
   $result = $db->delete($db_table, $condition);
   print_r ($result . PHP_EOL);
 */
?>