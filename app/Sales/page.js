"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SalesReportPage() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [total, setTotal] = useState(0);
    const [data, setdata] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("/api/Order");
            setdata(res.data);
        };
        fetchData();
    }, []);

    const handleFilter = () => {
        if (!startDate || !endDate) return;

        const start = new Date(startDate);
        const end = new Date(endDate);

        // 🔥 Fix: include entire endDate day
        end.setHours(23, 59, 59, 999);

        const filteredOrders = data.filter((order) => {
            const d = new Date(order.createdAt);
            return d >= start && d <= end && order.paid === true;
        });

        setFiltered(filteredOrders);
        setTotal(filteredOrders.reduce((sum, item) => sum + item.TotalAmount, 0));
    };

    return (
        <div className="p-4 md:p-10 max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-center">Sales Report</h1>

            {/* Filter Section */}
            <div className="bg-white shadow-lg p-6 rounded-2xl border space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border p-2 rounded-lg"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border p-2 rounded-lg"
                        />
                    </div>
                </div>

                <button
                    onClick={handleFilter}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
                >
                    Filter Report
                </button>
            </div>

            {/* Total Sales */}
            <div className="bg-white shadow-md p-6 rounded-2xl border text-center">
                <h2 className="text-xl font-semibold mb-2">Total Sales</h2>
                <p className="text-3xl font-bold text-green-600">Rs. {total}</p>
            </div>

            {/* Orders List */}
            <div className="bg-white shadow-md p-6 rounded-2xl border">
                <h2 className="text-xl font-semibold mb-4">Orders</h2>

                <div className="space-y-4">
                    {filtered.length === 0 && (
                        <p className="text-gray-400 text-center">No data</p>
                    )}

                    {filtered.map((order) => (
                        <div
                            key={order._id}
                            className="border p-4 rounded-xl shadow-sm bg-gray-50"
                        >
                            <div className="flex justify-between">
                                <p className="font-semibold">Room {order.RoomNo}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="mt-3 space-y-2">
                                {order.Cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex justify-between text-sm"
                                    >
                                        <span>
                                            {item.productname} × {item.quantity}
                                        </span>
                                        <span>Rs. {item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="text-right mt-3 font-bold text-lg">
                                Total: Rs. {order.TotalAmount}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
