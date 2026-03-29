import mongoose from "mongoose"

const OrderSchema = mongoose.Schema({
    RoomNo: { type: String, required: true },
    Cart: { type: Array },
    TotalAmount: { type: Number, require: true },
    Request: { type: String,default: '----' },
    paid: { type: Boolean, default: false },
    confirmed: { type: Boolean, default: false },
},
    { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);