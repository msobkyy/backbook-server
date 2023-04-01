const path = require('path');
const express = require('express');
const cors = require('cors');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const GlobalErrorHandler = require('./controllers/errorController');
const { createServer } = require('http');

const usersRouter = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const friendsRoutes = require('./routes/friendsRoutes');
const messagesRoutes = require('./routes/messagesRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();

const whitelist = [
  'http://127.0.0.1:3000',
  'http://192.168.1.2:3000',
  'http://192.168.1.6:3000',
  'http://192.168.1.2:8000',
  'http://localhost:3000',
  'https://backbook.vercel.app',
  'https://backbook-api.cyclic.app',
];
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (!origin) {
      //for bypassing postman req with  no origin
      return callback(null, true);
    }
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// const whitelist = ['http://127.0.0.1:3000', 'http://192.168.1.2:3000'];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin) {
//       //  for bypassing postman req with  no origin 0
//       return callback(null, true);
//     }
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };
app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000 * 24,
  max: 20,

  handler: (request, response, next, options) =>
    response.status(options.statusCode).json({
      status: 'fail ',
      message:
        'You can only post 15 posts per day and you have reached the limit. You can post again tomorrow, have fun 😉',
    }),
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/posts/createPost', limiter);

app.use(express.json({ limit: '5000kb' }));
app.use(express.urlencoded({ extended: true, limit: '5000kb' }));
app.use(cookieParser());
app.use(xss());

app.set('view engine', 'pug');

// app.use(express.static('public'));

// app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/friends', friendsRoutes);
app.use('/api/v1/chats', chatRoutes);
app.use('/api/v1/messages', messagesRoutes);

// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(GlobalErrorHandler);

const httpServer = createServer(app);
const sio = require('./utils/socket');

sio.init(httpServer, {
  pingTimeout: 60000,
  pingInterval: 60000,
  cors: {
    origin: whitelist,
  },
});

exports.whitelist = whitelist;
exports.httpServer = httpServer;
