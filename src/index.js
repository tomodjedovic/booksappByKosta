import { config } from "dotenv";
import createApp from "./app/app.js";
config();
const app = createApp();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
