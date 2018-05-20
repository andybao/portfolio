<?php
/**
 * Created by andybao [wenyu.bao@gmail.com]
 * Date: 2018-04-10
 * Time: 7:46 PM
 */

class editor {

    private $doc;

    public function __construct()
    {
        $this->doc = new DOMDocument();
        $this->doc->loadHTMLFile('../html/editor.html');
    }

    public function displayEditor() {
        echo $this->doc->saveHTML();
    }
}
