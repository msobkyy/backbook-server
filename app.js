const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const GlobalErrorHandler = require('./controllers/errorController');

const usersRouter = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const friendsRoutes = require('./routes/friendsRoutes');

const app = express();
const whitelist = [
  'http://127.0.0.1:3000',
  'http://192.168.1.2:3000',
  'http://localhost:3000',
  'https://backbook.vercel.app',
  'https://backbook.onrender.com', 
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
//       //for bypassing postman req with  no origin
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
app.set('view engine', 'pug');

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/friends', friendsRoutes);
app.use('/', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 200));
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(GlobalErrorHandler);

module.exports = app;
