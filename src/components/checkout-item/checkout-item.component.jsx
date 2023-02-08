import './checkout-item.styles.scss'

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CheckOutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const { clearItemFromCart, addItemToCart, removeItemToCart } = useContext(CartContext);
    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemToCart(cartItem);

    const clearItemHandler = () => clearItemFromCart(cartItem);
    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div onClick={removeItemHandler} className='arrow'>
                   <span> &#10094;</span>
                </div>
                <span className='value'>
                    {quantity}
                </span>
                <div onClick={addItemHandler} className='arrow'>
                   <span> &#10095;</span>
                </div>
            </span>
            <span className='price'>${price}</span>
            <div className='remove-button' onClick={clearItemHandler} >&#10005;</div>
        </div>
    )
}

export default CheckOutItem;