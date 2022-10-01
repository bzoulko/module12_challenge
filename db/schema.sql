/*
    Created:    10/01/2022 
    Programmer: Brian Zoulko
    Notes:      Devopled Schema SQL module to build the initial database and tables.

    Modification
    ============
    10/01/2022 Brian Zoulko    Initial creation of sql module.    
*/

-- Make sure the database does not already exists, if so, delete it to start fresh. --
DROP DATABASE IF EXISTS employee_tracker_db;

-- Create database --
CREATE DATABASE employee_tracker_db;

-- Point to the database --
USE employee_tracker_db;


/* Department Table */
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL                                                     -- department name --
);


/* Role Table */
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,                                                   -- role title --
  salary DECIMAL,                                                               -- role salary --
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL      -- Reference to department role --
);


/* Employee Table */
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,                                              -- employee first name --
  last_name VARCHAR(30) NOT NULL,                                               -- employee last name --
  role_id INT, 
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,                 -- Reference to employee role --
  manager_id INT,
  FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL           -- Allow nulls, when no manager --
);
