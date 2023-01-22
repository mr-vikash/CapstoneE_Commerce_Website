
import {
    signInWithGooglePopup
    ,createUserDocumentFromAuth,
} from
 '../../utils/firebase/firebase.utils'
const SignIn = () =>
{
   
    const logGoogleUser = async ()=>
    {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

   
    return(
        <div>
             <h1>I am Sign In Page</h1>
             <button onClick={logGoogleUser}> SignIn with GooglePopup</button>
        </div>
    );
};
export default SignIn;