const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const containerRouter = require('./routes/container');
const shipmentsRouter = require('./routes/shipments');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connect to mongodb
const dbURI= "mongodb+srv://deliveryos:deliveryos2022@realmcluster.tpgga.mongodb.net/deliveryos-shipment-api?retryWrites=true&w=majority"
mongoose.connect(dbURI)
    .then(result => console.log('connected to the db'))
    .catch(err => console.log(err)) 


app.use('/api/containers', containerRouter);
app.use('/api/shipments', shipmentsRouter);

module.exports = app;
