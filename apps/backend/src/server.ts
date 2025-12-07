import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(__dirname, "../../../.env"),
});

console.log("CLERK_PUBLISHABLE_KEY present?", !!process.env.CLERK_PUBLISHABLE_KEY);
console.log("CLERK_SECRET_KEY present?", !!process.env.CLERK_SECRET_KEY);

import app from "./app";
import { Server } from "http";

const PORT = process.env.PORT || 3000;

const server: Server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default server;
