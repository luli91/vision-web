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
const productRoutes = require('./src/products/product.route')
app.use("/api/products", productRoutes)


main().then(() => console.log("MongoDB connect sucessfully")).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
  app.use('/', (req, res) => {
    res.send('dsfsdg');
  });
}

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
