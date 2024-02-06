const express = require('express');
const sequelize = require('./connection.js');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/UserRoutes');
const publicRoutes = require('./routes/PublicRoutes');
const basicAuthenticator = require('./service/UserBasicAuthenticatorService.js');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

//Check if the json request body is valid
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Invalid JSON syntax:', err.message);
    return res.status(400).header('Cache-Control', 'no-cache').send();
  }
  next();
});

// Uses the healthController for routes
app.use(publicRoutes);
app.use(basicAuthenticator);
app.use(userRoutes);

// On server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

sequelize
  .sync()
  .then(result => {
    console.log("Database connected");
  })
  .catch(err => console.log(err));