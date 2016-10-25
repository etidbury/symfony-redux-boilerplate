<?php

namespace AppBundle\Controller\Api;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

use FOS\RestBundle\Controller\Annotations\Get;
use FOS\RestBundle\Controller\Annotations\View;
use FOS\RestBundle\Controller\FOSRestController;

class RecipeController extends FOSRestController
{
    /**
     * 
     * Needed for client-side navigation after initial page load
     * @View()
     */
    public function cgetAction()
    {
        return $this->get('recipe.manager')->findAll()->recipes;
    }

    /**
     * 
     * @Get("/{slug}", name="api_recipe")
     *
     * @View()
     * Needed for client-side navigation after initial page load
     */
    public function getAction($slug)
    {
    
        return $this->get('recipe.manager')->findOneBySlug($slug);
    }
}
