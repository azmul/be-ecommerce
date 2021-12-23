import { Request } from "express"
import { TokenType } from "./tokenType";

export interface IGetUserAuthInfoRequest extends Request {
  user?: TokenType
}