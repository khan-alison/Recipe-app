import React from 'react';
import { NavLink } from "react-router-dom";
import { Recipe,Ingredient } from './MainPage';
import styled from 'styled-components'


interface IRecipe {
    recipes: Recipe[];
}

const ItemsList = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    border-radius: 10px;
`
const Items = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    border: 1px solid rgba(0,0,0,.125);
`

const Img = styled.img`
    height: 100px;
    width: auto;
`
const Title = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

function RecipesList (props:IRecipe){
    return(
    <ItemsList>
      {props.recipes.map((recipe) => (
        <NavLink
          key={recipe.Id}
          to={`/recipes/${recipe.Id}`}
          style={{color: '#495057',textDecoration:'none'}}
          activeStyle={{
            color: '#fff',
            backgroundColor: '#007bff',
            borderColor: '#007bff'}}
        >
          <Items  style={{}}>
          <div>
              <Img src={recipe.imageUrl} alt="Recipe" />
            </div>
            <Title>
              <h5 style={{fontSize: '30px',margin:0}}>{recipe.Name}</h5>
              <p>{recipe.Description}</p>
            </Title>
          </Items>
        </NavLink>
      ))}
    </ItemsList>
    )
}
export default RecipesList