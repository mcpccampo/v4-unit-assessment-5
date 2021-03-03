require('dotenv').config();

const express = require('express');
const massive = require('massive');
const session = require('express-session');

const { DB_URI, SERVER_PORT, SESSION_SECRET } = process.env;

const userCtrl = require('./controllers/user');
const postCtrl = require('./controllers/posts');

const app = express();

app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 },
  })
);

massive({
  connectionString: DB_URI,
  ssl: { rejectUnauthorized: false },
})
  .then((dbInstance) => {
    console.log('Database Connected!');
    app.set('db', dbInstance);
    app.listen(SERVER_PORT, () => {
      console.log(`Connected to Server ${SERVER_PORT}`);
    });
  })
  .catch((err) => console.log(`Database Connection Error -> ${err}`));

//Auth Endpoints
app.post('/api/auth/register', userCtrl.register);
// app.post('/api/auth/login', userCtrl.login);
// app.get('/api/auth/me', userCtrl.getUser);
// app.post('/api/auth/logout', userCtrl.logout);

//Post Endpoints
// app.get('/api/posts', postCtrl.readPosts);
// app.post('/api/post', postCtrl.createPost);
// app.get('/api/post/:id', postCtrl.readPost);
// app.delete('/api/post/:id', postCtrl.deletePost);
