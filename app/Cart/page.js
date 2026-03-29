/* eslint-disable @next/next/no-img-element */
"use client"
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity, clearCart } from '@/Redux/Cart/CartSlice';
import axios from 'axios';
import { toast } from 'react-toastify';



const Cart = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.Cart.items)
    const Num = useSelector(state => state.Num.item)

    const updateAmount = (id, value) => {
        dispatch(updateQuantity({
            id,
            quantity: Number(value)
        }))
    }

    const [request, setrequest] = useState()

    const total = (cartItems.reduce((total, i) => total + (i.price * i.quantity), 0))

    const handleOrder = async () => {
        const data = { RoomNo: Num, Cart: cartItems, TotalAmount: total, Request: request }
        console.log("hi");
        
        const res = await axios.post('/api/Order', data)
        console.log(res);
        dispatch(clearCart())
        notify()
        setrequest('')
    }

    const notify = (name) => {
            toast.success(`Order Placed`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
    };



    return (
        <main className="px-8 py-10 bg-white min-h-screen">
            <h1 className="text-4xl  font-semibold mb-8 text-left mx-auto "> Cart </h1>

            <div className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Cart items */}
                <section className="lg:col-span-8 bg-white border border-gray-300 shadow-xs rounded-2xl p-6">
                    <div className="flex  justify-between mb-6">
                        <div className="text-create font-semibold max-[530px]:mx-auto  mx-5 ">Products</div>
                        <div className="flex  max-[530px]:hidden gap-8 ">
                            <div className="w-32 max-[700px]:hidden text-create font-semibold text-center">Quantity</div>
                            <div className="w-32 text-create font-semibold text-right">Total</div>
                            <div className="w-12" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        {cartItems.length === 0 ? (
                            <p className="py-8 text-center text-gray-800">Your cart is empty</p>
                        ) : (
                            cartItems.map(item => (
                                <div key={item.id} className="flex max-[530px]:items-start items-center gap-4 p-4 border-t-2 border-gray-500   hover:shadow-xs transition">
                                    <img src={item.url} alt={item.productname} className=" max-w-20  max-h-40 object-cover rounded-xl " />
                                    <div className="flex-1">
                                        <div className=" capitalize">
                                            <p className='text-xl'>{item.productname} </p>
                                            {/* <p className='text opacity-60'>Category: {item.category}</p> */}
                                        </div>

                                        <div className=" flex gap-1 mt-3 min-[701px]:hidden">
                                            <button aria-label="decrease" onClick={() => updateAmount(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-400">
                                                −
                                            </button>
                                            <input
                                                type="number"
                                                min={1}
                                                value={item.quantity}
                                                onChange={e => updateAmount(item.id, e.target.value)}
                                                className="w-6 text-center py-1"
                                            />
                                            <button
                                                aria-label="increase"
                                                onClick={() => updateAmount(item.id, item.quantity + 1)}
                                                onMouseDown={() => {
                                                }}
                                                className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-400"
                                            >
                                                +
                                            </button></div>
                                        <div className='flex    items-center my-3'>
                                            <div className="w-fit  font-semibold  min-[530px]:hidden ">
                                                {`Rs ${(Number(item.price) * item.quantity)}`}
                                            </div>

                                            <button
                                                aria-label="remove"
                                                onClick={() => dispatch(removeFromCart(item.id))}
                                                className="w-8  min-[530px]:hidden h-10 ml-4 flex items-center justify-center text-red-600"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0,0,256,256">
                                                    <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" ><g transform="scale(2.56,2.56)"><path d="M25,30l3.645,47.383c0.2,2.605 2.372,4.617 4.985,4.617h32.74c2.613,0 4.785,-2.012 4.985,-4.617l3.645,-47.383" fill="#000000"></path><path d="M65,38v35c0,1.65 -1.35,3 -3,3c-1.65,0 -3,-1.35 -3,-3v-35c0,-1.65 1.35,-3 3,-3c1.65,0 3,1.35 3,3zM53,38v35c0,1.65 -1.35,3 -3,3c-1.65,0 -3,-1.35 -3,-3v-35c0,-1.65 1.35,-3 3,-3c1.65,0 3,1.35 3,3zM41,38v35c0,1.65 -1.35,3 -3,3c-1.65,0 -3,-1.35 -3,-3v-35c0,-1.65 1.35,-3 3,-3c1.65,0 3,1.35 3,3zM77,24h-4l-1.835,-3.058c-0.723,-1.205 -2.025,-1.942 -3.43,-1.942h-35.47c-1.405,0 -2.707,0.737 -3.43,1.942l-1.835,3.058h-4c-1.657,0 -3,1.343 -3,3c0,1.657 1.343,3 3,3h54c1.657,0 3,-1.343 3,-3c0,-1.657 -1.343,-3 -3,-3z" fill="#f6f6f6"></path><path d="M66.37,83h-32.74c-3.116,0 -5.744,-2.434 -5.982,-5.54l-3.645,-47.383l1.994,-0.154l3.645,47.384c0.159,2.071 1.911,3.693 3.988,3.693h32.74c2.077,0 3.829,-1.622 3.988,-3.692l3.645,-47.385l1.994,0.154l-3.645,47.384c-0.239,3.105 -2.867,5.539 -5.982,5.539zM56,20c-0.552,0 -1,-0.447 -1,-1v-3c0,-0.552 -0.449,-1 -1,-1h-8c-0.551,0 -1,0.448 -1,1v3c0,0.553 -0.448,1 -1,1c-0.552,0 -1,-0.447 -1,-1v-3c0,-1.654 1.346,-3 3,-3h8c1.654,0 3,1.346 3,3v3c0,0.553 -0.448,1 -1,1z" fill="#1f212b"></path><path d="M77,31h-54c-2.206,0 -4,-1.794 -4,-4c0,-2.206 1.794,-4 4,-4h3.434l1.543,-2.572c0.898,-1.497 2.541,-2.428 4.288,-2.428h35.471c1.747,0 3.389,0.931 4.287,2.428l1.543,2.572h3.434c2.206,0 4,1.794 4,4c0,2.206 -1.794,4 -4,4zM23,25c-1.103,0 -2,0.897 -2,2c0,1.103 0.897,2 2,2h54c1.103,0 2,-0.897 2,-2c0,-1.103 -0.897,-2 -2,-2h-4c-0.351,0 -0.677,-0.185 -0.857,-0.485l-1.835,-3.058c-0.539,-0.898 -1.525,-1.457 -2.573,-1.457h-35.47c-1.048,0 -2.033,0.559 -2.572,1.457l-1.835,3.058c-0.181,0.3 -0.507,0.485 -0.858,0.485z" fill="#1f212b"></path><path d="M61.5,25h-36c-0.276,0 -0.5,-0.224 -0.5,-0.5c0,-0.276 0.224,-0.5 0.5,-0.5h36c0.276,0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5zM73.5,25h-5c-0.276,0 -0.5,-0.224 -0.5,-0.5c0,-0.276 0.224,-0.5 0.5,-0.5h5c0.276,0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5zM66.5,25h-2c-0.276,0 -0.5,-0.224 -0.5,-0.5c0,-0.276 0.224,-0.5 0.5,-0.5h2c0.276,0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5zM50,76c-1.654,0 -3,-1.346 -3,-3v-35c0,-1.654 1.346,-3 3,-3c1.654,0 3,1.346 3,3v25.5c0,0.276 -0.224,0.5 -0.5,0.5c-0.276,0 -0.5,-0.224 -0.5,-0.5v-25.5c0,-1.103 -0.897,-2 -2,-2c-1.103,0 -2,0.897 -2,2v35c0,1.103 0.897,2 2,2c1.103,0 2,-0.897 2,-2v-3.5c0,-0.276 0.224,-0.5 0.5,-0.5c0.276,0 0.5,0.224 0.5,0.5v3.5c0,1.654 -1.346,3 -3,3zM62,76c-1.654,0 -3,-1.346 -3,-3v-25.5c0,-0.276 0.224,-0.5 0.5,-0.5c0.276,0 0.5,0.224 0.5,0.5v25.5c0,1.103 0.897,2 2,2c1.103,0 2,-0.897 2,-2v-35c0,-1.103 -0.897,-2 -2,-2c-1.103,0 -2,0.897 -2,2v1.5c0,0.276 -0.224,0.5 -0.5,0.5c-0.276,0 -0.5,-0.224 -0.5,-0.5v-1.5c0,-1.654 1.346,-3 3,-3c1.654,0 3,1.346 3,3v35c0,1.654 -1.346,3 -3,3z" fill="#1f212b"></path><path d="M59.5,45c-0.276,0 -0.5,-0.224 -0.5,-0.5v-2c0,-0.276 0.224,-0.5 0.5,-0.5c0.276,0 0.5,0.224 0.5,0.5v2c0,0.276 -0.224,0.5 -0.5,0.5zM38,76c-1.654,0 -3,-1.346 -3,-3v-35c0,-1.654 1.346,-3 3,-3c1.654,0 3,1.346 3,3v35c0,1.654 -1.346,3 -3,3zM38,36c-1.103,0 -2,0.897 -2,2v35c0,1.103 0.897,2 2,2c1.103,0 2,-0.897 2,-2v-35c0,-1.103 -0.897,-2 -2,-2z" fill="#1f212b"></path></g></g>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-48 max-[700px]:hidden flex items-center justify-center gap-3">
                                        <button aria-label="decrease" onClick={() => updateAmount(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-400">
                                            −
                                        </button>
                                        <input
                                            type="number"
                                            min={1}
                                            value={item.quantity}
                                            onChange={e => updateAmount(item.id, e.target.value)}
                                            className=" w-10 text-center  rounded-md py-1"
                                        />
                                        <button
                                            aria-label="increase"
                                            onClick={() => updateAmount(item.id, item.quantity + 1)}
                                            onMouseDown={() => {
                                            }}
                                            className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-400"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="w-28 block text-right font-semibold  max-[530px]:hidden ">
                                        {item.quantity * item.price}
                                    </div>
                                    <button
                                        aria-label="remove"
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                        className="w-8 h-10 ml-4 flex items-center justify-center   text-red-600  max-[530px]:hidden"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0,0,256,256">
                                            <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" ><g transform="scale(2.56,2.56)"><path d="M25,30l3.645,47.383c0.2,2.605 2.372,4.617 4.985,4.617h32.74c2.613,0 4.785,-2.012 4.985,-4.617l3.645,-47.383" fill="#000000"></path><path d="M65,38v35c0,1.65 -1.35,3 -3,3c-1.65,0 -3,-1.35 -3,-3v-35c0,-1.65 1.35,-3 3,-3c1.65,0 3,1.35 3,3zM53,38v35c0,1.65 -1.35,3 -3,3c-1.65,0 -3,-1.35 -3,-3v-35c0,-1.65 1.35,-3 3,-3c1.65,0 3,1.35 3,3zM41,38v35c0,1.65 -1.35,3 -3,3c-1.65,0 -3,-1.35 -3,-3v-35c0,-1.65 1.35,-3 3,-3c1.65,0 3,1.35 3,3zM77,24h-4l-1.835,-3.058c-0.723,-1.205 -2.025,-1.942 -3.43,-1.942h-35.47c-1.405,0 -2.707,0.737 -3.43,1.942l-1.835,3.058h-4c-1.657,0 -3,1.343 -3,3c0,1.657 1.343,3 3,3h54c1.657,0 3,-1.343 3,-3c0,-1.657 -1.343,-3 -3,-3z" fill="#f6f6f6"></path><path d="M66.37,83h-32.74c-3.116,0 -5.744,-2.434 -5.982,-5.54l-3.645,-47.383l1.994,-0.154l3.645,47.384c0.159,2.071 1.911,3.693 3.988,3.693h32.74c2.077,0 3.829,-1.622 3.988,-3.692l3.645,-47.385l1.994,0.154l-3.645,47.384c-0.239,3.105 -2.867,5.539 -5.982,5.539zM56,20c-0.552,0 -1,-0.447 -1,-1v-3c0,-0.552 -0.449,-1 -1,-1h-8c-0.551,0 -1,0.448 -1,1v3c0,0.553 -0.448,1 -1,1c-0.552,0 -1,-0.447 -1,-1v-3c0,-1.654 1.346,-3 3,-3h8c1.654,0 3,1.346 3,3v3c0,0.553 -0.448,1 -1,1z" fill="#1f212b"></path><path d="M77,31h-54c-2.206,0 -4,-1.794 -4,-4c0,-2.206 1.794,-4 4,-4h3.434l1.543,-2.572c0.898,-1.497 2.541,-2.428 4.288,-2.428h35.471c1.747,0 3.389,0.931 4.287,2.428l1.543,2.572h3.434c2.206,0 4,1.794 4,4c0,2.206 -1.794,4 -4,4zM23,25c-1.103,0 -2,0.897 -2,2c0,1.103 0.897,2 2,2h54c1.103,0 2,-0.897 2,-2c0,-1.103 -0.897,-2 -2,-2h-4c-0.351,0 -0.677,-0.185 -0.857,-0.485l-1.835,-3.058c-0.539,-0.898 -1.525,-1.457 -2.573,-1.457h-35.47c-1.048,0 -2.033,0.559 -2.572,1.457l-1.835,3.058c-0.181,0.3 -0.507,0.485 -0.858,0.485z" fill="#1f212b"></path><path d="M61.5,25h-36c-0.276,0 -0.5,-0.224 -0.5,-0.5c0,-0.276 0.224,-0.5 0.5,-0.5h36c0.276,0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5zM73.5,25h-5c-0.276,0 -0.5,-0.224 -0.5,-0.5c0,-0.276 0.224,-0.5 0.5,-0.5h5c0.276,0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5zM66.5,25h-2c-0.276,0 -0.5,-0.224 -0.5,-0.5c0,-0.276 0.224,-0.5 0.5,-0.5h2c0.276,0 0.5,0.224 0.5,0.5c0,0.276 -0.224,0.5 -0.5,0.5zM50,76c-1.654,0 -3,-1.346 -3,-3v-35c0,-1.654 1.346,-3 3,-3c1.654,0 3,1.346 3,3v25.5c0,0.276 -0.224,0.5 -0.5,0.5c-0.276,0 -0.5,-0.224 -0.5,-0.5v-25.5c0,-1.103 -0.897,-2 -2,-2c-1.103,0 -2,0.897 -2,2v35c0,1.103 0.897,2 2,2c1.103,0 2,-0.897 2,-2v-3.5c0,-0.276 0.224,-0.5 0.5,-0.5c0.276,0 0.5,0.224 0.5,0.5v3.5c0,1.654 -1.346,3 -3,3zM62,76c-1.654,0 -3,-1.346 -3,-3v-25.5c0,-0.276 0.224,-0.5 0.5,-0.5c0.276,0 0.5,0.224 0.5,0.5v25.5c0,1.103 0.897,2 2,2c1.103,0 2,-0.897 2,-2v-35c0,-1.103 -0.897,-2 -2,-2c-1.103,0 -2,0.897 -2,2v1.5c0,0.276 -0.224,0.5 -0.5,0.5c-0.276,0 -0.5,-0.224 -0.5,-0.5v-1.5c0,-1.654 1.346,-3 3,-3c1.654,0 3,1.346 3,3v35c0,1.654 -1.346,3 -3,3z" fill="#1f212b"></path><path d="M59.5,45c-0.276,0 -0.5,-0.224 -0.5,-0.5v-2c0,-0.276 0.224,-0.5 0.5,-0.5c0.276,0 0.5,0.224 0.5,0.5v2c0,0.276 -0.224,0.5 -0.5,0.5zM38,76c-1.654,0 -3,-1.346 -3,-3v-35c0,-1.654 1.346,-3 3,-3c1.654,0 3,1.346 3,3v35c0,1.654 -1.346,3 -3,3zM38,36c-1.103,0 -2,0.897 -2,2v35c0,1.103 0.897,2 2,2c1.103,0 2,-0.897 2,-2v-35c0,-1.103 -0.897,-2 -2,-2z" fill="#1f212b"></path></g></g>
                                        </svg>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                        <button
                            onClick={() => { dispatch(clearCart()) }}
                            className="px-6 py-3 bg-secondary text-white rounded-lg"
                        >
                            Empty Cart
                        </button>

                        <div className="text-sm text-gray-800">
                            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
                        </div>
                    </div>
                </section>

                {/* Right: Order summary */}
                <aside className="lg:col-span-4">
                    <div className="bg-white border border-gray-300 shadow-xs rounded-lg p-6 sticky top-16 max-[550px]:relative max-[550px]:top-0">
                        <h2 className="text-xl font-semibold mb-4">Any Request!!!</h2>
                        <label htmlFor="request">
                            <textarea name='request' value={request || ''} onChange={(event) => { setrequest(event.target.value) }} className='border border-gray-400 rounded-md w-full py-4 px-3 resize-none overflow-hidden' />
                        </label>
                        <div className="mt-6">
                            <button onClick={() => { handleOrder();  }} className="w-full cursor-pointer bg-green-600 text-xl text-white py-3 rounded-lg">
                                Order Now
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    )
}

export default Cart
