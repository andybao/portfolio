<?php
/**
 * Created by andybao [wenyu.bao@gmail.com]
 * Date: 2018-04-14
 * Time: 9:02 PM
 */

class faq
{
    private $id;
    private $title;
    private $info;

    public function __construct($id = NULL, $title = NULL, $info = NULL)
    {
        $this->setId($id);
        $this->setTitle($title);
        $this->setInfo($info);
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param mixed $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * @return mixed
     */
    public function getInfo()
    {
        return $this->info;
    }

    /**
     * @param mixed $info
     */
    public function setInfo($info)
    {
        $this->info = $info;
    }


}