const express = require("express");

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
  user: "js0916",      // Replace with your database username
  password: "00916jsg",      // Replace with your database password
  database: "jsg_test" // Replace with your database Name
}

// POST Method x Login process
app.post("/api/login", async (req, res) => {
  try {
      // Body payload
      const payload = req.body;
      console.log("payload", payload)

      return res.type("application/json").status(200).send({
        error: false,
        data: "success"
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
      console.log("payload", payload)

      return res.type("application/json").status(200).send({
        error: false,
        data: "success"
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