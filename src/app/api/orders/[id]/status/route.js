import { ORDER_STATUS } from "@/constants/status";
import { connectDB } from "@/lib/db"
import Order from "@/models/Order";



export async function PATCH(req, context) {
    try {

        //  CONNECT DATABASE
        await connectDB()

        //  Extract the id from user from url params
        const { id } = await context.params;
        // console.log("Order id from user : ", id);

        const body = await req.json();
        //  Extract the status in the formm of jjsoon 
        const { status } = body;

        //  to match teh status  use custom ORDER_STATUS
        const validStatus = Object.values(ORDER_STATUS);

        if (!validStatus.includes(status)) {
            return Response.json(
                { error: "Invalid status value" },
                { status: 400 }
            );
        };

        // Find the order from given order Id from teh DB 
        const order = await Order.findOne({ orderId: id });

        if (!order) {
            return Response.json(
                { error: "Order not found" },
                { status: 404 }
            )
        }

        // Update here teh actual status and save updated status with order Id
        order.status = status;
        await order.save();

        //  Return teh feedback after successful updation
        return Response.json(
            {
                message: "Order status updated",
                order,
            },
            { status: 200 }
        )

    } catch (error) {

        return Response.json(
            { error: error.message },
            { status: 500 }
        )
    }
}