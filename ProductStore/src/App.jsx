import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { AddToCart, fetchProducts, RemoveFromCart } from './ProductSlice';

const App = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productList.products)
  const cart = useSelector((state) => state.productList.cart)

  const total = cart.reduce((sum, item) => {
    return sum + item.price;
  },0)

  const discount = cart.reduce((sum, item) => {
    return sum + (item.price > 20 ? item.price - 5 : 0)
  }, 0)

  const pay = () => {
    return total - discount;
  }

  useEffect(() => {
      dispatch(fetchProducts());
  },[])



  return (
    <div>
      <div>
      {product.map((p) => (
        <div key={p.id}>
          <h3>{p.title}</h3>
          <p>Price : ${p.price}</p>
          <img
              src={p.image}
              alt={p.title}
              width="150" 
          />
          <p>{p.description}</p>
          <button onClick={() => dispatch(AddToCart(p.id))}>Add To Cart</button>
          <button onClick={() => dispatch(RemoveFromCart(p.id))}>Remove From Cart</button>
        </div>
      ))}
      </div>

      <div>
        <h2>Cart Items</h2>
        {cart.map((c) => (
          <div key={c.id}>
            <h3>{c.title}</h3>
            <p>Price : ${c.price}</p>
            <img
                src={c.image} 
                alt={c.title}
                width="150"
            />
          </div>
        ))}
      </div>

      <div>
        <h2>Bill Details</h2>
        <table border="2">
          <tr>
            <th>Total</th>
            <th>$ {total}</th>
          </tr>
          <tr>
            <th>Tax</th>
            <th>5.23</th>
          </tr>
          <tr>
            <th>Discount</th>
            <th>${discount}</th>
          </tr>
          <tr>
            <th>Amount To Pay</th>
            <th>$ {pay()}</th>
          </tr>
        </table>
        <p>Thanks for shopping In Mysore Palace</p>

      </div>
    </div>
  )
}

export default App;