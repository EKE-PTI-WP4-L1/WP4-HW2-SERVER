const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require('./api/routes/user');

const e404 = require('./api/middleware/e404');
const e500 = require('./api/middleware/e500');

mongoose.connect(process.env.MONGO_ATLAS_CS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log('Connected to Mongo Atlas');

    app.use(bodyParser.json());

    app.use("/user", userRoutes);

    // 404 Route
    app.use(e404);

    // 500 Route
    app.use(e500);
});

mongoose.Promise = global.Promise;
module.exports = app;
