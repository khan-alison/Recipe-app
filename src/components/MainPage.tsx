import React,{ useState }  from 'react';
import styled from 'styled-components'
import { BrowserRouter,
        Switch,
        NavLink,
        Route } 
from 'react-router-dom';

import ShoppingList from './ShoppingList'
import RecipesForm from './RecipesForm'
import RecipesList from './RecipesList';
import  RecipeDetail  from './RecipeDetail';

const Header = styled.div`
    background-color: #f8f9fa!important;
    display:flex;
    padding: .5rem 1rem;
    position: relative;
    align-items: baseline;
    display: flex;
    padding: .6rem 1rem;
    line-height: 1.5rem
`;
const Hul = styled.ul`
    padding-left:8px;
    margin:0;
    display: flex;
    list-style: none;
    align-items: baseline;
    gap:16px;
    font-size:1rem;
`
const Hdiv = styled.div`
    align-items: center;
    display: flex;
    padding-top: .3125rem;
    padding-bottom: .3125rem;
    margin-right: 1rem;
    font-size: 1.25rem;
    line-height: inherit;
    white-space: nowrap;
`
const Container = styled.div`
    max-width: 1140px;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
`
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
    name:string;
    number:number;
  }
  
export interface Recipe {
    Id: string;
    Name: string;
    imageUrl: string;
    Description: string;
    Ingredients: Ingredient[];
  }


export  default  function MainPage (){
    const [recipes, setRecipes] = useState([] as Recipe[])
    const [ingredients,setIngredient] = useState([] as Ingredient[])

    const addRecipe = (recipe: Recipe) => {
        setRecipes([...recipes, recipe]);
      };

    const updateRecipe = (recipeUpdatedValues: Recipe) => {
        const isExists = recipes.find(
          (recipe) => {
              return recipe.Id === recipeUpdatedValues.Id
          }
        );
        if (isExists) {
            isExists.Name = recipeUpdatedValues.Name;
            isExists.imageUrl = recipeUpdatedValues.imageUrl;
            isExists.Description = recipeUpdatedValues.Description;
            isExists.Ingredients = recipeUpdatedValues.Ingredients;
          setRecipes([...recipes]);
        }
      };


      const deleteRecipe = (recipeIdToDelete: string) => {
        const index = recipes.findIndex((recipe) => recipe.Id === recipeIdToDelete);
        if (index !== -1) {
          recipes.splice(index, 1);
          setRecipes([...recipes]);
        }
      };

      const addToShoppingCart=(ingredient:any)=>{
        setIngredient([...ingredients,ingredient]);
        console.log('ingredient',ingredients);
      }
    return(
        <BrowserRouter>
            <Header>
                <Hdiv>
                    Recipe Book
                </Hdiv>
                <Hul>
                    <li>
                        <NavLink 
                            to='/recipes'
                            activeStyle={{color:'#181819'}}
                            style={{textDecoration: 'none',color:'#7C7C7D'}}>Recipes</NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to='/shopping-list'
                            activeStyle={{color:'#181819'}}
                            style={{textDecoration: 'none',color:'#7C7C7D'}}>Shopping List</NavLink>
                    </li>
                </Hul>
            </Header>
            <Container>
                    <Switch>
                        <Route path="/recipes">
                        <Row>
                            <Column>
                                <AddNewButton>
                                    <NavLink
                                        to="/recipes/create"
                                        style={{textDecoration:'none',color:'white'}}>
                                        New Recipe
                                    </NavLink>
                                </AddNewButton>
                                <hr/>
                                <Route path="/recipes">
                                    <RecipesList recipes={recipes}/>
                                </Route>
                            </Column>
                            <Column>
                                <Switch>
                                        <Route
                                        path="/recipes/edit/:recipeId"
                                        render={(routeProps) => (
                                            // If you don't want to pass route props explicitly here, use Router Hooks in the child component(s) instead
                                            <RecipesForm
                                            onUpdate={updateRecipe}
                                            allRecipes={recipes}
                                            {...routeProps} // Plugging in route props (match, location, history) to the child component(s)
                                            />
                                        )}
                                        />

                                        <Route
                                        path="/recipes/create"
                                        render={(routeProps) => (
                                            <RecipesForm
                                            onAddingRecipe={addRecipe}
                                            allRecipes={recipes}
                                            {...routeProps}
                                            />
                                        )}
                                        />

                                        <Route
                                        path="/recipes/:recipeId"
                                        render={(routeProps) => (
                                            <RecipeDetail
                                            onAddToShoppingCart={addToShoppingCart}
                                            onDelete={deleteRecipe}
                                            {...routeProps}
                                            recipes={recipes}
                                            />
                                        )}
                                        />
                                            
                                        <Route path="/recipes">
                                            <Title>Please select a Recipe!</Title>
                                        </Route>   
                                </Switch>
                            </Column>
                        </Row>
                        </Route>
                        <Route path="/shopping-list">
                            <ShoppingList ingredients={ingredients}/>
                        </Route>
                    </Switch>
            </Container>
            
        </BrowserRouter>
        
    )
}
