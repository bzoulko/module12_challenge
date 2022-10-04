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
  "Update Employee Managers",
  "View Employees by Manager",
  "View Employees by Department",
  "Delete Departments, roles and employees",
  "View the total utilized budget of a department",
  new inquirer.Separator(),
  printRedText("Quit")
];


// Setup Main Menu Prompt
const menuPrompt = () => {
  return inquirer.prompt([
      {
      type: "list",
      name: "menu",
      message: printYellowText(`What would you like to do?`),
      choices: mainMenu,
      }
  ]);
};


// Setup Adding Role Prompt
const addRolePrompt = async () => {

  // Preload role choices before prompting.
  const objDepts = await runQuery("SELECT name from department order by id;", "GET");
  const depts = [];
  objDepts.forEach(item => depts.push(JSON.stringify(item.name)));

  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: `What is the name of the role?`.padStart(FLD_LEN),
    },
    {
      type: 'input',
      name: 'salary',
      message: `What is the salary of the role?`.padStart(FLD_LEN),
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
      message: "Which department does the role belong to?".padStart(FLD_LEN),
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
      message: `What is the name of the department?`.padStart(FLD_LEN),
    },
  ]);
};


// Setup Adding Role Prompt
const addEmployeePrompt = async () => {

  // Preload role choices before prompting.
  const objRole = await runQuery("SELECT title from role;", "GET");
  const title = [];
  objRole.forEach(item => title.push(JSON.stringify(item.title)));
  

  // Preload managers choices before prompting.
  const objMgr = await runQuery("SELECT manager from managers;", "GET");
  const managers = [];
  objMgr.forEach(item => managers.push(JSON.stringify(item.manager)));
  
  return inquirer.prompt([
    {
      type: 'input',
      name: 'fname',
      message: `What is the employee's first name?`.padStart(FLD_LEN),
    },
    {
      type: 'input',
      name: 'lname',
      message: `What is the employee's last name?`.padStart(FLD_LEN),
    },
    {
      type: "list",
      name: "title",
      message: "What is the employee's role?".padStart(FLD_LEN),
      choices: title,
    },
    {
      type: "list",
      name: "manager",
      message: "Who is the employee's manager?".padStart(FLD_LEN),
      choices: managers,
    },
  ]);
};


