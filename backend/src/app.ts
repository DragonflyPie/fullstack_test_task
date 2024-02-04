import cors from "cors";
import express, { Application, Response, Request } from "express";
import ip from "ip";
import { Code, Status } from "./enum/httpStatus.enum";
import { HttpResponse } from "./domain/response";
import productsRoutes from "./routes/products.routes";
import { fetchProducts } from "./graphql/fetchShopify";
import { createProducts } from "./controller/products.controller";

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
    await createProducts(products);
  }

  listen(): void {
    this.app.listen(this.port);
    console.info(`${this.APPLICATION_RUNNING} ${ip.address()}:${this.port}`);
  }

  private routes() {
    this.app.use("/products", productsRoutes);
    this.app.get("/", (_, res: Response) =>
      res
        .status(Code.OK)
        .send(new HttpResponse(Code.OK, Status.OK, "Server is up"))
    );
    this.app.all("*", (_, res: Response) =>
      res
        .status(Code.NOT_FOUND)
        .send(
          new HttpResponse(
            Code.NOT_FOUND,
            Status.NOT_FOUND,
            this.ROUTE_NOT_FOUND
          )
        )
    );
  }

  private middleWare(): void {
    this.app.use(cors({ origin: "*" }));
    this.app.use(express.json());
  }
}
