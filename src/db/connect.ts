import mongoose from "mongoose";
import log from "../logger";
import {MONGO_URL} from "../environment"
import winston from "winston";

async function connect() {
  const localURl = "mongodb://localhost:27017/ecommerce-api"; 
  
  try {
    const URL = process.env.NODE_ENV === "production" ? MONGO_URL : localURl;
    
    mongoose.connect(URL, {
        keepAlive: true,
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false, 
        useCreateIndex: true 
      });
      winston.info(log.info("Database Connected"));

  } catch(error: any) {
    log.error("db error", error);
    mongoose.connection.close();
    process.exit(1);
  };  
}

export default connect;