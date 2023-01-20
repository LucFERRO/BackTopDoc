CREATE TABLE _User_(
   user_id COUNTER,
   lastname VARCHAR(50),
   firstname VARCHAR(50),
   mail VARCHAR(50),
   password VARCHAR(250),
   birthdate DATE,
   phone_number VARCHAR(50),
   PRIMARY KEY(user_id)
);

CREATE TABLE Token(
   token_id COUNTER,
   token VARCHAR(50),
   user_id INT NOT NULL,
   PRIMARY KEY(token_id),
   FOREIGN KEY(user_id) REFERENCES _User_(user_id)
);

CREATE TABLE Doctor(
   user_id INT,
   activity VARCHAR(50),
   PRIMARY KEY(user_id),
   FOREIGN KEY(user_id) REFERENCES _User_(user_id)
);

CREATE TABLE Address(
   address_id COUNTER,
   address_number INT,
   street_name VARCHAR(50),
   zip_code VARCHAR(50),
   user_id INT NOT NULL,
   PRIMARY KEY(address_id),
   FOREIGN KEY(user_id) REFERENCES _User_(user_id)
);

CREATE TABLE Planning(
   planning_id TEXT,
   planning_name VARCHAR(50),
   planning_start DATE,
   planning_end DATE,
   user_id INT NOT NULL,
   PRIMARY KEY(planning_id),
   FOREIGN KEY(user_id) REFERENCES Doctor(user_id)
);

CREATE TABLE Workday(
   workday_id COUNTER,
   workday_number INT,
   workday_start TIME,
   workday_end TIME,
   slot_duration_minutes INT,
   PRIMARY KEY(workday_id)
);

CREATE TABLE Ban(
   ban_id COUNTER,
   ban_reason VARCHAR(50),
   ban_date DATETIME,
   user_id INT NOT NULL,
   PRIMARY KEY(ban_id),
   FOREIGN KEY(user_id) REFERENCES _User_(user_id)
);

CREATE TABLE Vacation(
   vacation_id COUNTER,
   vacation_start DATE,
   vacation_end DATE,
   user_id INT NOT NULL,
   PRIMARY KEY(vacation_id),
   FOREIGN KEY(user_id) REFERENCES Doctor(user_id)
);

CREATE TABLE Background(
   background_id COUNTER,
   PRIMARY KEY(background_id)
);

CREATE TABLE Patient(
   user_id INT,
   secu_number VARCHAR(50),
   background_id INT NOT NULL,
   PRIMARY KEY(user_id),
   FOREIGN KEY(user_id) REFERENCES _User_(user_id),
   FOREIGN KEY(background_id) REFERENCES Background(background_id)
);

CREATE TABLE Appointement(
   user_id INT,
   user_id_1 INT,
   appointement_date DATE,
   appointement_duration_minutes INT,
   appointement_reason VARCHAR(50),
   PRIMARY KEY(user_id, user_id_1, appointement_date),
   FOREIGN KEY(user_id) REFERENCES Patient(user_id),
   FOREIGN KEY(user_id_1) REFERENCES Doctor(user_id)
);

CREATE TABLE Establish(
   planning_id TEXT,
   workday_id INT,
   PRIMARY KEY(planning_id, workday_id),
   FOREIGN KEY(planning_id) REFERENCES Planning(planning_id),
   FOREIGN KEY(workday_id) REFERENCES Workday(workday_id)
);