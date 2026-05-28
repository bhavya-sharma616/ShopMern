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
  <div
    className="
      min-h-screen
      bg-slate-50
      px-4
      sm:px-6
      lg:px-8
      py-10
    "
  >
    <div className="max-w-7xl mx-auto">
      <div className="mb-10">
        <p
          className="
            uppercase
            tracking-[0.25em]
            text-xs
            font-medium
            text-slate-400
            mb-3
          "
        >
          Shopping Cart
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div
          className="
            bg-white
            rounded-xl
            border border-slate-100
            shadow-sm
            p-12 md:p-16
            text-center
          "
        >
          <h2
            className="
              text-3xl
              md:text-4xl
              font-semibold
              tracking-tight
              text-slate-900
            "
          >
            Your Cart is Empty
          </h2>

          <button
            onClick={() =>
              navigate("/")
            }
            className="
              mt-8
              bg-slate-900
              text-white
              px-7 py-3.5
              rounded-lg
              text-sm
              font-medium
              shadow-md
              hover:bg-slate-800
              hover:shadow-lg
              hover:scale-[1.02]
              active:scale-95
              transition duration-300
            "
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div
          className="
            grid
            lg:grid-cols-3
            gap-8
          "
        >

          <div
            className="
              lg:col-span-2
              flex flex-col
              gap-6
            "
          >
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="
                  bg-white
                  rounded-xl
                  border border-slate-100
                  shadow-sm
                  hover:shadow-lg
                  transition duration-300
                  p-5 md:p-6
                  flex flex-col
                  md:flex-row
                  gap-6
                "
              >

                <div
                  className="
                    overflow-hidden
                    rounded-2xl
                    bg-slate-100
                    shrink-0
                  "
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="
                      w-full
                      md:w-40
                      h-40
                      object-cover
                      hover:scale-105
                      transition duration-500
                    "
                  />
                </div>

                <div className="flex-1">
                  <span
                    className="
                      inline-flex
                      items-center
                      bg-slate-100
                      text-slate-600
                      px-3 py-1.5
                      rounded-full
                      text-xs
                      font-medium
                    "
                  >
                    {item.category}
                  </span>

                  <h2
                    className="
                      mt-4
                      text-xl
                      md:text-2xl
                      font-semibold
                      text-slate-800
                      leading-snug
                    "
                  >
                    {item.title}
                  </h2>

                  <p
                    className={`
                      mt-3
                      text-sm
                      font-medium
                      ${
                        item.stock > 0
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    `}
                  >
                    {item.stock > 0
                      ? "In Stock"
                      : "Out of Stock"}
                  </p>

                  <p
                    className="
                      mt-5
                      text-3xl
                      font-semibold
                      tracking-tight
                      text-slate-900
                    "
                  >
                    ₹{item.price}
                  </p>
                </div>

                <div
                  className="
                    flex flex-col
                    justify-between
                    items-center
                    gap-5
                  "
                >
            
                  <div
                    className="
                      flex items-center
                      gap-3
                      bg-slate-100
                      px-4 py-3
                      rounded-2xl
                    "
                  >
                    <button
                      onClick={() =>
                        dispatch(
                          decreaseQuantity(
                            item._id
                          )
                        )
                      }
                      className="
                        w-9 h-9
                        rounded-lg
                        bg-white
                        text-lg
                        font-medium
                        text-slate-700
                        hover:bg-slate-200
                        active:scale-95
                        transition
                      "
                    >
                      -
                    </button>

                    <span
                      className="
                        text-lg
                        font-medium
                        text-slate-800
                      "
                    >
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
                        w-9 h-9
                        rounded-lg
                        bg-white
                        text-lg
                        font-medium
                        text-slate-700
                        hover:bg-slate-200
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
                      w-full
                      bg-red-500
                      text-white
                      px-5 py-3
                      rounded-lg
                      text-sm
                      font-medium
                      hover:bg-red-600
                      hover:shadow-m
                      active:scale-95
                      transition duration-300
                    "
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          
          <div
            className="
              bg-white
              rounded-xl
              border border-slate-100
              shadow-sm
              p-7
              h-fit
              sticky top-24
            "
          >
            <h2
              className="
                text-2xl
                font-semibold
                tracking-tight
                text-slate-900
                mb-8
              "
            >
              Order Summary
            </h2>

            <div
              className="
                flex justify-between
                text-base
                mb-5
              "
            >
              <span className="text-slate-500">
                Total Items
              </span>

              <span
                className="
                  font-medium
                  text-slate-800
                "
              >
                {cartItems.reduce(
                  (acc, item) =>
                    acc +
                    item.quantity,
                  0
                )}
              </span>
            </div>

            <div
              className="
                border-t
                border-slate-100
               pt-6
                flex justify-between
                items-center
                mb-8
              "
            >
              <span
                className="
                  text-lg
                  font-medium
                  text-slate-600
                "
              >
                Total
              </span>

              <span
                className="
                  text-3xl
                  font-semibold
                  tracking-tight
                  text-slate-900
                "
              >
                ₹
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
                w-full
                bg-slate-900
                text-white
                py-3.5
                rounded-lg
                text-sm
                font-medium
                shadow-md
                hover:bg-slate-800
                hover:shadow-lg
                hover:scale-[1.01]
                active:scale-95
                transition duration-300
              "
            >
              Proceed To Checkout
            </button>

          </div>
        </div>
      )}
    </div>
  </div>
);
}

export default CartPage;