<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class RecipeController extends ReactController
{
    /**
     * @Route("/", name="homepage")
     */
    public function homeAction()
    {
        
        return $this->renderWithProps('recipe/home',['recipes' => $this->get('recipe.manager')->findAll()->recipes]);

    }
    
    /**
     * @Route("/recipe/{slug}", name="recipe")
     */
    public function recipeAction($slug)
    {
        if (!$recipe = $this->get('recipe.manager')->findOneBySlug($slug)) {
            throw $this->createNotFoundException('The recipe does not exist');
        }

        return $this->renderWithProps('recipe/recipe',['recipe'=>$this->get('recipe.manager')->findOneBySlug($slug)]);

    }

 
}
