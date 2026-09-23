import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { mongoconnect } from "./Configration/mongoconnect.js";
import { routes } from "./Routes/router.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", routes);

await mongoconnect();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
