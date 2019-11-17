const express = require('express');
const environment = require('../environment');
const dataBase = require('./models/dataBase');
const registrationRouting = require('./routing/registration.route').default;
const application = express();

application.use(express.static(__dirname + '/public'));
application.use(registrationRouting);

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
