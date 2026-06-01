

// GET /api/products/flash-deals
export const getFlashDeals = async (req: Request, res: Response) => {
    const products = await prisma.product.findMany({
        where: {stock: {gt: 0}},
        orderBy: {originalPrice: "desc"},
    })
    
    const productsWithDiscount = products.map((p: any) => { 
        const discount = p.originalPrice > 100 ? 20 : 10; // 20% off for products > $100, else 10%
    })
}
