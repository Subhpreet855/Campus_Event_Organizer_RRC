import { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allowed?: boolean) => void) {
    const allowedOrigins = [process.env.FRONTEND_URL];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS restriction"));
    }
  },
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  credentials: true
};

export default corsOptions;
