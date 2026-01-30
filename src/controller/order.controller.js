import prisma from "../utils/prisma.js";


export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cartItems = await prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

   
    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

   
    const order = await prisma.order.create({
      data: {
        userId,
        total,
      },
    });

    
    await prisma.cart.deleteMany({
      where: { userId },
    });

    res.json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to place order" });
  }
};


export const getOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.json({
      total: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
