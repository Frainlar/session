const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const helmet = require('helmet');
const csrfProtection = require('./middlewares/csrfProtection');
const rateLimiter = require('./middlewares/rateLimiter');
const { sessionSecret } = require('./config');
const redisClient = require('./utils/redisClient');

const app = express();

app.use(helmet());
app.use(express.json());

// Session Management
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: 2 * 60 * 1000, // 2 minutes of inactivity
    },
  })
);

// Security Middlewares
app.use(csrfProtection);
app.use(rateLimiter);

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.set('trust proxy', 1); // Trust first proxy

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.secure) {
      next();
    } else {
      res.redirect(`https://${req.headers.host}${req.url}`);
    }
  });
}


module.exports = app;
