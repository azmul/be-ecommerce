import { Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import ROLE  from '../../constant/roleConstant';
import { IGetUserAuthInfoRequest } from "../../defination/apiDefination";
import {JWT_PRIVATE_KEY, APPLICATION} from "../../environment";

export default function (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
  const token = req.header('x-auth-token');
  const application = req.header('Application');

  if (application !== APPLICATION) return res.status(401).send({status: 401, message: 'Access denied.'});

  if (!token) return res.status(401).send({status: 401, message: 'Access denied. No token provided.'});

  try {
    const decoded: any = jwt.verify(token, JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  }
  catch (ex) {
    res.status(400).send({status: 400, message: 'Invalid token.'} );
  }
}