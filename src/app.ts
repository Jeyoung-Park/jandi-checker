import express from "express";
import schedule from "node-schedule";
import { login } from "./services/discord";
import indexRouter from "./routes";
import { runCronJob } from "./services/cronJob";

require("dotenv").config();

login();

const { sequelize } = require("./models");

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch((err: Error) => {
    console.error(err);
  });

const rule = new schedule.RecurrenceRule();
rule.tz = "Asia/Seoul";
rule.second = 0;
rule.minute = 0;
rule.hour = 23;

schedule.scheduleJob(rule, async () => {
  runCronJob();
});

const app = express();

//  application/json의 Content-Type에 대해 파싱해주는 역할
app.use(express.json());
// application/x-www-form-urlencoded의 Content-Type에 대해 파싱해주는 역할
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.listen("1234", () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: 1234🛡️
  ################################################
`);
});
