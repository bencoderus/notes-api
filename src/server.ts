import app from './app';
import config from './config/index';
import DatabaseManager from './utils/database-manager';

const { port } = config.app;
const appName = config.app.name;

app.listen(port, async () => {
  await DatabaseManager.createConnection();
  console.log(`🚀 ${appName} is running on ${config.app.env} at port ${port}`);
});
