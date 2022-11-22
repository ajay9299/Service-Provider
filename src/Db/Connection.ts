import mongoose from "mongoose";
import config from "config";

// Connect to the mongodb server
const DB_URL: string = config.get("DB.URL");

mongoose
  .connect(DB_URL, {})
  .then(() => {
    console.log(`===== DB Connected Successfully =====`);
  })
  .catch((error: Error) => {
    console.log(error);
  });
