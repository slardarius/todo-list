const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
//
const environment = require('../environment');
const dataBase = require('./models/dataBase');
const registrationRouting = require('./routing/registration.route');
const application = express();

const pathParentDir = path.resolve(__dirname, '..') + '/';

if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: pathParentDir + 'config.dev.env' });
    application.use(morgan('combined'));
} else {
    dotenv.config({ path: pathParentDir + 'config.dev.env' });
}

application.use(express.static(__dirname + '/app/public'));
application.use(registrationRouting);
(async function onBootstrapApplication() {
    try {
            await dataBase.connect();
            // await dataBase.randomValue();
            application.listen(environment.port, () => {
            console.log('Application is started on port -', process.env.PORT, '\tCurrent date: \t', new Date().getSeconds());
        });
    } catch (e) {
        throw Error(e);
    }
}());
