const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;
const dotenv = require("dotenv");
const { Client } = require("pg");

dotenv.config();
const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

const signinpage = require("./routes/signinpage");
app.use(signinpage);

app.get("/api", async (_request, response) => {
  const { rows } = await client.query("SELECT * FROM blogs");
  response.send(rows);
});

app.use(express.static(path.join(path.resolve(), "dist")));

app.listen(port, () => {
  console.log(`Välkommen till port ${port}`);
});
