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
const FLD_LEN             = 50;
const roles               = [
  "Engineering",
  "Finance",
  "Legal",
  "Sales"
];
const mainMenu            = [
  new inquirer.Separator(),
  "View All Employees",
  "Add Employee",
  "Update Employee Role",
  "View All Roles",
  "Add Role",
  "View All Departments",
  "Add Department",
  new inquirer.Separator(),
  printRedText("Quit")
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


// Setup Adding Role Prompt
const addRolePrompt = async () => {

  // Preload role choices before prompting.
  const results = await runQuery("SELECT name from department;", "GET");
  const depts = [];
  results.forEach(dept => depts.push(JSON.stringify(dept.name)));

  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: `What is the name of the role? `.padStart(FLD_LEN),
    },
    {
      type: 'input',
      name: 'salary',
      message: `What is the salary of the role? `.padStart(FLD_LEN),
      validate: function (salary) {
        valid = !(/\D/.test(salary));
        if (valid) return true;
        console.log(".  " + printRedText("Salary must be numeric."));
        return false;
      }
    },
    {
      type: "list",
      name: "dept",
      message: "Which department does the role belong to?",
      choices: depts,
    },
  ]);
};


// Setup Add Department Prompt
const addDeptPrompt = () => {

  return inquirer.prompt([
    {
      type: 'input',
      name: 'dept',
      message: `What is the name of the department? `.padStart(FLD_LEN),
    },
  ]);
};


// Setup Adding Role Prompt
const addEmployeePrompt = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'fname',
      message: `What is the employee's first name? `.padStart(FLD_LEN),
    },
    {
      type: 'input',
      name: 'lname',
      message: `What is the employee's last name? `.padStart(FLD_LEN),
    },
    {
      type: "list",
      name: "role",
      message: "What is the employee's role?",
      choices: runQuery("SELECT title from role;", "GET"),
    },
    {
      type: "list",
      name: "manager",
      message: "Who is the employee's manager?",
      choices: runQuery("SELECT manager from managers;", "GET"),
    },
  ]);
};


// Setup Adding Role Prompt
const updateEmployeeRolePrompt = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'employee',
      message: `Which employee's role do you want to update? `.padStart(FLD_LEN),
      choices: runQuery("SELECT CONCAT(first_name,' ', last_name) as employee from employee;", "GET"),
    },
    {
      type: "list",
      name: "role",
      message: "Which role do you want to assign the selected employee? ",
      choices: runQuery("SELECT title from role;", "GET"),
    },
    {
      type: "list",
      name: "role",
      message: "What is the employee's role?",
      choices: runQuery("SELECT title from role;", "GET"),
    },
    {
      type: "list",
      name: "manager",
      message: "Who os the employee's manager?",
      choices: runQuery("SELECT manager from managers;", "GET"),
    },
  ]);
};


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


// Display detail on console.
async function promptUsers(results) {
  console.log("\n" + conTable.getTable(results));
}


/**
 * Run individual queries to build a temporary Managers table to obtain the manager for
 * each specific employee.
 */
async function showEmployees() {
  await runQuery(`DROP TABLE IF EXISTS managers;`);
  await runQuery(`CREATE TABLE managers (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, manager VARCHAR(61)) SELECT manager_id, concat(first_name,' ',last_name) as manager FROM employee;`);
  await runQuery(`UPDATE managers INNER JOIN employee ON managers.id = employee.id SET managers.manager = CONCAT(employee.first_name, ' ', employee.last_name);`);
  await runQuery(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, managers.manager FROM employee inner join role on employee.id = role.id inner join department on department.id = role.department_id left join managers on employee.manager_id = managers.id;`, "LOG");
}


/**
 * Display information at the top of the terminal after clearing
 * the screen.
 * @param {*} msg 
 */
function screenTitle(msg) {
  //clear();
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
        
    .then(async (answers) => {
  
      switch (answers.menu) {

        case "View All Employees":
          await showEmployees();
          break;

        case "Add Employee":
          break;

        case "Update Employee Role":
          break;

        case "View All Roles":
          // Get a list roles.
          await runQuery(`SELECT role.id, role.title, department.name as department, role.salary FROM employee inner join role on employee.id = role.id inner join department on department.id = role.department_id;`, "LOG");
          break;

        case "Add Role":
          await addRole();
          break;

        case "View All Departments":
          // Get a list of departments.
          await runQuery(`SELECT * FROM department`,"LOG");
          break;

        case "Add Department":
          await addDepartment();
          break;

        case printRedText("Quit"):
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
  

  /**
   * 
   */
  async function addDepartment() {


    await runQuery('OPTIMIZE TABLE employee;');
    await addDeptPrompt()
          
      .then((answers) => {
    
        let dept = answers.dept.trim();
        if (dept) 
          console.log("New department: " + dept);
        else
          console.log("NO DEPARTMENT WAS ENTERED!"); 
    
      })
      .catch((err) => console.error(err))
  }

  
  async function addRole() {

    await runQuery('OPTIMIZE TABLE role;');
    await addRolePrompt()
          
      .then((answers) => {
    
        let roleName = answers.name.trim();
        let salary   = answers.salary;
        let dept     = answers.dept;

        if (roleName) 
          console.log("Add role: " + roleName + "   salary: " + salary + "   dept: " + dept);
        else
          console.log("NO ROLE WAS ENTERED!"); 
    
      })
      .catch((err) => console.error(err))
  }
    
  cliMainMenu();