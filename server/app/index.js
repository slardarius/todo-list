const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const conf = require('./configuration/conf');
// REDIS.
const dataBase = require('./models/dataBase');
const registrationRouting = require('./routing/registration.route');
const application = express();
exceptionRoute = ['/api/v1/registration_user', ''];

const pathParentDir = path.resolve(__dirname, '..') + '/';
/* 
* ENVIRONMENT
*/
application.use((req, res, done) => {
    const authToken = req.headers['auth_token'];
    jwt.verify(authToken, 'secret-key-todo-list', (err, savedData) => {
        if (err) {
            done();
            // res.status(403).json({
            //     success: 1,
            //     message: 'Auth-Token is not valid',
            // })
        } else {
            if (conf.isProduction) {
                const protocol = req.get('x-forwarded-proto');
                protocol === 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
            }
            done();
        }
    });
});
if (!conf.isProduction) {
    application.use(morgan('combined'));
}

application.use(bodyParser.urlencoded({ extended: false }));
application.use(bodyParser.json({ limit: '50mb', extended: true }));
application.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
application.use('/static', express.static(__dirname + '/public'));
application.use(registrationRouting);
//
(async function onBootstrapApplication() {
    try {
        await dataBase.connect();
        application.listen(conf.serverPort, () => {
            console.log('Application is started on port -', conf.serverPort, '\tCurrent date: \t', new Date().getSeconds());
        });
    } catch (e) {
        throw Error(e);
    }
}());
