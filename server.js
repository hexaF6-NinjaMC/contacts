const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const contactRoutes = require('./routes/contactsRoutes');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const swaggerOptions = require('./swagger-options');

const port = process.env.PORT || 8080;
const app = express();

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
    .use('/', contactRoutes)
    .use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument, swaggerOptions));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});