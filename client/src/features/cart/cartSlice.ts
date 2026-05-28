import {createSlice} from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

import type { CartItem } from "../../types/cart.types"

interface CartState{
    cartItems : CartItem[]
}

const initialState : CartState = {
    cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]") as CartItem[]
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(
            state,
            action:PayloadAction<CartItem>
        )=>{
            const existingItem = state.cartItems.find((item)=>item._id === action.payload._id);
            if(existingItem){
                existingItem.quantity+=1;
            }
            else{
                state.cartItems.push({
                    ...action.payload,
                    quantity: 1
                });
            }
            localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
        },

        removeFromCart:(
            state,
            action:PayloadAction<string>
        )=>{
            state.cartItems = state.cartItems.filter(
                (item)=>item._id!==action.payload
            );
            localStorage.setItem(
                "cartItem",JSON.stringify(state.cartItems)
            )
        },

        increaseQuantity:(
            state,
            action:PayloadAction<string>
        )=>{
            const item =state.cartItems.find(
                (item)=>item._id===action.payload
            );
            if(item){
                item.quantity += 1
            }
        },

        decreaseQuantity: (
  state,
  action: PayloadAction<string>
) => {
  const item = state.cartItems.find(
    (item) =>
      item._id === action.payload
  );

  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      state.cartItems =
        state.cartItems.filter(
          (cartItem) =>
            cartItem._id !==
            action.payload
        );
    }
  }

  localStorage.setItem(
    "cartItems",
    JSON.stringify(state.cartItems)
  );
},
        
    }
})

export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
}=cartSlice.actions;

export default cartSlice.reducer;
