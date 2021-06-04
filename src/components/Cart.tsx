import React from 'react'
import CartItem from './CartItem'
import { Wrapper } from '../styles/Cart.style'
import { CartItemType } from '../App'

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem:CartItemType) => void;
    removeFromCart: (itemId:number) => void;
}

const Cart:React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
    return (
        <Wrapper>
            <h2>Your Shopping Cart:</h2>
            {cartItems.length === 0 ? 
            <p>No items here...</p> 
            : 
            <>
                {cartItems.map(item => <CartItem 
                key={item.id}
                item={item}
                addToCart={addToCart}
                removeFromCart={removeFromCart}/>)}
            </>}
        </Wrapper>
    )
}

export default Cart
