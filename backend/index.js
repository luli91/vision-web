const express = require('express');
const app = express();
const cors = require("cors");

const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
require('dotenv').config()

//midleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
}))

//routes
const productRoutes = require('./src/products/product.route');
const orderRoutes = require('./src/orders/order.route')

app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)


main().then(() => console.log("MongoDB connect sucessfully")).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
  app.use('/', (req, res) => {
    res.send('Book Store Server is running!');
  });
}

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
