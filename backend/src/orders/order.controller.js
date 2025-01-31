const Order = require("./order.model");

const createAOrder = async (req, res) => {
    try {
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
        const orders = await Order.find({ email: req.params.email }).populate('productIds');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports= {
    createAOrder,
    getOrderByEmail
}