import Constants from '../constants/recipesConstants';

const Actions = {
    fetchRecipes: () => {
        return dispatch => {
            dispatch({ type: Constants.RECIPES_FETCHING });

            $.get('/api/v1/recipe.json', (data) => {
                dispatch({
                    type: Constants.RECIPES_RECEIVED,
                    recipes: data
                });
            });
        };
    },
    fetchRecipe: (slug) => {
        return dispatch => {
            dispatch({ type: Constants.RECIPE_FETCHING });

            $.get('/api/v1/recipe/'+slug+'.json', (data) => {
                dispatch({
                    type: Constants.RECIPE_RECEIVED,
                    recipe: data
                });
            });
        };
    }
}

export default Actions;
