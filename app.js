const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require('./api/routes/user');

mongoose.connect(process.env.MONGO_ATLAS_CS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log('Connected to Mongo Atlas');

    app.use(bodyParser.json());

    app.use("/user", userRoutes);
});

mongoose.Promise = global.Promise;
module.exports = app;
