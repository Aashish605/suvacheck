"use client"
import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

const Order = () => {


    const [orderData, setorderData] = useState([])
    const socketRef = useRef(null)

    // Fetch current unpaid orders on mount
    useEffect(() => {
        let mounted = true
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/Order')
                const unpaidOrder = res.data.filter(i => i.paid === false)
                if (mounted) setorderData(unpaidOrder)
            } catch (err) {
                console.error('Failed to fetch orders', err)
            }
        }
        fetchData()
        return () => { mounted = false }
    }, [])

    // Socket.IO connection for real-time new orders
    useEffect(() => {
        // connect to same origin (use explicit origin for reliability)
        try {
            const origin = typeof window !== 'undefined' ? window.location.origin : undefined
            socketRef.current = io(origin || '/', { path: '/socket.io' })

            socketRef.current.on('connect', () => {
                console.log('Connected to socket server', socketRef.current.id)
            })

            socketRef.current.on('connect_error', (err) => {
                console.error('Socket connect_error:', err)
            })

            socketRef.current.on('newOrder', (order) => {
                try {
                    console.log('newOrder event received (socket):', order)
                    if (!order.paid) {
                        setorderData(prev => [order, ...prev])
                    }
                } catch (e) {
                    console.error('Error handling newOrder', e)
                }
            })
        } catch (err) {
            console.error('Socket init failed', err)
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect()
            }
        }
    }, [])

    const handleConfirm = async (id) => {
        try {
            const updatedOrder = orderData.find(order => order._id === id);
            const newConfirmedStatus = !updatedOrder.confirmed;
            await axios.put(`/api/Order`, { id, confirmed: newConfirmedStatus });
            setorderData(orderData.map(order => 
                order._id === id ? { ...order, confirmed: newConfirmedStatus } : order
            ));
            console.log('Order confirmed:', id);
        } catch (error) {
            console.error('Error confirming order:', error);
        }
    }

    const handleMarkPaid = async (id) => {
        try {
            await axios.put(`/api/Order`, { id, paid: true });
            
            setorderData(orderData.map(order =>
                order._id === id ? { ...order, paid: true } : order
            ));
            console.log('Order marked paid:', id);
        } catch (error) {
            console.error('Error marking paid:', error);
        }
    }





    return (
        <>
            <div className="w-full overflow-x-auto flex flex-col items-center  text-center my-8 min-h-[60vh] ">
                <h1 className="lg:text-2xl text-xl  text-center  font-bold">
                    Admin Panel - Order Management
                </h1>
                <table className="table-fixed w-4/5 shadow-md  rounded-lg my-8">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-3 lg:px-5 border-b text-left text-sm md:text-base w-20">
                                Table ID
                            </th>
                            <th className="py-2 px-3 lg:px-5 border-b text-right text-sm md:text-base w-28">
                                Total Amount
                            </th>
                            <th className="py-2 px-12 lg:px-5 border-b text-left text-sm md:text-base  ">
                                Order Date
                            </th>
                            <th className="py-2 px-12 lg:px-5 border-b  text-sm md:text-base">
                                Items
                            </th>
                            <th className="py-2 px-12 lg:px-5 text-center border-b  text-sm md:text-base">
                                Request
                            </th>
                            <th className="py-2 px-12 lg:px-5 border-b text-center text-sm md:text-base">
                                Payment Status
                            </th>
                            <th className="py-2 px-12 lg:px-5 border-b text-center text-sm md:text-base">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderData.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50">
                                <td className="py-1 px-2 border-b md:text-base w-20 text-wrap">
                                    {order.RoomNo}
                                </td>
                                <td className="py-1 px-2 border-b font-semibold text-green-700 text-sm md:text-base w-28 text-wrap">
                                    <span className="font-semibold">Rs</span> {order.TotalAmount}
                                </td>
                                <td className="py-1  text-left px-2 border-b text-sm md:text-base ">
                                    {new Date(order.createdAt).toLocaleString("en-NP", {
                                        timeZone: "Asia/Kathmandu",
                                        month: "short",
                                        day: "2-digit",
                                        hour: "numeric",
                                        minute: "numeric",
                                    })}
                                </td>
                                <td className="py-1 px-2 border-b  text-sm md:text-base">
                                    <ul className="list-disc pl-4 text-xs md:text-sm">
                                        {order.Cart.map((item, index) => (
                                            <li key={index} className="text-create mt-1">
                                                <span className="">
                                                    {item.quantity} - {item.productname}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="py-1 px-2 border-b   text-wrap  text-sm md:text-base">
                                    {order.Request}
                                </td>
                                <td className="py-1 px-2 border-b text-center text-sm md:text-base">
                                    {order.paid ? (
                                        <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2 py-0.5 rounded-full md:text-sm">
                                            Paid
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2 py-0.5 rounded-full md:text-sm">
                                            Pending
                                        </span>
                                    )}
                                </td>
                                <td className="py-1 px-2 border-b text-center  ">
                                    {!order.paid && (
                                        <div className="flex justify-center space-x-1 md:space-x-2">
                                            <button
                                                className={`rounded-md px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 ${order.confirmed
                                                        ? "bg-gray-400 text-white   cursor-not-allowed"
                                                        : "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                                                    }`}
                                                onClick={() => handleConfirm(order._id)}
                                            >
                                                {order.confirmed ? "Confirmed" : "Confirm"}
                                            </button>
                                            <button
                                                disabled={!order.confirmed}
                                                className={`rounded-md px-2 py-1 ${order.confirmed
                                                        ? "bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                                                        : "bg-gray-400 text-white cursor-not-allowed"
                                                    }`}
                                                onClick={() => handleMarkPaid(order._id)}
                                            >
                                                {order.paid ? "" : "Mark Paid"}
                                            </button>

                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Order
