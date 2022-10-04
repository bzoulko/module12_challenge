# Module 12 Challenge Project - SQL Challenge: Employee Tracker
This program is a CLI application using node.js to run it. After starting the application your prompted with a menu of options to perform on this MySQL database. In this employee tracker database you have three tables, Department, Role and Employee. Each table has specific detail regarding the employee in question. The database has been preloaded with 8 employees to give you a good sense of the applications flexibility and usage.


## Running the Employee Tracker.
* From the Terminal prompt, in this projects main folder, type "npm start". This will start the Employee Tracker application that will being prompting with this question, <b>"What would you like to do?"<b> and a menu of options to choose from.
    - "View All Employees" : Lists all employees available.

    - "Add Employee" : Add a new employee to the table of employee's, you'll be prompted for additional questions.
        - What is the employee's first name?
        - What is the employee's last name?
        - What is the employee's role? : Displays a selection list.
        - Who is the employee's manager? : Displays a selection list.

    - "Update Employee Role" : Updates the employee role, you'll be prompted for additional questions.
        - Which employee's role do you want to update? : Displays a selection list.
        - Which role do you want to assign the selected employee? : Displays a selection list.

    - "View All Roles" : Lists all roles available.

    - "Add Role" : Add a new role to the table of role's, you'll also be prompted with the following questions an options.
        - What is the name of the role?
        - What is the salary of the role?
        - Which department does the role belong to? : Displays a selection list.

    - "View All Departments" : Lists all departments available.

    - "Add Department" : Add a new department to the table of department's, you'll also be prompted with the following question.
        - What is the name of the department?


    # Bonus Menu Items 
    - "Update Employee Managers" : Did not have enough time to get the bonus item done.

    - "View Employees by Manager" : Sorts the employee table by manager and lists it.

    - "View Employees by Department" : Sorts the employee table by department and lists it.

    - "Delete Departments, roles and employees" : Did not have enough time to get the bonus item done.

    - "View the total utilized budget of a department" : Did not have enough time to get the bonus item done.

    - "Quit" : Exit the application.


First and foremost, I've right justified all questions to help you visually. The primary question, for the main menu, is colored yellow. This helps considerably when knowing you're back at the main menu. I have also colored and separated the "Quit" menu option to you pin point it when you want to exit the application.


### Special Notes:
* The index.js file contains all of the logic for this application.

* A dbutil.js file in the source directory maintains the database connections and the base query logic.

* Packages installed for this application were:
    - MySQL2 : Controls database activity and connection.
    - inquirer : Handles all the promting features for the CLI.
    - Console.Table : Displays tables on the terminal in an easy to read view.
    - express : Turns out I did not need this module for this application.

* Link to walkthrough video.
https://drive.google.com/file/d/14DzLTL5-Aj-2XCh-BK5h1KnexE9ckn6b/view


### Screen Shots.
* npm start


