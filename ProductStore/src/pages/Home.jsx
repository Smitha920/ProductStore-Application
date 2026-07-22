import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AddToCart, RemoveFromCart, fetchProducts } from '../ProductSlice'

const Home = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector(state => state.productList.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [])

  return (
    <div>
      <button style={{display: "flex", justifyContent: "end", gap: "10"}} onClick={() => navigate("/cart")}>Go To Cart</button>
      <div>
        {product.map((p) => (
          <div key={p.id}>
            <h3>{p.title}</h3>
            <p>Price : ${p.price}</p>
            <img
                src={p.image}
                alt = {p.title}
                width="150"
            />
            <p>{p.description}</p>
            <button onClick={() => dispatch(AddToCart(p.id))}>Add To Cart</button>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default Home