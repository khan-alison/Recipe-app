import React, { useState } from 'react';
import styled from 'styled-components'
import { BrowserRouter,
        Redirect,
        Switch,
        NavLink,
        Route } 
from 'react-router-dom';

import RecipesForm from './RecipesForm'
import RecipesList from './RecipesList';
import RecipeDetail from './RecipeDetail';

const AddNewButton = styled.button`
    width: auto;
    color: #fff;
    background-color: #28a745;
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

const Row = styled.div`
    display: flex;
    margin-right: -15px;
    margin-left: -15px;
    padding:10px 0
`


const Column = styled.div`
    flex: 0 0 50%;
    max-width: 50%;
    position: relative;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
`
const Title = styled.h1`
    font-size: 2.5rem;
    margin:0;
`

export interface Ingredient {
    Name: string;
    Amount: number;
  }
  
export interface Recipe {
    Id: string;
    Name: string;
    imageUrl: string;
    Description: string;
    Ingredients: Ingredient[];
  }



export default function Recipes () {
    const [recipes, setRecipes] = useState([] as Recipe[])

    const addRecipe = (recipe: Recipe) => {
        setRecipes([...recipes, recipe]);
      };
    return (
        <BrowserRouter>
            
        </BrowserRouter>
    )
}