/*
    Created:    10/01/2022 
    Programmer: Brian Zoulko
    Notes:      Devopled JAVASCRIPT module for MySQL Database Routines.

    Modification
    ============
    10/01/2022 Brian Zoulko    Initial creation of js module.    
*/

const mySQL = require('mysql2');        // Attach to mySQL database.


/**
 * Setup a thread pool for query selections.
 */
const pool = mySQL.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'bootcamp',
    password: '',
    database: 'employee_tracker_db'
});


/**
 * Query Select function for pooling each request with a
 * new promise.
 * @param {*} query select statement.
 * @returns {object} select results.
 */
const Select = (query) =>{
    return new Promise((resolve, reject) => {
        pool.query(query,  (error, results) => {
            if(error) {

                console.log("\n\nQuery: \n[" + query + "]\n\n");
                return reject(error);
            }
            return resolve(results);
        });
    });
};
  

// Allow access to 'Select' function.
module.exports = {Select};