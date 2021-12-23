import  { Request, Response, NextFunction } from "express";
import log from "../logger";

export default function(err: any, req: Request, res: Response, next: NextFunction){
  log.error(err.message, err);

  // error
  // warn
  // info
  // verbose
  // debug 
  // silly

  res.status(500).send('Something failed.');
}