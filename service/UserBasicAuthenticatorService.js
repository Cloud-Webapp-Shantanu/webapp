const User = require('../model/User');
const bcrypt = require('bcrypt');

function basicAuthenticator(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    console.error('Unauthorised User');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const credentials = Buffer.from(authHeader.substring('Basic '.length), 'base64').toString().split(':');
  const username = credentials[0];
  const password = credentials[1];

  const user = User.findOne({ where: { username: username } })
    .then(async(User) => {
        if (!User) {
            console.error('Unauthorised User (Invalid Username)');
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const isValidPwd = await bcrypt.compare(password, User.password);

        if (!isValidPwd) {
            console.error('Unauthorised User (Invalid Password)');
            return res.status(401).json({ message: 'Unauthorized' });
        }
        console.log('User authenticated successfully');
        req.user = User;
        next();
    })
    .catch(err => {
      console.error('Service Unavailable' + err);
      res.status(503).send({ message: 'Service Unavailable' });
      console.log(err);
    });
}

module.exports = basicAuthenticator;
