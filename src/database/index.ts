import { MongoClient } from 'mongodb';
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri!);

import logger from "winston";

try{
  client.connect((error: any) => {
    if(error) {
      logger.error(error.message());
    }
    logger.info("Successfully connected.");
  });
}catch(exception : any | unknown | Error) {
  logger.error(exception.message());
}finally{
  client.close();
}
