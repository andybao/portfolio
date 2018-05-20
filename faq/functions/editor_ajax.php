<?php
/**
 * Created by andybao [wenyu.bao@gmail.com]
 * Date: 2018-04-14
 * Time: 8:43 AM
 */

$doc = new DOMDocument();
$doc->loadHTMLFile('../html/editor.html');

if (isset($_POST['info'])) {
    $doc->getElementById('editor')->nodeValue = $_POST['info'];

}

echo $doc->saveHTML();