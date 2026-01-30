import prisma from "../utils/prisma.js";

export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.body;

   
    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    
    const exists = await prisma.wishlist.findFirst({
      where: { userId, productId: Number(productId) },
    });

    if (exists) {
      return res.json({ message: "Already in wishlist" });
    }

    const wishlistItem = await prisma.wishlist.create({
      data: {
        userId,
        productId: Number(productId),
      },
    });

    res.json({
      message: "Added to wishlist",
      wishlistItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add to wishlist" });
  }
};


export const getWishlist = async (req, res) => {
  try {
    const userId = req.user.userId;

    const items = await prisma.wishlist.findMany({
      where: { userId },
      include: {
        product: true,
      },
    });

    res.json({
      total: items.length,
      items,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
};


export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = Number(req.params.productId);

    await prisma.wishlist.deleteMany({
      where: { userId, productId },
    });

    res.json({ message: "Removed from wishlist" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove item" });
  }
};
