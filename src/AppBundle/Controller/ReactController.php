<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;


class ReactController extends Controller {
    
    protected function renderWithProps($view,array $props=array(),$baseUriRouteName='homepage'){

        if (strpos($view,".twig")===false)//append extension if not specified
            $view.=".html.twig";

        $serializer = $this->get('serializer');
        /**@var \Symfony\Component\HttpFoundation\RequestStack $requestStack**/
        $requestStack=$this->get('request_stack');
        $request=$requestStack->getCurrentRequest();

        $props['baseUrl'] = $this->generateUrl($baseUriRouteName);
        $props['location'] = $request->getRequestUri();

        return $this->render($view, [
            'props' => $serializer->serialize($props,'json')
        ]);
        
    }
    
    
}