import express from "express";
import cors from "cors";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { productRoutes } from "./routes/products.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express();

app.use(cors());
app.use(express.json());
app.use('/images', express.static(join(__dirname, 'public/images')));

app.use('/products', productRoutes);

app.use(errorMiddleware);

export default app;
