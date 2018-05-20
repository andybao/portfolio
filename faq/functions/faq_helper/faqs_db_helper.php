<?php
require_once 'db_value.php';
require_once 'db_admin.php';
//require_once '../../../../../database.php';
require_once($_SERVER['DOCUMENT_ROOT'] . '/../database.php');




class FaqsDbHelper {
    const FAQS_TABLE = 'faqs';
    const FAQS_ID_COLUMN = 'id';
    const FAQS_TITLE_COLUMN = 'faq_title';
    const FAQS_INFO_COLUMN = 'faq_info';

    const EMPTY_WARNING_MSG = ' cannot be empty';
    const DUPLICATE_WARNING_MSG = 'faq is duplicated';

    private $db;
    private $condition_id_value;

    public function __construct() {
        $database = Database::getDb();
        $this->db = new DatabaseAdmin($database);
        $this->condition_id_value = new DbValue(self::FAQS_TABLE, self::FAQS_ID_COLUMN, PDO::PARAM_INT);
    }

    public function queryFaqs() {
        $this->condition_id_value->setValue(null);
        $faqs = $this->db->query($this->condition_id_value);
        return $faqs;
    }

    public function queryFaqById($id) {
        $this->condition_id_value->setValue($id);
        $faq = $this->db->query($this->condition_id_value);
        return $faq[0];
    }

    public function insertOneFaq($f) {

        $title_text = trim($f->getTitle());
        $info_text = trim($f->getInfo());

        if (empty($title_text)) {
            $result = self::FAQS_TITLE_COLUMN . self::EMPTY_WARNING_MSG;
        }
        elseif (empty($info_text)) {
            $result = self::FAQS_INFO_COLUMN . self::EMPTY_WARNING_MSG;
        }
        else {
            $title_value = new DbValue(self::FAQS_TABLE, self::FAQS_TITLE_COLUMN, PDO::PARAM_STR, $title_text);
            $info_value = new DbValue(self::FAQS_TABLE, self::FAQS_INFO_COLUMN, PDO::PARAM_STR, $info_text);
            $value_array = array($title_value, $info_value);
            $result = $this->db->insert($value_array);
        }

        return $result;
    }

    public function updateOneFaq($f) {

        $title_text = trim($f->getTitle());
        $info_text = trim($f->getInfo());

        if (empty($title_text)) {
            $result = self::FAQS_TITLE_COLUMN . self::EMPTY_WARNING_MSG;
        }
        elseif (empty($info_text)) {
            $result = self::FAQS_INFO_COLUMN . self::EMPTY_WARNING_MSG;
        }
        else {
            $id = $f->getId();
            $current_faq = $this->queryFaqById($id);

            if ($title_text == $current_faq[self::FAQS_TITLE_COLUMN] && $info_text == $current_faq[self::FAQS_INFO_COLUMN]) {
                $result = self::DUPLICATE_WARNING_MSG;
            }
            else {
                if ($title_text != $current_faq[self::FAQS_TITLE_COLUMN]) {
                    $update_value = new DbValue(self::FAQS_TABLE, self::FAQS_TITLE_COLUMN, PDO::PARAM_STR, $title_text);
                    $this->condition_id_value->setValue($id);
                    $result = $this->db->update($update_value, $this->condition_id_value);
                }
                if ($info_text != $current_faq[self::FAQS_INFO_COLUMN]) {
                    $update_value = new DbValue(self::FAQS_TABLE, self::FAQS_INFO_COLUMN, PDO::PARAM_STR, $info_text);
                    $this->condition_id_value->setValue($id);
                    $result = $this->db->update($update_value, $this->condition_id_value);
                }
            }
        }

        return $result;
    }

    public function deleteOneFaq($f) {
        $this->condition_id_value->setValue($f->getId());
        $result = $this->db->delete($this->condition_id_value);

        return $result;
    }
}

//$helper = new FaqsDbHelper();

//require_once ('faq.php');
//$f = new faq(7, 'Title - Demo update', 'Info - Demo');

//$helper->queryFaqById(3);
//$result = $helper->queryFaqs();
//$helper->insertOneFaq($f);
//$helper->updateOneFaq($f);
//$helper->deleteOneFaq($f);

//print_r($result);
//print_r(PHP_EOL);
?>