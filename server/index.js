const express = require("express");
const mysql = require("mysql");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

// Get Method x Test server
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Connection
const conn = {
  host: "db4free.net", // Replace with your host name
  user: "jsg0916",      // Replace with your database username
  password: "00916jsg",      // Replace with your database password
  database: "jsg_test" // Replace with your database Name
}

// Constant
const CONSTANTS = {
  QUERY: {
    SELECT: {
      USER: `SELECT * FROM TB_USER`
    },
    INSERT: {
      USER: `INSERT INTO TB_USER`
    }
  }
}

// POST Method x Login process
app.post("/api/login", async (req, res) => {
  try {
    // Body payload
    const payload = req.body;

    // Create DB Connection
    const dbConn = mysql.createConnection({
      host     : conn.host,
      user     : conn.user,
      password : conn.password,
      database : conn.database
    });
    dbConn.connect();
    
    const query = `${CONSTANTS.QUERY.SELECT.USER} WHERE UPPER(EMAIL) = '${payload.email}' AND PASS = '${payload.pass}'`;
    dbConn.query(query, (error, result) => {
      // End Connection
      dbConn.end();
      if (error) {
          return res.type("application/json").status(500).send({
              error: true,
              data: error
          });
      } else {
          return res.type("application/json").status(200).send({
              error: false,
              data: result
          });
      }
    });
  } catch (err) {
    return res.type("application/json").status(500).send({
        error: true,
        data: err
    });
  }
});

// POST Method x Register process
app.post("/api/register", async (req, res) => {
  try {
    // Body payload
    const payload = req.body;

    // Create DB Connection
    const dbConn = mysql.createConnection({
      host     : conn.host,
      user     : conn.user,
      password : conn.password,
      database : conn.database
    });
    dbConn.connect();
    
    const query = `${CONSTANTS.QUERY.INSERT.USER} (EMAIL, PASS) VALUES ('${payload.email}', '${payload.pass}')`;
      dbConn.query(query, (error, result) => {
        // End Connection
        dbConn.end();
        if (error) {
            return res.type("application/json").status(500).send({
                error: true,
                data: error
            });
        } else {
            return res.type("application/json").status(200).send({
                error: false,
                data: result
            });
        }
    });
  } catch (err) {
    return res.type("application/json").status(500).send({
        error: true,
        data: err
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});