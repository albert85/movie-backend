import express from 'express';
import User from './services';

const route = express.Router();

route.post('/register', User.register);
route.post('/login', User.userLogin);

export default route;