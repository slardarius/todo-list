const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
//
const dataBase = require('./models/dataBase');
const registrationRouting = require('./routing/registration.route');
const application = express();

const pathParentDir = path.resolve(__dirname, '..') + '/';
/* 
* ENVIRONMENT
*/
if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: pathParentDir + 'config.dev.env' });
    application.use(morgan('combined'));
} else {
    dotenv.config({ path: pathParentDir + 'config.prod.env' });
    application.use((req, res, next) => {
        const protocol = req.get('x-forwarded-proto');
        protocol === 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
    });
}
//
application.use(bodyParser.urlencoded({extended: false}));
application.use(bodyParser.json());
application.use(express.static(__dirname + '/app/public'));
application.use(registrationRouting);
//
(async function onBootstrapApplication() {
    try {
            await dataBase.connect();
            application.listen(process.env.PORT, () => {
            console.log('Application is started on port -', process.env.PORT, '\tCurrent date: \t', new Date().getSeconds());
        });
    } catch (e) {
        throw Error(e);
    }
}());
