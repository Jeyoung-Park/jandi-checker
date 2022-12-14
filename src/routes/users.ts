import express, { NextFunction, Request, Response, Router } from "express";

const { getUsers } = require("../controllers/users");

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const users = await getUsers();
  res.send({ users });
});

export default router;
