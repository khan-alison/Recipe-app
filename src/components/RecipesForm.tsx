import React from 'react';
import { Formik, Form, Field,FieldArray,ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components'
import { NavLink } from 'react-router-dom';
import { Recipe } from './MainPage';


const Label = styled.label`

display: inline-block;
margin-bottom: .5rem;
margin-top: .8rem;
`
const SaveButton = styled.button`
    color: #fff;
    background-color: #28a745;
    border-color: #28a745;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    text-align: center;
    vertical-align: middle;
    display: inline-block;
    &:disabled {
        background-color: #80C688 !important;
      }
    &:hover {
        cursor: pointer;
    }
    margin-right: 10px;
`

const CancelButton = styled.button`
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    text-align: center;
    vertical-align: middle;
    display: inline-block;
    &:hover {
        cursor: pointer;
    }
`

const Ingredients = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-right: -5px;
    margin-left: -5px;
    box-sizing: border-box;
    margin-top:20px;
`

const NameInput = styled.div`
    width:360px;
    margin:0 5px 0 5px;
`

const AmountInput = styled.div`
   width:120px;
   margin:0 5px 0 5px;
`

const DeleteDiv = styled.div`
    height: 40px;
    margin-left:20px;
`
  
const DeleteButton = styled.button`
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
    border: 1px solid transparent;
    padding: .46rem 1.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    text-align: center;
    vertical-align: middle;
    display: inline-block;
    &:hover {
      cursor: pointer;
    }
`

const AddNewButton = styled.button`
    color: #fff;
    background-color: #28a745;
    border-color: #28a745;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    text-align: center;
    vertical-align: middle;
    display: inline-block;
    margin-top: .5rem;
    &:hover {
      cursor: pointer;
  }
`



interface IRecipesForm{
  onUpdate?:(recipe: Recipe) => void;
  onAddingRecipe?: (recipe: Recipe) => void;
  allRecipes?: Recipe[];
  history:any ;
  match:any
}

export default function RecipesForm (props:IRecipesForm) {
    const SignupSchema = Yup.object().shape({
        Name: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Required'),
        imageUrl: Yup.string().url()
        .required('Please enter website'),
        Description: Yup.string().min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
        Ingredients: Yup.array()
        .of(
          Yup.object({
            name: Yup.string().required("Ingredient name is required."),
            amount: Yup.number()
              .required("Ingredient amount is required.")
              .min(1, "At least 1 unit is required.")
              .integer("Ingredient amount must be an integer."),
          }).defined()
     )
      });
      const recipeId = props?.match?.params?.recipeId;
      const ingredient = {Name:'',Amount:0}
      const initialValues = {
        Id:`${(Math.random())}`,
        Name: '',
        imageUrl: '',
        Description: '',
        Ingredients: [],
      }
      const recipeToEdit = props.allRecipes?.find(
        (recipe) => recipe.Id === recipeId
      );
    return (
        <div>
        <Formik
          initialValues={recipeToEdit ?? initialValues}
          validationSchema={SignupSchema}
          onSubmit={(values:Recipe, actions) => {
            if( props.onUpdate){
              props.onUpdate(values)
            }
            else if(props.onAddingRecipe){
            props.onAddingRecipe(values);
            }
            props.history.push("/recipes")
          }}
        >
          {({ errors, touched,values, dirty, isValid  }) => (
            <Form>
                 <SaveButton type="submit" disabled={!(dirty && isValid)} >save</SaveButton>
                 <NavLink to='/recipes'><CancelButton>cancel</CancelButton></NavLink>
                <div>
                    <Label htmlFor="Name">Name</Label>
                    <div><Field
                        className='form-control'
                        name="Name" 
                        id='Name'/>
                        {errors.Name && touched.Name ? (<div className='error'>{errors.Name}</div>) : null}</div>
                </div>
                <div>
                    <Label htmlFor="imageUrl">imageUrl</Label>
                    <div><Field
                        className='form-control' 
                        name="imageUrl" 
                        id='imageUrl'/>
                    {errors.imageUrl && touched.imageUrl ? (<div className='error'>{errors.imageUrl}</div>) : null}
                    </div>
                </div>
                <div>
                    <Label htmlFor="Description">Description</Label>
                    <div><Field
                        className='form-control des'
                        rows='2' 
                        name="Description" 
                        id="Description"
                        as="textarea"/>{
                        }
                    {errors.Description && touched.Description ? <div className='error'>{errors.Description}</div> : null}</div>
                </div>
                   <hr />
                <div>
                    <div>
                        <FieldArray name='Ingredients'>
                          {({push,remove})=>(
                            <>
                              {values.Ingredients.map((_,index)=>(
                                <Ingredients>
                                    <NameInput>
                                      <div>
                                        <Field name={`Ingredients[${index}].name`} 
                                                id='name'
                                                className='form-control' />
                                      </div>
                                      <div className='error-message' ><ErrorMessage name={`Ingredients[${index}].name`}/></div>
                                    </NameInput>
                                  <AmountInput>
                                    <div>
                                      <Field name={`Ingredients[${index}].amount`} 
                                            type="number" 
                                            id="amount"
                                            className='form-control' />
                                    </div>
                                    <div className='error-message' ><ErrorMessage name={`Ingredients[${index}].amount` }/></div>
                                  </AmountInput>
                                  <DeleteDiv>
                                    <DeleteButton onClick={()=>{remove(index)}}> x</DeleteButton>
                                  </DeleteDiv>
                                </Ingredients>
                              ))}
                                <AddNewButton onClick={()=>{
                                  push(ingredient)}}>Add ingredient</AddNewButton>
                            </>
                          )}
                        </FieldArray>
                    </div>
                      <pre>{JSON.stringify({values,errors},null,4)}</pre>
                </div>
                {/* <InviteFriends/> */}
            </Form>
          )}
        </Formik>
      </div>
    )
}