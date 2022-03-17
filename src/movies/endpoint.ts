import express from 'express';
import AuthCheck from '../helpers/validator';
import Movies from './services';

const route = express.Router();

route.get('/', AuthCheck.checkAuthStatus, AuthCheck.checkAuthStatus, Movies.createMovieList);

export default route;