import prisma from "../utils/prisma.js";


export const getProducts = async (req, res) => {
  try {
    const { categoryId, search } = req.query;

    const products = await prisma.product.findMany({
      where: {
        ...(categoryId && { categoryId: Number(categoryId) }),
        ...(search && {
          title: {
            contains: search,
          },
        }),
      },
      include: {
        category: true,
      },
    });

    res.json({
      total: products.length,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};
