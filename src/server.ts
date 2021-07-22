import "./config/env";
import app from "./app";

const { NODE_ENV, PORT } = process.env;
const dev = NODE_ENV === "development" ? " on Dev mode" : "";

app.listen(parseInt(PORT || "4000"), () => {
  console.log(`Server runing on port ${PORT + dev}`);
});
