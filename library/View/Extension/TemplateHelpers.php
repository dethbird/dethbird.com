<?php 

class TemplateHelpers extends \Twig_Extension
{
    public function getFilters()
    {
        return array(
            new \Twig_SimpleFilter('resizeImage', array($this, 'resizeImage')),
            new \Twig_SimpleFilter('date_format', array($this, 'date_format')),
            new \Twig_SimpleFilter('print_r', array($this, 'print_r')),
            new \Twig_SimpleFilter('json_encode', array($this, 'json_encode')),
            new \Twig_SimpleFilter('strip_tags', array($this, 'strip_tags')),
            new \Twig_SimpleFilter('image_path_from_upc', array($this, 'image_path_from_upc'))
        );
    }
    public function date_format($date, $format = "F j, Y g:i:a")
    {
        // echo $date; die();
        return date($format, strtotime($date));
    }
    public function image_path_from_upc($upc)
    {
        $path = "/release/large_cover/" . substr($upc, 0, 6) . "/" . substr($upc, 6, 3) . "/" . $upc . ".jpg";
        return $path;
    }
    public function print_r($output)
    {
        return print_r($output,1);
    }
    public function strip_tags($html)
    {
        return strip_tags($html);
    }   
    public function json_encode($output)
    {
        return json_encode($output);
    }
    public function getName()
    {
        return 'template_helpers';
    }
}