// Setup Adding Role Prompt
const updateEmployeeRolePrompt = async() => {

  // Preload managers choices before prompting.
  const objEmp = await runQuery("SELECT CONCAT(first_name,' ', last_name) as employee from employee;", "GET");
  const employees = [];
  objEmp.forEach(item => employees.push(JSON.stringify(item.employee)));

  // Preload role choices before prompting.
  const objRole = await runQuery("SELECT title from role;", "GET");
  const titles = [];
  objRole.forEach(item => titles.push(JSON.stringify(item.title)));
  
  return inquirer.prompt([
    {
      type: 'list',
      name: 'employee',
      message: `Which employee's role do you want to update?`.padStart(FLD_LEN),
      choices: employees,
    },
    {
      type: "list",
      name: "title",
      message: "Which role do you want to assign the selected employee?".padStart(FLD_LEN),
      choices: titles,
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
async function showEmployees(sortBy) {
  if (sortBy === null) sortBy = '';
  await runQuery(`DROP TABLE IF EXISTS managers;`);
  await runQuery(`CREATE TABLE managers (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, manager VARCHAR(61)) SELECT manager_id, concat(first_name,' ',last_name) as manager FROM employee;`);
  await runQuery(`UPDATE managers INNER JOIN employee ON managers.id = employee.id SET managers.manager = CONCAT(employee.first_name, ' ', employee.last_name);`);
  await runQuery(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, managers.manager FROM employee inner join role on employee.id = role.id inner join department on department.id = role.department_id left join managers on employee.manager_id = managers.id ${sortBy};`, "LOG");
}


/**
 * Display information at the top of the terminal after clearing
 * the screen.
 */
function screenTitle() {
  clear();
  let msg = "                 ";
  console.log("*".repeat(msg.length));  
  console.log(printBlueBkgrndText(msg));
  console.log(printBlueBkgrndText(" E m p l o y e e "));
  console.log(printBlueBkgrndText(" M a n a g e r   "));
  console.log(printBlueBkgrndText(msg));
  console.log("*".repeat(msg.length));
}


/* ******************************
 Main CLI Menu selection routine.
********************************* */
async function cliMainMenu() {

  await runQuery('OPTIMIZE TABLE employee;');
  await menuPrompt()
        
    .then(async (answers) => {
  
      switch (answers.menu) {

        case "View All Employees":
          await showEmployees("");
          break;

        case "Add Employee":
          await addEmployee();
          break;

        case "Update Employee Role":
          await updateEmployeeRole();
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

          
        // BONUS ITEMS....
        case "Update Employee Managers":
          await underconstruction();
          break;
        case "View Employees by Manager":
          await showEmployees("ORDER BY manager");
          break;
        case "View Employees by Department":
          await showEmployees("ORDER BY department");
          break;
        case "Delete Departments, roles and employees":
          await underconstruction();
          break;
        case "View the total utilized budget of a department":
          await underconstruction();
          break;
        // BONUS ITEMS....


        case printRedText("Quit"):
          process.exit(0);
          break;
        }
  
    })
    .then(() => {
  
      cliMainMenu();
  
    })
    .catch((err) => console.error(err))
  }
  

  async function underconstruction(){
    console.log("Sorry, still under construction...👷‍♂️");
    await pause(1300);
  }


  /**
   * Function ADDs a new department.
   */
  async function addDepartment() {
    
    await runQuery('OPTIMIZE TABLE department;');
    await addDeptPrompt()
          
      .then(async (answers) => {
    
        // Capture passing arguments from command line prompts.
        let dept = answers.dept.trim().replace(`"`,``).replace(`"`,``);

        // Insert new department.
        if (dept) {
          console.log("New department: " + dept);
          await runQuery(`INSERT into department(name) values ("${dept}")`);
          await runQuery('OPTIMIZE TABLE department;');
          console.log("Added " + dept + " to the database");
        } else {
          console.log("NO DEPARTMENT WAS ENTERED!"); 
        }
        await pause(300);

      })
      .catch((err) => console.error(err))
  }

  
  /**
   * Function ADDs a new role.
   */
  async function addRole() {

    await runQuery('OPTIMIZE TABLE role;');
    await addRolePrompt()
          
      .then(async (answers) => {
    
        // Capture passing arguments from command line prompts.
        let title   = answers.name.trim().replace(`"`,``).replace(`"`,``);
        let salary  = answers.salary;
        let dept    = answers.dept.replace(`"`,``).replace(`"`,``);

        // Get the department id from the department name selected.
        const objIds = await runQuery(`SELECT id from department WHERE name="${dept}" limit 1;`, "GET");
        const ids = [];
        objIds.forEach(item => ids.push(JSON.stringify(item.id)));

        // Insert new role.
        if (title && salary && dept) {
          await runQuery(`INSERT into role(title, salary, department_id) values ("${title}",${salary},${ids[0]})`);
          await runQuery('OPTIMIZE TABLE role;');
          console.log("Added " + title + " to the database");
        } else {
          console.log("NO ROLE WAS ENTERED!"); 
        }
        await pause(300);
    
      })
      .catch((err) => console.error(err))
  }

  
  /**
   * Function ADDs a new employee.
   */
  async function addEmployee() {
  
    await runQuery('OPTIMIZE TABLE employee;');
    await addEmployeePrompt()
          
      .then(async (answers) => {
    
        // Capture passing arguments from command line prompts.
        let fname   = answers.fname.trim().replace(`"`,``).replace(`"`,``);
        let lname   = answers.lname.trim().replace(`"`,``).replace(`"`,``);
        let title   = answers.title.trim().replace(`"`,``).replace(`"`,``);
        let mgr     = answers.manager.trim().replace(`"`,``).replace(`"`,``).split(" ");

        // Get the role id from the title selected.
        const roleIds = await runQuery(`SELECT id from role WHERE title="${title}" limit 1;`, "GET");
        const rIds = [];
        roleIds.forEach(item => rIds.push(JSON.stringify(item.id)));

        // Get the manager id from the manager selected.
        const mgrIds = await runQuery(`SELECT id from employee WHERE first_name="${mgr[0]}" and last_name="${mgr[1]}" limit 1;`, "GET");
        const mIds = [];
        mgrIds.forEach(item => mIds.push(JSON.stringify(item.id)));

        // Insert new employee.
        if (fname && lname && title && mgr) {
          await runQuery(`INSERT into employee(first_name, last_name, role_id, manager_id) values ("${fname}","${lname}",${rIds[0]},${mIds[0]})`);
          await runQuery('OPTIMIZE TABLE employee;');
          console.log("Added " + fname + " " + lname + " to the database");
        } else {
          console.log("ROLE WAS NOT FULLY ENTERED!"); 
        }
        await pause(300);

      })
      .catch((err) => console.error(err))
  }


  /**
   * Function UPDATES Employee's Role.
   */
  async function updateEmployeeRole() {

    await runQuery('OPTIMIZE TABLE role;');
    await updateEmployeeRolePrompt()
          
      .then(async (answers) => {
    
        // Capture passing arguments from command line prompts.
        let employee = answers.employee.trim().replace(`"`,``).replace(`"`,``).split(" ");
        let title    = answers.title.trim().replace(`"`,``).replace(`"`,``);

        // Get the role id from the title selected.
        const roleIds = await runQuery(`SELECT id from role WHERE title="${title}" limit 1;`, "GET");
        const rIds = [];
        roleIds.forEach(item => rIds.push(JSON.stringify(item.id)));

        // Insert new role.
        if (employee && title) {
          await runQuery(`UPDATE employee SET role_id = ${rIds[0]} where first_name="${employee[0]}" and last_name="${employee[1]}"`);
          await runQuery('OPTIMIZE TABLE employee;');
          console.log("Updated employee's role");
        } else {
          console.log("NO ROLE WAS ENTERED!"); 
        }
        await pause(300);
    
      })
      .catch((err) => console.error(err))
  }
  
  function pause(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  screenTitle();
  cliMainMenu();