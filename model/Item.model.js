import mongoose from "mongoose"

const ItemSchema = mongoose.Schema({
    category: { type: String, required: true },
    productname: { type: String, required: true },
    price: { type: Number, required: true },
    url: { type: String, required: true },

});

export default mongoose.models.Item || mongoose.model("Item", ItemSchema);