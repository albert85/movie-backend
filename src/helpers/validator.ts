
import { handleResponse, decodeToken } from './util';
import { Response, Request, NextFunction } from 'express';

class AuthCheck {
  static checkAuthStatus(req: Request, res: Response, next: NextFunction) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      const user = decodeToken(bearerToken);
      req.user = user;
      return next();
    }
    return handleResponse(res, 403, false,'Unauthorized Action, Please register or login');
  }

  static checkToken(req: Request, res: Response, next: NextFunction) {
    const decodedToken = decodeToken(req.token);

    if (!decodedToken) {
      return handleResponse(res, 401, false, 'Token Expired, please re-login');
    }

    return next();
  }
}

export default AuthCheck;
