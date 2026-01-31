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

export const getProductById = async (req, res) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: { category: true },
  });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};