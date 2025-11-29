const model = require('../model/employee-model');
const { all } = require('../routes/employee-router');

exports.showHomepage = async (req, res) => {
    return res.send('Welcome to home page');
}

exports.showSignup = async (req, res) => {
    return res.render('signup');
}

exports.showLogin = async (req, res) => {
    return res.render('login');
}

exports.showAllEmployees = async (req, res) => {
    const allEmployeesData = await model.getAllEmployees();
    return res.render('view-employee', {
        empDetails: allEmployeesData,
    });
}