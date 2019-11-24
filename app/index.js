const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
// REDIS.
const dataBase = require('./models/dataBase');
const registrationRouting = require('./routing/registration.route');
const application = express();

const pathParentDir = path.resolve(__dirname, '..') + '/';
/* 
* ENVIRONMENT
*/
application.use((req, res, done) => {
    const authToken = req.headers['auth_token'];
    jwt.verify(authToken, 'secret-key-todo-list', (err, savedData) => {
        if (err) {
            res.status(403).json({
                success: 1,
                message: 'Auth-Token is not valid',
            })
        } else {
            if (process.env.NODE_ENV === 'production') {
                const protocol = req.get('x-forwarded-proto');
                protocol === 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
            }
            done();
        }
    });
});
if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: pathParentDir + 'config.dev.env' });
    application.use(morgan('combined'));
} else {
    dotenv.config({ path: pathParentDir + 'config.prod.env' });
}
//
application.use(bodyParser.urlencoded({ extended: false }));
application.use(bodyParser.json({ limit: '50mb', extended: true }));
application.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
application.use('/static', express.static(__dirname + '/public'));
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
