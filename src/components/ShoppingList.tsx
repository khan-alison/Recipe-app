import React from 'react';
import styled from 'styled-components'
import { Formik, Form, Field, FormikProps } from "formik";
import { Ingredient } from './MainPage';

const Body = styled.div`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: left;
`

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-right: -5px;
    margin-left: -5px;
`
const Column = styled.div`
    flex: 0 0 50%;
    max-width: 50%;
    margin-bottom: 1rem;
`

const Label = styled.label`
    display: inline-block;
    margin-bottom: .5rem;
`

const Ul = styled.ul`
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    border-radius: .25rem;
`

const Li = styled.li`
    position: relative;
    display: block;
    padding: .75rem 1.25rem;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.125);
`

interface IShoppingList{
    ingredients:Ingredient[]
}


export default function ShoppingList (props:IShoppingList) {
    return (
        <Body>
            <Formik 
            initialValues={{Name:'',Value:0}}
            onSubmit={(values) => {
                //
              }}>
                  <div>
                    <Form>
                        <Row>
                        <Column>
                                <Label htmlFor="name">Name</Label>
                                <Field name="name" id="name" className="form-control" />
                        </Column>
                        <Column>
                                <Label htmlFor="amount">Amount</Label>
                                <Field
                                name="amount"
                                id="amount"
                                type="number"
                                className="form-control"
                                />
                        </Column>
                        </Row>
                        
                        <div>
                            <button>a</button>
                            <button>a</button>
                        </div>
                        <hr />
                        <Ul>
                            {props.ingredients.map((ingredient) =>{
                               console.log(ingredient.Name);
                            })}
                        </Ul>
                    </Form>
                  </div>
            </Formik>
        </Body>
    )
}