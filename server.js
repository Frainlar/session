// Import required modules
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');

// Create Redis client
const redisClient = redis.createClient({
  host: 'localhost', // Replace with your Redis server host
  port: 6379 // Replace with your Redis server port
});

redisClient.on('error', (err) => {
  console.error('Redis error: ', err);
});

// Session handling middleware
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'your-session-secret', // Replace with a strong secret key
  resave: false, // Prevents resaving unchanged sessions
  saveUninitialized: false, // Prevents saving uninitialized sessions
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Secure cookies in production
    httpOnly: true, // Prevents client-side access to cookies
    maxAge: 30 * 60 * 1000 // 30 minutes session expiration time
  }
}));

// Example route to test session
app.get('/login', (req, res) => {
  // Assuming user is authenticated
  req.session.userId = 'user123'; // Set user ID in session
  res.send('User logged in and session set');
});

app.get('/dashboard', (req, res) => {
  if (req.session.userId) {
    res.send(`Welcome, user: ${req.session.userId}`);
  } else {
    res.status(401).send('Unauthorized. Please log in.');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Could not log out, please try again.');
    }
    res.clearCookie('connect.sid');
    res.send('Logged out successfully');
  });
});
