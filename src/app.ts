import express from "express";
const app = express();
import routes from "./routes";
import cors from "cors";
import helmet from "helmet";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(routes);

export default app;
