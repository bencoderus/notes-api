import app from "./app";
import config from "../src/config";
import DatabaseService from "./services/database.service";
const port = config.app.port;
const appName = config.app.name;

app.listen(port, async () => {
  await DatabaseService.createConnection();
  console.log(`🚀 ${appName} is running on ${config.app.env} at port ${port}`);
});
