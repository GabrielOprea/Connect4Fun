DROP DATABASE connect;

-- Create Database
CREATE DATABASE connect;
USE connect;

-- Create User table
CREATE TABLE User (
                      UserID INT AUTO_INCREMENT PRIMARY KEY,
                      Username VARCHAR(255),
                      LastName VARCHAR(255),
                      FirstName VARCHAR(255),
                      Role VARCHAR(255),
                      Email VARCHAR(255) UNIQUE,
                      Password VARCHAR(255),
                      PhoneNumber VARCHAR(15),
                      ProfilePicture VARCHAR(255),
                      Gender VARCHAR(10),
                      Interests VARCHAR(255),
                      Location VARCHAR(255),
                      Bio TEXT,
                      RegistrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Activity table
CREATE TABLE Activity (
                          ActivityID INT AUTO_INCREMENT PRIMARY KEY,
                          UserID INT,
                          ActivityName VARCHAR(255),
                          Description TEXT,
                          Category VARCHAR(255),
                          FOREIGN KEY (UserID) REFERENCES User(UserID)
);

-- Create Event table
CREATE TABLE Event (
                       EventID INT AUTO_INCREMENT PRIMARY KEY,
                       ActivityID INT,
                       UserID INT,
                       Status VARCHAR(20),
                       Location VARCHAR(255),
                       Date DATE,
                       Time TIME,
                       CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       FOREIGN KEY (ActivityID) REFERENCES Activity(ActivityID),
                       FOREIGN KEY (UserID) REFERENCES User(UserID)
);

-- Create Conversation table
CREATE TABLE Conversation (
                              ConversationID INT AUTO_INCREMENT PRIMARY KEY,
                              EventID INT,
                              UserID INT,
                              CreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                              FOREIGN KEY (EventID) REFERENCES Event(EventID),
                              FOREIGN KEY (UserID) REFERENCES User(UserID)
);

-- Create Message table
CREATE TABLE Message (
                         MessageID INT AUTO_INCREMENT PRIMARY KEY,
                         ConversationID INT,
                         Content TEXT,
                         Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         Status VARCHAR(20),
                         FOREIGN KEY (ConversationID) REFERENCES Conversation(ConversationID)
);

-- Create Review table
CREATE TABLE Review (
                        ReviewID INT AUTO_INCREMENT PRIMARY KEY,
                        UserID INT,
                        LastName VARCHAR(255),
                        FirstName VARCHAR(255),
                        Rating INT,
                        Comment TEXT,
                        Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        FOREIGN KEY (UserID) REFERENCES User(UserID)
);