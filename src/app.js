const express = require('express');

const app = express();
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

/**
 * Initialize different middlewares for security and
 * configuration on http endpoints proccessing
 */
app.use(helmet());
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({ origin: ['http://localhost:4200', 'http://localhost:8100']}));

/**
 * Initialize router for different routes
 */
const router = express.Router();

/**
 * Set API prefix for all resolve routes
 * found on api folder
 */
router.use((process.env.API_ENDPOINT || '/api') , require('./api'));

app.use(router);

module.exports = app;

