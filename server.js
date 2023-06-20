/*********************************************************************************
* WEB322 – Assignment 04
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part 
* of this assignment has been copied manually or electronically from any other source 
* (including 3rd party web sites) or distributed to other students.
* 
* Name: __Anshav Parmar____________________ Student ID: ___167833219___________ Date: ____19/06/2023____________
*
********************************************************************************/ 


var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();

app.listen(HTTP_PORT, () => {
  console.log("server listening on port: " + HTTP_PORT);
});

const path = require("path");
const officeData = require("./modules/officeData"); 

app.get("/PartTimer", (req, res) => {
  officeData.getPartTimers()
    .then((employees) => {
      if (employees.length > 0) {
        res.json(employees);
      } else {
        res.json({ message: "no results" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.get("/employee/:num", (req, res) => {
  const num = req.params.num;
  officeData.getEmployeeByNum(num)
    .then((employee) => {
      if (employee) {
        res.json(employee);
      } else {
        res.json({ message: "Employee not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "An error occurred" });
    });
});

app.get("/audio", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "audio.html"));
});

app.get("/video", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "video.html"));
});

app.get("/table", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "table.html"));
});

app.get("/list", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "list.html"));
});

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});
