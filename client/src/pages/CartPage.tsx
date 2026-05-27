import {decreaseQuantity, increaseQuantity, removeFromCart} from "../features/cart/cartSlice"

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks"

const CartPage = ()=>{
    const dispatch = useAppDispatch();

    const cartItems = useAppSelector((state)=>state.cart.cartItems);

    return(
        <div className= "p-18">
            <h1 className="text-3xl font-bold mb-8">Cart</h1>

            {cartItems.length === 0 ?(
                <p>Your cart is empty</p>
            ):(
                <div className="flex flex-col gap-5">
                    {cartItems.map((item)=>(
                        <div
                            key = {item._id}
                            className = "border p-5 flex justify-between"
                        >
                            <div>
                                <h2 className="font-bold">{item.title}</h2>
                                <p>Price: ${item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={()=>dispatch(increaseQuantity(item._id))}>+</button>
                                <button
                                    onClick={()=>dispatch(decreaseQuantity(item._id))}>-</button>
                                <button
                                    onClick={()=>dispatch(removeFromCart(item._id))}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CartPage;