


import { connectDB } from "@/lib/db"
import Order from "@/models/Order"
import { ORDER_STATUS } from "@/constants/status"

export async function GET() {
  try {
    await connectDB()

    //  Total orders
    const totalOrders = await Order.countDocuments()

    //  Total revenue
    const revenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" }
        }
      }
    ])


    const totalRevenue = revenueResult[0]?.total || 0

    //  Orders per status
    const statusData = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ])

    // Convert to clean object
    const statusBreakdown = {
      RECEIVED: 0,
      PROCESSING: 0,
      READY: 0,
      DELIVERED: 0
    }

    statusData.forEach((item) => {
      statusBreakdown[item._id] = item.count
    })

    return Response.json({
      totalOrders,
      totalRevenue,
      statusBreakdown
    })

  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    )
  }
}