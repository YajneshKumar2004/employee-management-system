const express = require('express')
const router = express.Router();
const controller = require('../controller/employee-controller')

router.get('/home', controller.showHomepage);

router.get('/signup', controller.showSignup);
router.get('/login', controller.showLogin);
router.get('/view-employees', controller.showAllEmployees);

module.exports = router;