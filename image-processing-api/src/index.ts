import express from "express";
import routes from "./routes/index";

const application = express();
const port = 3000;

application.get("/", (req: express.Request, res: express.Response): void => {
  res.send("HELLOO");
});

application.use("/api", routes);

application.listen(port, () => {
  console.log(`Listening on the localhost at http://localhost:${port}`);
});

export default application;
