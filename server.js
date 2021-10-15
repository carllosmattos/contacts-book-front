const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + "/dist/contacts-book-front"));

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/dist/contacts-book-front/index.html");
});

app.listen(PORT, () => {
  console.log("Server start in PORT " + PORT);
});
