import simpleLogger from "simple-node-logger";
import fs from "fs";
const dir = "public/logs/strapi/";
const logger = simpleLogger.createRollingFileLogger({
  logDirectory: dir,
  fileNamePattern: "strapi_log_<DATE>.log",
  dateFormat: "YYYY.MM.DD",
});
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}
export default logger;
export { logger };
