import { connectDB } from "@/Db/ConnectDb";
import { NextResponse } from "next/server";
import User from "@/model/User.model";
import bcrypt from "bcrypt";

export async function POST(req) {
    try {
        await connectDB();
        const { id, name, email, password, role } = await req.json();

        // Validate input
        if (!id || !name || !password) {
            return NextResponse.json(
                { error: "ID, name, and password are required" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ id }, { email }] 
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User ID or email already exists" },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            id,
            name,
            email,
            password: hashedPassword,
            role: role || "user",
            isActive: true
        });

        await newUser.save();

        return NextResponse.json(
            { 
                message: "User created successfully",
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role
                }
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("User creation error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectDB();
        const users = await User.find({}, "-password"); // Exclude passwords
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error("Get users error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
