const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const indexRouter = require('./routes/index');
const shipmentsRouter = require('./routes/shipments');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connect to mongodb
const dbURI= "mongodb+srv://deliveryos:deliveryos2022@realmcluster.tpgga.mongodb.net/deliveryos-shipment-api?retryWrites=true&w=majority"

/* mongoose.connect(dbURI)
    .then(result => console.log('connected to the db'))
    .catch(err => console.log(err))  */


app.use('/', indexRouter);
app.use('/shipments', shipmentsRouter);

//Documentation

// Basic Meta Informations about our API
const options = {
    definition: {
      openapi: "3.0.0",
      info: { title: "DeliveryOS Shipment Test API", version: "1.0.0" },
    },
    apis: ["./routes/shipments.js","./routes/tracking.js"],
  };
  
  // Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
