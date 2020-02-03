const express = require("express");
const routes = require("./app/routes/approutes");
const app = express();
const bodyParser = require("body-parser");
const helmet = require("helmet");

const port = process.env.PORT || 4001;

const cors = require("cors");
app.use(helmet());
app.use(cors());

app.listen(port, () => {
  console.log("API server started on: " + port);

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  routes(app);
});
