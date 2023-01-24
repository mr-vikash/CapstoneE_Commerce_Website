import { useState } from 'react'
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  SignInAuthUserWithEmailAndPassword, 
} from '../../utils/firebase/firebase.utils'
import Button from '../button/button.component'
import FormInput from '../form-input/form-input.component'

import './sign-in-form.styles.scss'

const defaultFormFields = {
  email: '',
  password: '',
}
const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const {  email, password } = formFields

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await SignInAuthUserWithEmailAndPassword(email,password);
      console.log(response);
      resetFormFields()
    } catch (error) {
     
    }
  }

   const signInWithGoogle = async ()=>
    {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }
  console.log(formFields)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }
  return (
    <div className='sign-up-form-container'>
      <h2>Already have an account have an account?</h2>
      <span>Sign In with email and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput
          label='Email'
          type="email"
          name="email"
          onChange={handleChange}
          value={email}
          required
        />

        <FormInput
          label='Password'
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
          required
        />
        <div className='buttons-container'>
          <Button  type='submit' >Sign In</Button>
         <Button  onChange={signInWithGoogle} buttontype='google'>Google SignIn</Button>
        </div>
      </form>
    </div>
  )
}
export default SignInForm;
