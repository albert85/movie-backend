import bcrypt from 'bcrypt';
import { generateToken, handleResponse } from '../helpers/util';
import { Request, Response} from 'express';
import UserModel from './models/users';


class User {
  static async register(req: Request, res: Response) {
    const userDetail = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    };

    const userDetailDb = await UserModel.findOne({
      email: req.body.email,
    });

    if (userDetailDb) {
      return handleResponse(res, 404, false, 'A user exist with the email');
    }

    const user = await UserModel.create(userDetail);
    const newUser = user.toObject();
    delete newUser.password;

    return handleResponse(
      res,
      201,
      true,
      'Registering User was successfully',
      { user: newUser },
    );
  }


  static async userLogin(req: Request, res: Response) {
    const userDetail = await UserModel.findOne({
      email: req.body.email,
    });


    if (!userDetail) {
      return handleResponse(res, 404, false, 'User was not found', {
        error: true,
      });
    }

    const psd = await bcrypt.compare(req.body.password, userDetail.password);

    if (!psd) {
      return handleResponse(
        res,
        404,
        false,
        'Incorrect password was supplied',
        { error: true },
      );
    }

    const token = generateToken({
      firstName: userDetail.firstName,
      lastName: userDetail.lastName,
      userId: userDetail._id
    });


    return handleResponse(
      res,
      200,
      true,
      'User login successfully',
      {
        firstName: userDetail.firstName,
        lastName: userDetail.lastName,
        email: userDetail.email,
        userId: userDetail._id
      },
      token,
    );
  }

}

export default User;