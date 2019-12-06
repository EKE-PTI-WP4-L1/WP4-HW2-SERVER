const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const productRoutes = require("./api/routes/products");
const userRoutes = require('./api/routes/user');

const options = require('./api/middleware/options');
const e404 = require('./api/middleware/e404');
const e500 = require('./api/middleware/e500');

mongoose.connect(process.env.MONGO_ATLAS_CS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log('Connected to Mongo Atlas');

    app.use(bodyParser.json());

    // Routes
    app.use("/products", productRoutes);
    app.use("/user", userRoutes);

    //OPTIONS route
    app.use(options);

    // 404 Route
    app.use(e404);

    // 500 Route
    app.use(e500);
});

mongoose.Promise = global.Promise;
module.exports = app;
