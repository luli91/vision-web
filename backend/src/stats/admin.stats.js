const mongoose = require('mongoose');
const express = require('express');
const Order = require('../orders/order.model');
const Product = require('../products/product.model');
const router = express.Router();


// Función para calcular estadísticas de administrador.
router.get("/", async (req, res) => {
    try {
        // 1. Numero total de ordenes
        const totalOrders = await Order.countDocuments();

        // 2. Ventas totales (suma de todos los precios totales de los pedidos)
        const totalSales = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: "$totalPrice" },
                }
            }
        ]);

        // 4.Estadísticas de productos de tendencia:
        const trendingProductsCount = await Product.aggregate([
            { $match: { trending: true } },  
            { $count: "trendingProductsCount"}
        ]);
        
        // Si solo quieres el recuento como un número, puedes extraerlo así:
        const trendingProducts = trendingProductsCount.length > 0 ? trendingProductsCount[0].trendingProductsCount : 0;

        // 5. Numero total de productos
        const totalProducts = await Product.countDocuments();

        // 6. Ventas mensuales (agrupar por mes y sumar las ventas totales de cada mes)
        const monthlySales = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, 
                    totalSales: { $sum: "$totalPrice" },  
                    totalOrders: { $sum: 1 }  
                }
            },
            { $sort: { _id: 1 } }  
        ]);

        // Resumen de resultados
        res.status(200).json({  totalOrders,
            totalSales: totalSales[0]?.totalSales || 0,
            trendingProducts,
            totalProducts,
            monthlySales, });
      
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ message: "Failed to fetch admin stats" });
    }
})

module.exports = router;