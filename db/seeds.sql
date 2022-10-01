/*
    Created:    10/01/2022 
    Programmer: Brian Zoulko
    Notes:      Devopled Seed SQL module to pre-build the tables.

    Modification
    ============
    10/01/2022 Brian Zoulko    Initial creation of sql module.    
*/

-- Load Departments --
INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");


-- Load Roles --
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead",           100000,     1),
       ("Salesperson",           80000,     1),
       ("Lean Engineer",        150000,     2),
       ("Software Engineer",    120000,     2),
       ("Account Manager",      160000,     3),
       ("Accountant",           125000,     3),
       ("Legal Team Lead",      250000,     4),
       ("Lawyer",               190000,     4);
       

-- Load Employees --       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John",     "Doe",          1,     null),
       ("Mike",     "Chan",         1,     1),
       ("Ashley",   "Rodriguez",    2,     null),
       ("Kevin",    "Tupik",        2,     3),
       ("Kural",    "Singh",        3,     null),
       ("Malia",    "Brown",        3,     5),
       ("Sarah",    "Lourd",        4,     null),
       ("Tom",      "Allen",        4,     7);
       
