const express = require("express");
const consola = require("consola");
const morgan = require("morgan");
const color = require("colors");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/error");
const authRouter = require("./routes/authentication");
const { Nuxt, Builder } = require("nuxt");
const app = express();

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = process.env.NODE_ENV !== "production";

// set morgan
app.use(morgan("dev"));

// set body-parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // Write API here
  // set routing
  app.use("/api/authentication", authRouter);

  // adding errors middleware
  app.use(errorHandler);

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  });
}
start();
