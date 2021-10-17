import React from 'react';
import { Recipe,Ingredient } from './MainPage';
import { BrowserRouter,
    Redirect,
    Switch,
    NavLink,
    Link,
    Route } 
from 'react-router-dom';
import styled from 'styled-components'

const Img = styled.img`
    height: 200px;
    width: auto;
`

const Button = styled.button`
width: auto;
    border-color: #28a745;
    font-size: 1rem;
    padding: 8px  12px;
    border-radius: 4px;
    &:hover{
       cursor: pointer;
    }
    margin-bottom:6px;
    border: none;
`

interface IRecipeDetail {
    onAddToShoppingCart:(ingredient:any)=>void
    onDelete:(index: string) => void;
    recipes: Recipe[];
    history: any;
    match:any
}


export default  function  RecipeDetail(props:IRecipeDetail){
    const index =  props?.match?.params?.recipeId
    console.log('a',index)
    const clickedRecipe = props.recipes?.find(recipe => {
        return recipe.Id === index
    }
)
    const needDelete = ()=>{
        props.onDelete(index)
    }
    const addToShoppingCart = ()=>{
        props.onAddToShoppingCart(clickedRecipe?.Ingredients)
        props.history.push('/shopping-list');
    }

    return (
        <>
            <h1>{clickedRecipe?.Name}</h1>
            <Img src={`${clickedRecipe?.imageUrl}`} alt="recipe" />
            <div>
                <Button onClick={addToShoppingCart}>Add to shopping list</Button>
                <Button >
                    <NavLink to={`/recipes/edit/${clickedRecipe?.Id}`} >Edit Recipe</NavLink>
                </Button>
                <Button onClick={needDelete}>Delete Recipe</Button>
            </div>
            <p>{clickedRecipe?.Description}</p>

        </>
    )
}

