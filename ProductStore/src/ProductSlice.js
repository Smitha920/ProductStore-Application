import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    products : [],
    cart: [],
    loading: false,
    error: null
}
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        const res = fetch("https://fakestoreapi.com/products?utm_source=chatgpt.com")
        return (await res).json();
    }
)
const ProductSlice = createSlice({
    name: "productList",
    initialState,
    reducers : {
        AddToCart: (state, action) =>{
            const product = state.products.find((p) => p.id === action.payload);
            if(product) {
                state.cart.push(product);
            }
        },
        RemoveFromCart: (state, action) => {
            state.cart = state.cart.filter((product) => product.id !== action.payload)
        }

    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
        })
        .addCase(fetchProducts.rejected, (state) => {
            state.error = "Failed to fetch..."
        })

    }
})
export const {AddToCart, RemoveFromCart} = ProductSlice.actions;
export default ProductSlice.reducer;