import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  friends: [
    {
      name: '',
      email: '',
    },
  ],
};
const schema = Yup.object().shape({
  friends: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().min(4, 'too short').required('Required'), // these constraints take precedence
        email: Yup.string().min(3, 'cmon').required('Required'), // these constraints take precedence
      })
    )
    .required('Must have friends') // these constraints are shown if and only if inner constraints are satisfied
    .min(3, 'Minimum of 3 friends'),
});
function InviteFriends () {

  return (
    <div>
    <h1>Invite friends</h1>
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        console.log(schema)
          console.log(values);
        console.log(actions);
      }}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="friends">
            {({ insert, remove, push }) => (
              <div>
                {values.friends.length > 0 &&
                  values.friends.map((friend, index) => (
                    
                    <div className="row" key={index}>
                      <div className="col">
                        <label htmlFor={`friends.${index}.name`}>Name</label>
                        <Field
                          name={`friends.${index}.name`}
                          placeholder="Jane Doe"
                          type="text"
                        />
                        
                        <ErrorMessage
                          name='name'
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col">
                        <label htmlFor={`friends.${index}.email`}>Email</label>
                        <Field
                          name={`friends.${index}.email`}
                          placeholder="jane@acme.com"
                          type="email"
                        />
                        <ErrorMessage
                          name={`friends.${index}.name`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col">
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => remove(index)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  className="secondary"
                  onClick={() => push({ Name: '', email: '' })}
                >
                  Add Friend
                </button>
              </div>
            )}
          </FieldArray>
          <button type="submit">Invite</button>
        </Form>
      )}
    </Formik>
  </div>
  )
}
  

export default InviteFriends
