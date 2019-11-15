const express = require('express');
const environment = require('../environment');
const dataBase = require('./models/dataBase');

const application = express();

(async function onBootstrapApplication() {
    try {
        await dataBase.connect();
        await dataBase.randomValue();
        application.listen(environment.port, () => {
            console.log('Application is started on port -', environment.port);
        });
    } catch (e) {
        throw Error(e);
    }
}());
