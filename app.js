const express = require('express');
const logger = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose');

require('dotenv').config();


const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const shipmentsRouter = require('./routes/shipments');
const containerRouter = require('./routes/containers');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connect to mongodb

mongoose.connect(`${process.env.DATABASE_URL}`)
    .then(result => console.log('connected to the db'))
    .catch(err => console.log(err))

app.use(cors())

app.use('/api/shipments', shipmentsRouter);
app.use('/api/containers', containerRouter);


//Documentation

// Basic Meta Informations about our API
const options = {
    definition: {
      openapi: "3.0.0",
      info: { title: "DeliveryOS Shipment Test API", version: "1.0.0" },
    },
    apis: ["./routes/shipments.js","./routes/containers.js"],
  };
  
// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
