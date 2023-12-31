import express, { response } from "express";
import cors from "cors";
import mysql from "mysql";
import http from "http";

const app = express();
const server = http.createServer(app);

app.use(cors({
  credentials : true,
  origin : "*"
}));

app.use(express.json());

const connection = mysql.createConnection({
  host : "db4free.net",
  user : "vcentry",
  password : "test@123",
  database : "travelix",
  port : 3306
});

connection.connect((error) => {
  if(error){
    throw error;
  }
  else {
    console.log("MYSQL Server has been connected");
  }
})



// http://localhost:5000/api/test
// Method : GET

app.get("/api/test", (request, response) => {
    response.status(200).send("Node js API is working fine");
  })  

const UserList = [
  {name : "Vennila"}, {name : "Theeba"}, {name : "Azad"}, {name : "Balaji"}
];

// http://localhost:5000/api/user/list
// Methos : GET

app.get("/api/user/list", (request, response) => {
  response.status(200).send(UserList);
});
// http://localhost:5000/api/user/create
// Methos : post

app.post("/api/user/create", (request, response) => {
  const incomingData = request.body;
  UserList.push(incomingData);
  response.status(200).send("User profile has been created");  
})

/*
Curd Operation
URL: http://localhost:5000/api/create/record
METHOD : POST
Payload
{
  username : string,
  email : string,
  age : number,
  location : string
}
*/
app.post("/api/create/record", (request, response) => {
  const incomingData = request.body;
  const age = parseInt(incomingData.age);
  
  const sql_query = `INSERT INTO Vennila_table (username, email, age, location) VALUES ('${incomingData.username}', '${incomingData.email}', ${age}, '${incomingData.location}')`;

  connection.query(sql_query, (error, result) => {
    if(error){
      response.status(500).send(error);
    }
    else{
      response.status(200).send(result);
    }
  })

})

// URL : http://localhost:5000/api/read/record
// METHOD : GET

app.get("/api/read/record", (request, response) => {
  const sql_query = `SELECT * FROM Vennila_table`;

  connection.query(sql_query, (error, result) => {
    if(error){
      response.status(500).send(error);
    }
    else{
      response.status(200).send(result);
    }
  })
})

/*
URL : http://localhost:5000/api/update/record/2
METHODS : PUT 
Payload 
{
  username : string,
  email : string,
  age : number,
  location : string
}
*/
app.put("/api/update/record/:id", (request, response) => {
  const incomingData = request.body;
  const incomingId = request.params.id;

  const age = parseInt(incomingData.age);

  const sql_query = `UPDATE Vennila_table SET username='${incomingData.username}', email='${incomingData.email}', age=${age}, location='${incomingData.location}' WHERE id=${incomingId}`;

  connection.query(sql_query, (error, result) => {
    if(error){
      response.status(500).send(error);
    }
    else{
      response.status(200).send(result);
    }
  })
})

// URL : http://localhost:5000/api/delete/record/2
// METHODS : DELETE 

app.delete("/api/delete/record/:id", (request, response) => {
  const incomingId = request.params.id;

  const sql_query = `DELETE FROM Vennila_table WHERE id=${incomingId};`;
  connection.query(sql_query, (error, result) => {
    if(error){
      response.status(500).send(error);
    }
    else{
      response.status(200).send(result);
    }
  })

})


const portNumber = process.env.PORT || 5000;
server.listen(portNumber, () => {
  console.log("Node JS project is running")
})