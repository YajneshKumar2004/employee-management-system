const express = require('express')
const router = express.Router();
const controller = require('../controller/employee-controller')

router.get('/home', controller.showHomepage);

router.get('/signup', controller.showSignup);
router.post('/signup', controller.createEmployee);
router.get('/login', controller.showLogin);
router.post('/login', controller.loginEmployee);
router.get('/view-employees', controller.showAllEmployees);
router.get('/update', controller.showUpdateEmployee);
router.post('/update', controller.updateEmployee);
router.get('/delete', controller.deleteEmployee);

module.exports = router;