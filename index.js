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
const conTable            = require('console.table'); // Prints MySQL rows to the console.
const { clear, Console }  = require('console');       // Clear console area on demand.
const dbQuery             = require('./src/dbutil.js');// Database Utility for making query selects.


// Barrowed logic idea from Bootcamp - Week(5) - Day(3) - 08-Stu_for-of/Unsolved/index.js
const printBlueBkgrndText = (text) => `\x1b[44m${text}\x1b[0m`;
const printUnderLineText  = (text) => `\x1b[4m\x1b[33m${text}\x1b[0m`;
const printRedText        = (text) => `\x1b[31m${text}\x1b[0m`; 
const printYellowText     = (text) => `\x1b[33m${text}\x1b[0m`;
const mainMenu = [
  new inquirer.Separator(),
  "View All Employees",
  "Add Employee",
  "Update Employee Role",
  "View All Roles",
  "Add Role",
  "View All Departments",
  "Add Department",
  new inquirer.Separator(),
  "Quit"
];


// Setup Main Menu Prompt
const menuPrompt = () => {
  return inquirer.prompt([
      {
      type: "list",
      name: "menu",
      message: printYellowText(`What would you like to do? `),
      choices: mainMenu,
      }
  ]);
};


// // Sync/Await processing along side promise to ensure sequential processing.
// async function runQuery (query) {
//   try{

//     // Get a list roles.
//     const roles = await dbQuery.Select(`SELECT * FROM role`);
//     console.log("\n\n Role");
//     console.log(conTable.getTable(roles));    

//     // Get a list of Employees.
//     const employees = await dbQuery.Select(`SELECT * FROM employee`);
//     console.log("\n\n Employee");
//     console.log(conTable.getTable(employees));

//     // Get managers name for each employee.
//     for (var x = 0; x < employees.length; x++) {    

//       // Search through all employees with a valid manager's id to obtain
//       // that employees full name.
//       let employee = employees[x];
//       if (employee.manager_id !== null) {
//         const emps = await dbQuery.Select("SELECT *, CONCAT(first_name,' ',last_name) as full_name FROM employee where id = " + employee.manager_id + ";");
//         emps.forEach(emp => employee.manager_name = emp.full_name);
//       }

//       // Update table array/object with employee managers name.
//       employees[x] = employee;
//     };

//     console.log("\n\n Updated Employee");
//     console.log(conTable.getTable(employees));

//   } catch(error){

//     console.log(error);

//   }
// }

//runQueries();

// Sync/Await processing along side promise to ensure sequential processing
// and display results on terminal.
async function runQuery (query, type) {
  try{
    
    const results = await dbQuery.Select(query);
    switch (type) {
      case "LOG":
        await promptUsers(results)
        break;
      
      case "GET":
        return (results);

      default:
        return;
    }

  } catch(error){

    console.log(error);

  }
}



// /**
//  * Display All Employees.
//  */
// async function showEmployees() {
//   // Get a list of Employees.
//   //const employees = await dbQuery.Select(`SELECT * FROM employee`);
//   const employees = await runQuery(`SELECT * FROM employee`,"GET");

//   // Get managers name for each employee.
//   for (var x = 0; x < employees.length; x++) {    

//     // Search through all employees with a valid manager's id to obtain
//     // that employees full name.
//     let employee = employees[x];
//     if (employee.manager_id !== null) {
//       //const emps = await dbQuery.Select("SELECT *, CONCAT(first_name,' ',last_name) as full_name FROM employee where id = " + employee.manager_id + ";");
//       const emps = await runQuery("SELECT *, CONCAT(first_name,' ',last_name) as full_name FROM employee where id = " + employee.manager_id + ";", "GET");
//       emps.forEach(emp => employee.manager_name = emp.full_name);
//     }

//     // Update table array/object with employee managers name.
//     employees[x] = employee;
//   };

//   await promptUsers(employees);
// }


// Display detail on console.
async function promptUsers(results) {
  console.log("\n" + conTable.getTable(results));
}

async function showEmployees() {
  await runQuery(`DROP TABLE IF EXISTS manager;`);
  await runQuery(`CREATE TABLE manager (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, manager_name VARCHAR(61)) SELECT manager_id, concat(first_name,' ',last_name) as manager_name FROM employee;`);
  await runQuery(`UPDATE manager INNER JOIN employee ON manager.id = employee.id SET manager.manager_name = CONCAT(employee.first_name, ' ', employee.last_name);`);
  await runQuery(`SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, manager.manager_name FROM employee inner join manager on employee.manager_id = manager.id;`, "LOG");
}


/**
 * Display information at the top of the terminal after clearing
 * the screen.
 * @param {*} msg 
 */
function screenTitle(msg) {
  clear();
  console.log("*".repeat(msg.length));
  console.log(printBlueBkgrndText(msg));
  console.log("*".repeat(msg.length));
}


/* ********************************************************

*********************************************************** */
async function cliMainMenu() {

  screenTitle("  E M P L O Y E E   T R A C K E R  ");
  await runQuery('OPTIMIZE TABLE employee;');
  await menuPrompt()
        
    .then((answers) => {
  
      switch (answers.menu) {

        case "View All Employees":
          showEmployees();
          break;

        case "Add Employee":
          break;

        case "Update Employee Role":
          break;

        case "View All Roles":
          // Get a list roles.
          runQuery(`SELECT * FROM role`, "LOG");
          break;

        case "Add Role":
          break;

        case "View All Departments":
          // Get a list of departments.
          runQuery(`SELECT * FROM department`,"LOG");
          break;

        case "Add Department":
          break;

        case "Quit":
          process.exit(0);
          break;
        }
  
    })
    .then(() => {
  
      screenTitle("  E M P L O Y E E   T R A C K E R  ");
      cliMainMenu();
  
    })
    .catch((err) => console.error(err))
  }
    
  cliMainMenu();