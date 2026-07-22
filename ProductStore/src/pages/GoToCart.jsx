import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RemoveFromCart } from '../ProductSlice';

const GoToCart = () => {
  
  const dispatch = useDispatch();
  const cart = useSelector(state => state.productList.cart);

  const total = cart.reduce((sum, item) => sum + item.price, 0)
  const discount = cart.reduce((sum, item) => 
      item.price > 20 ? item.price - 4 : item.price, 0
  )
  return (
    <div>
      <div>
        <h1>Cart items</h1>
        {cart.length === 0 ? (
          <h2>😢No Items Added Yet...</h2>
        ) : (
          <div>
              {cart.map((c) => (
              <div key={c.id}>
                <h3>{c.title}</h3>
                <p>Price : ${c.price}</p>
                <img 
                    src={c.image}
                    alt={c.title}
                    width="150"
                />
                <button onClick={() => dispatch(RemoveFromCart(c.id))}>Remove</button>
              </div>
              ))}
          </div>
        )} 
      </div>
      <div>
        <h2>Price Details</h2>
        <table border="1">
          <tr>price({cart.length} items) : ${total}</tr>
          <tr>Discount : -${discount}</tr>
          <tr>Total Amount : ${total - discount}</tr>
        </table>
        <button>Pay Now</button>
      </div>
      
    </div>
  )
}

export default GoToCart