import express, { Request, Response, NextFunction } from "express";
import { apiRoutes } from "./routes/apiRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

class APIError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}


const PORT: number | string = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

// const __dirname = dirname(fileURLToPath(import.meta.url));

const root = path.join(__dirname, "../client", "build");
app.use(express.static(root));
app.get("*", (req: Request, res: Response) => {
  res.sendFile("index.html", { root });
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use((err: APIError, req: Request, res: Response, next: NextFunction) => {
  err.status = 404;
  next(err);
});

app.use((error: APIError, req: Request, res: Response,) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});