import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO || process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Missing MongoDB connection string. Set MONGO or MONGODB_URI in .env");
}

export async function connectDB() {
    try {
        if (mongoose.connection.readyState === 1) {
            return mongoose.connection.asPromise();
        }

        const conn = await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 15000,
            socketTimeoutMS: 45000,
        });

        console.log("MongoDB connected:", conn.connection.host);
        return conn;
    } catch (error) {
        console.error("MongoDB connection error:", error);

        if (error.code === "ECONNREFUSED" && error.syscall === "querySrv") {
            console.error("DNS SRV lookup failed. Try using a non-srv connection string from Atlas and verify network/DNS access.");
        }

        throw error;
    }
}
