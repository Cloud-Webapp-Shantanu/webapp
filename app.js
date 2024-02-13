const express = require('express');
const sequelize = require('./connection.js');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/UserRoutes');
const publicRoutes = require('./routes/PublicRoutes');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

//Check if the json request body is valid
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Invalid JSON syntax:', err.message);
    return res.status(400).header('Cache-Control', 'no-cache').send();
  }
  next();
});

app.use(publicRoutes);
app.use(userRoutes);

// On server start
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

sequelize
  .sync()
  .then(result => {
    console.log("Database connected");
  })
  .catch(err => console.log(err));

module.exports = {
  app,
  server,
  port
};