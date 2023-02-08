import './cart-item.styles.scss'

import { UserContext } from '../../contexts/user.context';

import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';

const CartItem = ({cartItem})=>
{ 
    
    const {name,imageUrl,quantity,price} = cartItem;
    const {clearItemFromCart} = useContext(CartContext);
     
    const clearItemHandler = ()=>clearItemFromCart(cartItem);
    return(
        <div className='cart-item-container'>
            <img src={imageUrl} alt={`${name}`}/>
            <div className='item-details'>
                <span className='name'>{name}</span>
                <span className='price'>{quantity} x ${price}</span>
            </div>
        </div>
    )
}

export default CartItem;