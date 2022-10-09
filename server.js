'use strict';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './api/config/db.js';
import { notFound, errorHandler } from './api/middlewares/error.middlewares.js';
import todoRoutes from './api/routes/index.js';
import chalk from 'chalk';
import { requestLogger } from './api/utils/logger.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(requestLogger);

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

  app.use('/api/todos', todoRoutes);

  app.use(notFound);
  app.use(errorHandler);
};

main();
