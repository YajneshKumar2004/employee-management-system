const model = require('../model/employee-model');

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

exports.createEmployee = async (req, res) => {
    try {
        const { ename, eemail, epass, erole } = req.body;
        
        if (!ename || !eemail || !epass || !erole) {
            return res.render('signup', {
                error: 'All fields are required',
                formData: req.body
            });
        }

        await model.addEmployee(ename, eemail, epass, erole);
        return res.redirect('/view-employees');
    } catch (err) {
        console.error('Error creating employee:', err);
        return res.render('signup', {
            error: 'Error creating employee. Please try again.',
            formData: req.body
        });
    }
}

exports.loginEmployee = async (req, res) => {
    try {
        const { eemail, epass } = req.body;
        
        if (!eemail || !epass) {
            return res.render('login', {
                error: 'Email and password are required'
            });
        }

        const employee = await model.getEmployeeByEmailAndPassword(eemail, epass);
        
        if (employee) {
            // Employee exists, redirect to view-employees page
            return res.redirect('/view-employees');
        } else {
            // Employee doesn't exist, show error and render login page
            return res.render('login', {
                error: 'Employee doesn\'t exist. Please check your email and password.'
            });
        }
    } catch (err) {
        console.error('Error during login:', err);
        return res.render('login', {
            error: 'Error during login. Please try again.'
        });
    }
}

exports.showUpdateEmployee = async (req, res) => {
    try {
        const { eid } = req.query;
        
        if (!eid) {
            return res.redirect('/view-employees');
        }

        const employee = await model.getEmployeeId(eid);
        
        if (!employee) {
            return res.render('update-employee', {
                error: 'Employee not found'
            });
        }

        return res.render('update-employee', {
            employee: employee
        });
    } catch (err) {
        console.error('Error fetching employee for update:', err);
        return res.render('update-employee', {
            error: 'Error loading employee data. Please try again.'
        });
    }
}

exports.updateEmployee = async (req, res) => {
    try {
        const { eid, ename, eemail, epass, erole } = req.body;
        
        if (!eid || !ename || !eemail || !epass || !erole) {
            const employee = await model.getEmployeeId(eid);
            return res.render('update-employee', {
                error: 'All fields are required',
                employee: employee || { eid, ename, eemail, epass, erole }
            });
        }

        const updated = await model.updateEmployee(ename, eemail, epass, erole, eid);
        
        if (updated) {
            return res.redirect('/view-employees');
        } else {
            const employee = await model.getEmployeeId(eid);
            return res.render('update-employee', {
                error: 'Failed to update employee. Please try again.',
                employee: employee
            });
        }
    } catch (err) {
        console.error('Error updating employee:', err);
        const employee = await model.getEmployeeId(req.body.eid);
        return res.render('update-employee', {
            error: 'Error updating employee. Please try again.',
            employee: employee || req.body
        });
    }
}

exports.deleteEmployee = async (req, res) => {
    try {
        const { eid } = req.query;
        
        if (!eid) {
            return res.redirect('/view-employees');
        }

        await model.removeEmployee(eid);
        return res.redirect('/view-employees');
    } catch (err) {
        console.error('Error deleting employee:', err);
        return res.redirect('/view-employees');
    }
}