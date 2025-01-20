const Order = require("./order.model");

const createAOrder = async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body); 

        const newOrder = await Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        console.error("Error al crear una orden", error);
        res.status(500).json({ message: "Error al crear una orden" });
    }
};

const getOrderByEmail = async (req, res) => {
    try {
        const {email} = req.params;
        const orders = await Order.find({email}).sort({createdAt: -1});
        if (!orders) {
            return res.status(404).json({message: "Orden no encontrada"});
        }
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders", error);
        res.status(500).json({message: "Failed to fetch a oder"});
    }
}

module.exports= {
    createAOrder,
    getOrderByEmail
}