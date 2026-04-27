import { connectDB } from "@/lib/db"
import Order from "@/models/Order"
import { calculateTotal } from "@/utils/calculateTotal"
import { generateOrderId } from "@/utils/generateOrderId"


//  CREATE ORDER
export async function POST(req) {
    try {
        await connectDB()

        const body = await req.json()
        const { customerName, phone, items } = body

        //  Basic validation
        if (!customerName || !phone || !items || items.length === 0) {
            return Response.json(
                { error: "Missing required fields" },
                { status: 400 }
            )
        }

        //  Calculate total
        const totalAmount = calculateTotal(items)

        //  Generate order ID
        const orderId = generateOrderId()

        const newOrder = await Order.create({
            orderId,
            customerName,
            phone,
            items,
            totalAmount,
        })

        return Response.json(
            {
                message: "Order created successfully",
                order: newOrder,
            },
            { status: 201 }
        )
    } catch (error) {
        return Response.json(
            { error: error.message },
            { status: 500 }
        )
    }
}


//  GET ORDERS (with filters)
export async function GET(req) {
    try {
        await connectDB()

        const { searchParams } = new URL(req.url)

        const status = searchParams.get("status")
        const phone = searchParams.get("phone")
        const customerName = searchParams.get("customerName")

        let filter = {}

        if (status) filter.status = status
        if (phone) filter.phone = phone
        if (customerName) {
            filter.customerName = { $regex: customerName, $options: "i" }
        }

        const orders = await Order.find(filter).sort({ createdAt: -1 })

        return Response.json({ orders })
        
    } catch (error) {
        return Response.json(
            { error: error.message },
            { status: 500 }
        )
    }
}