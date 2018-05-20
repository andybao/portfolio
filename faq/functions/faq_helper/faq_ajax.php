<?php
/**
 * Created by andybao [wenyu.bao@gmail.com]
 * Date: 2018-04-16
 * Time: 9:52 PM
 */
require_once 'faqs_db_helper.php';
require_once 'faq.php';

$helper = new FaqsDbHelper();
$faqs = $helper->queryFaqs();
$return_value = $faqs;

if (isset($_POST['request'])) {

    $return_value = array();
    foreach ($faqs as $faq) {
        array_push($return_value, $faq[$_POST['request']]);
    }
}

if (isset($_POST['faq'])) {
    $f = json_decode(stripcslashes($_POST['faq']), true);
    if ($f['action'] == 'create') {
        $faq = new faq(null, $f['faq_title'], $f['faq_info']);
        $return_value = $helper->insertOneFaq($faq);
    }
    if ($f['action'] == 'update') {
        $faq = new faq($f['id'], $f['faq_title'], $f['faq_info']);
        $return_value = $helper->updateOneFaq($faq);
    }
    if ($f['action'] == 'delete') {
        $faq = new faq($f['id']);
        $return_value = $helper->deleteOneFaq($faq);
    }
}

if (isset($_POST['id'])) {
    $return_value = $helper->queryFaqById($_POST['id']);
}

$id_json = json_encode($return_value);
header('Content-Type: application/json');

echo $id_json;