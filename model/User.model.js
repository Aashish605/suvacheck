import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        id: { 
            type: String, 
            required: true, 
            unique: true,
            index: true 
        },
        name: { 
            type: String, 
            required: true 
        },
        email: { 
            type: String, 
            unique: true,
            sparse: true
        },
        password: { 
            type: String, 
            required: true 
        },
        role: { 
            type: String, 
            enum: ["admin", "staff", "user"], 
            default: "user" 
        },
        isActive: { 
            type: Boolean, 
            default: true 
        }
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
