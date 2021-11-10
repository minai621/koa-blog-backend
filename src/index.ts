import api from './api';
import Koa from 'koa';
import mongoose from "mongoose";
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import createFakeData from './createFakeData';
import jwtMiddleware from './lib/jwtMiddleware';
require('dotenv').config();

const app = new Koa();
const router = new Router();

const { PORT } = process.env;
const MONGO_URL = String(process.env.MONGO_URL);

router.use('/api', api.routes());

app.use(bodyParser());
app.use(jwtMiddleware);
app.use(router.routes()).use(router.allowedMethods());

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Connect to MongoDB');
    createFakeData();
  })
  .catch(e =>
    console.error(e)
  );

const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening to port %d', port);
})