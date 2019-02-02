import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import passport from 'passport';
import MainRouter from './routes/main-router';
import errorHandler from './utils/errorHandler';

const app = express();
dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });
mongoose.connect(process.env.CONNECTION_STRING);

app.use(passport.initialize());
app.use(cookieParser());

app.get('/swagger/:params*', (req, res) => res.sendFile(path.resolve(`${__dirname}/../${req.path}`)));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Set-Cookie, Cookie');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Expose-Headers', 'Content-Type, Authorization, Set-Cookie');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, PUT, POST, DELETE, PATCH');
  next();
});
app.options('*', (req, res) => res.end());

app.use(bodyParser.json({ limit: '2000kb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', MainRouter);
app.use(errorHandler);


const server = app.listen(process.env.PORT, () => {
  console.log(`Started server on => http://localhost:${server.address().port}`);
});
