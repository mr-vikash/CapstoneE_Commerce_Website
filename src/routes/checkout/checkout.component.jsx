import { connectFirestoreEmulator } from 'firebase/firestore';
import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';


import './checkout.styles.scss';
const CheckOut = () => {
    const { cartItems,addItemToCart,removeItemToCart } = useContext(CartContext);;
    return (
        <div>
            <h1>I am checkout</h1>
            <div key={cartItems.id}>
                {cartItems.map((cartItem) => {
                    const { id, name, quantity } = cartItem;
                    return (
                        <div key={id}>
                            <h2>{name}</h2>
                            <span>{quantity}</span>
                            <br/>
                            <span onClick={()=>removeItemToCart(cartItem)}>decrement</span>
                            <br/>
                            <span onClick={()=> addItemToCart(cartItem)}>increment</span>
                        </div>
                    )
                })}
            </div>

        </div>
    );


};
export default CheckOut;