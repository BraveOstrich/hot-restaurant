// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Tables and waitlist data
// =============================================================
var maxTables = 5;

var tables = [
  {
    "customerName": "test",
    "phoneNumber": "1214234",
    "customerEmail": "email@email.com",
    "customerID": "123"
  },
  {
    "customerName": "Jim Bob",
    "phoneNumber": "512-459-2222",
    "customerEmail": "jimbob@gmail.com",
    "customerID": "jimbob512"
  }
];

var waitlist = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays all tables
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

// Displays the waitlist
app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});

app.post("/api/tables", function(req, res) {
  var newTable = req.body;
  console.log(newTable);

  // Check if the customer ID already exists in the tables or waitlist
  var alreadyExists = tables.find(table => table.customerID === newTable.customerID)
    || waitlist.find(table => table.customerID === newTable.customerID);
  
  if(!alreadyExists) {
    // Check if we have tables left
    if(tables.length < maxTables) {
      tables.push(newTable);
    } else {
      waitlist.push(newTable);
    }

    res.send(true);
  } else {
    res.send(false);
  }
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
