/*
    Created:    10/01/2022 
    Programmer: Brian Zoulko
    Notes:      Devopled JAVASCRIPT module as an Employee Tracker via CLI.

    Modification
    ============
    10/01/2022 Brian Zoulko    Initial creation of js module.    
*/

// Required modules for this application.
const inquirer            = require('inquirer');      // Prompt features for CLI.
const fs                  = require('fs');            // File System I/O.
const path                = require('path');          // Current file path.
const mySQL               = require('mysql2');        // Attach to mySQL database.
const conTable            = require('console.table'); // Prints MySQL rows to the console.
const { clear, Console }  = require('console');       // Clear console area on demand.


// Barrowed logic idea from Bootcamp - Week(5) - Day(3) - 08-Stu_for-of/Unsolved/index.js
const printBlueBkgrndText = (text) => `\x1b[44m${text}\x1b[0m`;
const printUnderLineText  = (text) => `\x1b[4m\x1b[33m${text}\x1b[0m`;
const printRedText        = (text) => `\x1b[31m${text}\x1b[0m`; 
const printYellowText     = (text) => `\x1b[33m${text}\x1b[0m`; 
const FLD_LEN = 38;


// Create the connection to database
const DATABASE = 'employee_tracker_db';
const connection = mySQL.createConnection({
  host: 'localhost',
  user: 'bootcamp',
  database: DATABASE
  },

  console.log(`Connected Employee Tracker Database.`)

);

console.log("process ran...");