import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    garment: String,
    quantity: Number,
    price: Number,
})


const orderSchema = new mongoose.Schema({
    orderId: String,
    customerName: String,
    phone: String,
    items: [itemSchema],
    totalAmount: Number,

    status: {
        type: String,
        enum: ["RECEIVED", "PROCESSING", "READY", "DELIVERED"],
        default: "RECEIVED",
    },
},
    { timestamps: true }
)


export default mongoose.models.Order || mongoose.model("Order", orderSchema)