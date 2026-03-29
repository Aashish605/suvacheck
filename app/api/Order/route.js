import { connectDB } from "@/Db/ConnectDb";
import { NextResponse } from 'next/server';
import Order from '@/model/Order.model'

export async function GET() {
    await connectDB(); // Connect to DB
    const Orders = await Order.find(); // Get data from MongoDB
    return new Response(JSON.stringify(Orders), { status: 200 });
}

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        console.log('data received', body);

        const { RoomNo, Cart, TotalAmount, Request } = body || {};

        if (!RoomNo) {
            return NextResponse.json({ error: "RoomNo is required" }, { status: 400 });
        }

        const data = new Order({
            RoomNo,
            Cart: Cart || [],
            TotalAmount,
            Request: Request || ""
        });

        await data.save();

        // Emit real-time event to connected admin clients (if socket server exists)
        try {
            const payload = (data && typeof data.toObject === 'function') ? data.toObject() : JSON.parse(JSON.stringify(data));
            console.log('Emitting newOrder for order id:', payload._id);
            if (global && global.io) {
                global.io.emit('newOrder', payload);
            } else {
                console.warn('global.io not available, skipping emit');
            }
        } catch (e) {
            console.warn('Socket emit failed:', e);
        }

        return NextResponse.json(data, { status: 201 });

    } catch (error) {
        console.error('POST /api/Order error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


export async function PUT(req) {
    try {
        await connectDB();
        const body = await req.json();
        const { id } = body || {};
        const { confirmed, paid } = body;

        if (!id) {
            return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
        }

        const updateData = {};
        if (confirmed !== undefined) updateData.confirmed = confirmed;
        if (paid !== undefined) updateData.paid = paid;

        const updatedOrder = await Order.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedOrder) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        return NextResponse.json(updatedOrder, { status: 200 });
    } catch (error) {
        console.error('PUT /api/Order error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}