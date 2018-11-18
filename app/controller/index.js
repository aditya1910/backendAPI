const express = require('express');

const authenticateSession = require('../middleware/authenticateRoute');
const router = express.Router();

//const appRoutes = require('./app');
const monitorRoutes = require('./monitor');

const Monior = require('../../lib/service/monitor');


const monitoObj = new Monior();

let myVar = setInterval(function(){ monitoObj.makeRequest() }, 1000);


// App routs are login and sign-up which do not require session check
//router.use('/app', appRoutes);
//router.use(authenticateSession); // Routes below this needs session verification if the user is logged in or not
router.use('/monitor', monitorRoutes);

module.exports = router;
