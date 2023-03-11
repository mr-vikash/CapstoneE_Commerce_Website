import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";

import Button,{BUTTON_TYPE_CLASSES} from "../button/button.component";

import { PaymentFormContainer,FormContainer } from "./payment-form.styles";

const PaymentForm = ()=>
{
    const stripe = useStripe();
    const elements = useElements();

    const paymentHandler = async (e) =>
    {
       e.preventDefault();
       
       if(!stripe || !elements)
       {
        return;
       }

       const response = await fetch('/.netlify/funtions/create-payment-intent',{
        method:'post',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({amount:10000})
       }).then(res=>res.json());

       const {paymentIntent: {client_secret},  } = response;
       console.log(client_secret)

       const paymentResult = await stripe.confirmCardPayment(client_secret,{
        payment_method:{
            card: elements.getElement(CardElement),
            billing_details:{
                name:'Vikash Gupta'
            }
        }
       });
       if(paymentResult.error)
       {
        alert(paymentResult.error);
       }else{
        if (paymentResult.paymentIntent.status === 'succeeded') {
            alert('Payment Successful!');
          }
       }
    }

    return(
       < PaymentFormContainer>
       <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
         <CardElement/>
        <Button buttontype={BUTTON_TYPE_CLASSES.inverted}>pay now </Button>
       </FormContainer>
        </PaymentFormContainer>
    )
}
export default PaymentForm;