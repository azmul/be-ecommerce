import { Request, NextFunction } from "express";
import NodeCache from "node-cache";

const cache = new NodeCache();

export const getCacheHandler =
  (duration: number, key: string) =>
  (req: Request, res: any, next: NextFunction) => {
    if (req.method !== "GET") {
      console.log("Cannot cache for get method");
      next();
    }

    const cacheResponse = cache.get(key);

    if (cacheResponse) {
      console.log(`Cache hit for ${key}`);
      res.status(200).send(cacheResponse);
    } else {
      console.log(`Cache not hit for ${key}`);
      res.originalSend = res.send;
      res.send = (body: any) => {
        res.originalSend(body);
        cache.set(key, body, duration);
      };
      next();
    }
  };

export const deleteCacheHandler =
  (key: string) => (req: Request, res: any, next: NextFunction) => {
    cache.del(key);
    next();
  };

cache.on( "del", function( key, value ){
   console.log(`Delete Cache for ${key}`);
});
