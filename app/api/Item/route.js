import { connectDB } from "@/Db/ConnectDb";
import { NextResponse } from 'next/server';
import Item from "@/model/Item.model";
export async function GET(req) {
    await connectDB();
    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get("Type");

    const query = type
        ? { category: { $regex: `^${type}$`, $options: "i" } }
        : {};

    const items = await Item.find(query);

    console.log("GET /api/Item?Type=", type, "result count", items.length);

    return new Response(JSON.stringify(items), {
        status: 200,
    });
}

export async function POST(req) {
    try {
        await connectDB();
        const body = await req.json();
        console.log('data recieved received', body);
        const { category, productname, price, url } = body || {};
        const data = new Item({
            category,
            productname,
            price,
            url
        });
        await data.save();
        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error('POST /api/Item error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await connectDB();
        const body = await req.json();
        console.log('data recieved received', body);
        const { id } = body || {};
        const data = await Item.findByIdAndDelete(id);
        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}