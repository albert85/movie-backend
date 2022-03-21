import express from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import route from './route';

dotenv.config();

const app = express();

app.use(cors())
app.use(bodyParser.json());


var databaseUrl = process.env.DATABASE_URL || '';

mongoose.connect(
  databaseUrl);

  const db = mongoose.connection;

db.on('error', (err) => {
  console.log(err);
});

db.once('open', () => {
  console.log('Database connection established');
});

app.get("/", (req, res, next) => {
return res.json({ message: "from index api" });

});

app.use(route);

app.listen(8080, () => {
  console.log(`Server is running`);

});