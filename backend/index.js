const express = require('express');

const app = express();

const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

require('dotenv').config()

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
