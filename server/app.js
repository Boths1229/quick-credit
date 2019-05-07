import 'idempotent-babel-polyfill';
import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import config from './config/config';
import User from './routes/user';
import debug from 'debug';

const app = express();

const { port, env } = config;

// Log requests to the console
app.use(logger('dev'));

// Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const Debug = debug('http');
User(app);
// set up a default catch-all route
app.get('*', (req, res) => {
  res.json({ message: 'welcome to default routes' })
});

if (env !== 'test') {
  app.listen(port, () => {
    Debug(`Server starting on port: ${port}`);
  });
}
export default app;