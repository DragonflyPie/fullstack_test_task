import cors from "cors";
import express, { Application, Response } from "express";
import ip from "ip";
import { Code } from "./enum/httpStatus";
import productsRoutes from "./routes/productRoutes";
import { fetchProducts } from "./services/shopify/shopifyService";
import { createDbProducts } from "./services/products/productsService";

export class App {
  private readonly app: Application;
  private readonly APPLICATION_RUNNING = "app is running on:";
  private readonly ROUTE_NOT_FOUND = "Route not found";

  constructor(
    private readonly port: string | number | undefined = process.env.SERVER_PORT
  ) {
    this.app = express();
    this.middleWare();
    this.routes();
  }

  async initializeData(): Promise<void> {
    const products = await fetchProducts();
    if (!products) {
      throw Error("No products fetched");
    }
    await createDbProducts(products);
  }

  listen(): void {
    this.app.listen(this.port);
    console.info(`${this.APPLICATION_RUNNING} ${ip.address()}:${this.port}`);
  }

  private routes() {
    this.app.use("/products", productsRoutes);
    this.app.get("/", (_, res: Response) =>
      res.status(Code.OK).send("Server is up")
    );
    this.app.all("*", (_, res: Response) =>
      res.status(Code.NOT_FOUND).send("Route not found")
    );
  }

  private middleWare(): void {
    this.app.use(cors({ origin: "*" }));
    this.app.use(express.json());
  }
}
