// register, login, getUser, and logout

const bcrypt = require('bcrypt');

module.exports = {
  register: async (req, res) => {
    const db = req.app.get('db');
    const { user_name, password } = req.body;

    console.log(`=> Reached Register Endpoint...`);

    // check if the user exits allready
    const checkUser = await db
      .find_user({ user_name: user_name })
      .catch((err) => console.log(`Error reading DB ${err}`));

    if (checkUser[0]) {
      return res.status(400).send('This user allready exists in the system');
    }

    // hash and salt the password then insert to db
    let salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = await db.create_user({ user_name, hash });

    // store the new user in the session send back to client
    req.session.user = newUser[0];
    res.status(201).send(req.session.user);
  },
};
