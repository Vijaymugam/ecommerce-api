import prisma from "../utils/prisma.js";


export const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity = 1 } = req.body;

   
    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    
    const cartItem = await prisma.cart.upsert({
      where: {
        userId_productId: {
          userId,
          productId: Number(productId),
        },
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        userId,
        productId: Number(productId),
        quantity,
      },
    });

    res.json({
      message: "Added to cart",
      cartItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add to cart" });
  }
};


export const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cartItems = await prisma.cart.findMany({
      where: { userId },
      include: {
        product: true,
      },
    });

    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    res.json({
      totalItems: cartItems.length,
      totalAmount: total,
      items: cartItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};


export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = Number(req.params.productId);

    await prisma.cart.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove item" });
  }
};
