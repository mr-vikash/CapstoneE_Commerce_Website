import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { CartContext } from '../../contexts/cart.context';
import './cart-dropdown.styles.scss';

import Button from "../button/button.component";

import CartItem from "../cart-item/cart-item.component";
import CheckOut from '../../routes/checkout/checkout.component';

const CartDropdown = () =>
{
  const {cartItems} = useContext(CartContext);

  const navigate = useNavigate();


  const gotoCheckOutHandler = ()=>
  {
    navigate('/checkout');
  }
    return(
       <div className="cart-dropdown-container">
        <div className="cart-items">

          {cartItems.map((item)=>(
          <CartItem key={item.id} cartItem={item}/>
          ))}
        </div>
         <Button buttontype='inverted' onClick={gotoCheckOutHandler}>CHECKOUT</Button>
       </div>
    )
};
export default CartDropdown;