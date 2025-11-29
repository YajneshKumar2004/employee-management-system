const pool = require('../config/db')

exports.getAllEmployees = () => {
    return pool.query('select * from ems');
};

exports.getEmployeeId = async (id) => {
    try {
        const [rows] = await pool.execute('select * from ems where eid=?', [id])
        return rows[0];
    } catch (err) {
        alert("Error in getEmployeeId");
        console.log("Error in getEmployeeId");
        throw err;
    }
}

exports.addEmployee = (name, email, password, role) => {
    try{
        return pool.execute(
            'insert into ems(ename, eemail, epass, erole) values(?,?,?,?)',
            [name, email, password, role]
        );
    } catch(err) {
        alert("Error in addEmployee");
        console.log('Erroro in addEmployee', err);
        throw err;
    }
}

exports.updateEmployee = async (name, email, password, role, id) => {
    try{
        const [result] = await pool.execute(
            'update ems set ename = ?, eemail = ?, epass=?, erole=? where eid=?',
            [name, email, password, role, id] 
        );
        return result.affectedRows > 0;
    } catch(err) {
        console.log(`Error in updateEmployee `, err);
        throw err;
    }
}

exports.removeEmployee = (id) => {
    try {
        return pool.execute('delete from ems where eid=?', [id]);
    } catch (err) {
        alert("Error in removeEmployee")
        console.log("Error in removeEmployee")
        throw err;
    }
}