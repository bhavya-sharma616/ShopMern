import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import API from "../api/axios";
import {decreaseQuantity, increaseQuantity, removeFromCart} from "../features/cart/cartSlice"

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks"

const CartPage = ()=>{
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const cartItems = useAppSelector((state)=>state.cart.cartItems);

    useEffect(() => {
  const validateCart =
    async () => {
      for (const item of cartItems) {
        try {
          await API.get(
            `/products/${item._id}`
          );
        } catch (error) {
          dispatch(
            removeFromCart(
              item._id
            )
          );
        }
      }
    };

  validateCart();
}, []);


    return (
  <div className="max-w-6xl mx-auto p-6">
    <h1 className="text-4xl font-bold mb-8">
      Shopping Cart
    </h1>

    {cartItems.length === 0 ? (
      <div className="text-center mt-20">
        <p className="text-2xl font-semibold">
          Your cart is empty
        </p>

        <p className="text-gray-500 mt-2">
          Add products to continue shopping
        </p>
        <br/><br/>

        <button onClick={
          () => navigate("/")
        }
        className="
        bg-black text-white
        py-3 px-3 rounded
        hover:bg-gray-800
        transition
      ">Shop Now</button>
      </div>
    ) : (
      <div className="grid md:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="md:col-span-2 flex flex-col gap-5">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="
                flex gap-5 items-center
                border rounded-xl p-5 bg-white
                hover:shadow-xl
                transition duration-300
              "
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-32 h-32 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h2 className="text-xl font-bold">
                  {item.title}
                </h2>

                <p className="text-gray-500 mt-1">
                  {item.category}
                </p>

                <p className="text-2xl font-bold mt-3">
                  &#x20B9;{item.price}
                </p>

                <p className="mt-2">
                  {item.stock > 0
                    ? "In Stock"
                    : "Out of Stock"}
                </p>
              </div>

              {/* QUANTITY */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      dispatch(
                        decreaseQuantity(
                          item._id
                        )
                      )
                    }
                    className="
                      bg-gray-200 px-3 py-1 rounded
                      hover:bg-gray-300
                      active:scale-95
                      transition
                    "
                  >
                    -
                  </button>

                  <span className="font-bold text-lg">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      dispatch(
                        increaseQuantity(
                          item._id
                        )
                      )
                    }
                    className="
                      bg-gray-200 px-3 py-1 rounded
                      hover:bg-gray-300
                      active:scale-95
                      transition
                    "
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() =>
                    dispatch(
                      removeFromCart(
                        item._id
                      )
                    )
                  }
                  className="
                    bg-red-500 text-white
                    px-4 py-2 rounded
                    hover:bg-red-600
                    hover:scale-105
                    active:scale-95
                    transition duration-200
                  "
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="border rounded-xl p-6 h-fit bg-white shadow-md">
          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="flex justify-between mb-4">
            <span>Total Items</span>

            <span>
              {cartItems.reduce(
                (acc, item) =>
                  acc + item.quantity,
                0
              )}
            </span>
          </div>

          <div className="flex justify-between mb-6">
            <span>Total Price</span>

            <span className="font-bold text-xl">
              &#x20B9;
              {cartItems.reduce(
                (acc, item) =>
                  acc +
                  item.price *
                    item.quantity,
                0
              )}
            </span>
          </div>

          <button
            className="
              w-full bg-black text-white
              py-3 rounded-lg
              hover:bg-gray-800
              hover:scale-105
              active:scale-95
              transition duration-200
            "
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    )}
  </div>
);
}

export default CartPage;