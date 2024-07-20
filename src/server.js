const express = require("express");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const app = express();

require("./start/runner")(app);
require("./start/model")(app, express);

// Load Swagger document
const swaggerDocument = YAML.load(path.join(__dirname, "utils" ,  'swagger.yaml'));

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));