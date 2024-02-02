import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { scrapeAndAddToDB } from "./scrapper.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    scrapeAndAddToDB();
    app.listen(process.env.PORT || 8000, () =>
      console.log(`app listening on port ${process.env.PORT}`)
    );
  })
  .catch((error) => console.log("DB connection failed: ", error));
