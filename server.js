'use strict';
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './api/config/db.js';
import morgan from 'morgan';
import { notFound, errorHandler } from './api/middlewares/error.middlewares.js';
import routes from './api/routes/index.js';
import chalk from 'chalk';

dotenv.config();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 1337;

const main = async () => {
  app.listen(
    PORT,
    console.log(
      chalk.blueBright(
        `Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`
      )
    )
  );

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }

  connectDB();

  routes(app);

  app.use(notFound);
  app.use(errorHandler);
};

main();
