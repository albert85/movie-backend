import express from 'express';
import Movies from './movies/endpoint';
import User from './users/endpoint';
import otherRoutes from './helpers/notFoundRoute';

const app = express();

app.use('/users', User);
app.use('/movies', Movies);
app.use('/movies', Movies);
app.use('/', otherRoutes);

export default app;