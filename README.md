# Module 12 Challenge Project - SQL Challenge: Employee Tracker
This program is a CLI application using node.js to run it. After starting the application your prompted with a menu of options to perform on this MySQL database. In this employee tracker database you have three tables, Department, Role and Employee. Each table has specific detail regarding the employee in question. The database has been preloaded with 8 employees to give you a good sense of the applications flexibility and usage.


## Running the Employee Tracker.
* From the Terminal prompt, in this projects main folder, type "npm start". This will start the Employee Tracker application that will being prompting with this question, <b>"What would you like to do?"</b> and a menu of options to choose from.
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
https://drive.google.com/file/d/1ZGR6TusUW8RHFgSMbMSODlLoTtU0o-cM/view


### Screen Shots.
* npm start
![image](https://user-images.githubusercontent.com/108200823/193872288-cc239efb-91a7-4810-bf56-f9a8e0ecf908.png)
![image](https://user-images.githubusercontent.com/108200823/193872411-c742ab72-eb6a-4a0c-b969-97378a37fa64.png)
![image](https://user-images.githubusercontent.com/108200823/193872466-9be02d37-697f-4f6a-8159-d56349ddf6ad.png)
![image](https://user-images.githubusercontent.com/108200823/193872538-2983828f-0c1a-43bf-9454-2be3d4f84dd4.png)
![image](https://user-images.githubusercontent.com/108200823/193872629-a3905162-bbfd-4da6-885e-6ea1dd2989b7.png)
![image](https://user-images.githubusercontent.com/108200823/193872673-3c0f7e52-aadf-4f99-8c33-24cbbd3759fa.png)
![image](https://user-images.githubusercontent.com/108200823/193872719-c0223ac3-3f7f-47a0-9677-685fde580c57.png)
![image](https://user-images.githubusercontent.com/108200823/193872800-bd0649b6-e5f9-4af9-a5b9-21b640823ca0.png)
